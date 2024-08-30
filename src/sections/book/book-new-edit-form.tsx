import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useMemo, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { newBookSchema } from 'src/lib/book/validations';
import { BOOK_GENRE_OPTIONS } from 'src/lib/book/constants';
import { TablesInsert, TablesUpdate } from 'src/database.types';
import { upsertBook, generateSummary } from 'src/app/books/actions';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

type NewBookSchemaType = zod.infer<typeof newBookSchema>;

type Props = {
  currentBook?: TablesUpdate<'book'>;
};

export function BookNewEditForm({ currentBook }: Props) {
  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      title: currentBook?.title || '',
      author: currentBook?.author || '',
      book: '',
      published: currentBook?.published || null,
      isbn: currentBook?.isbn || '',
      genre: currentBook?.genre || '',
      summary: currentBook?.summary || ''
    }),
    [currentBook]
  );

  const generatingSummary = useBoolean();

  const methods = useForm<NewBookSchemaType>({
    mode: 'all',
    resolver: zodResolver(newBookSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
    watch,
    setValue,
  } = methods;

  const title = watch('title');
  const author = watch('author');
  const published = watch('published');

  const handleGenerateSummary = async () => {
    if (!title || !author) {
      toast.error('Please fill in title, author, and publish date before generating summary.');
      return;
    }

    try {
      const year = published ? new Date(published).getFullYear().toString() : undefined;
      generatingSummary.onTrue()
      const response = await generateSummary({ title, author, year });
      generatingSummary.onFalse()

      if ('error' in response) {
        toast.error(response.error);
      } else {
        setValue('summary', response.message, { shouldValidate: true });
        toast.success('Summary generated successfully!');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to generate summary.');
    }
  };

  useEffect(() => {
    if (currentBook) {
      reset(defaultValues);
    }
  }, [currentBook, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data: NewBookSchemaType) => {
    try {
      const response = await upsertBook({
        ...data,
        id: currentBook?.id
      } as TablesInsert<'book'> | TablesUpdate<'book'>);
      if ('error' in response) {
        toast.error(response.error);
      } else {
        reset();
        toast.success(currentBook ? 'Update success!' : 'Create success!');
        router.push(paths.books.root);
      }
    } catch (error) {
      console.error(error);
    }
  });

  const renderDetails = (
    <Card>
      <CardHeader title="Book Details" subheader="Basic information about the book" sx={{ mb: 3 }} />

      <Divider />

      <Stack spacing={4} sx={{ p: 4 }}>
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Title</Typography>
          <Field.Text name="title" placeholder="Enter book title..." />
        </Stack>

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Author</Typography>
          <Field.Text name="author" placeholder="Enter author name..." />
        </Stack>
        <Stack direction="row" spacing={4}>
          <Stack spacing={1.5} sx={{ width: '50%' }}>
            <Typography variant="subtitle2">Publish Date</Typography>
            <Field.DatePicker name="published" />
          </Stack>

          <Stack spacing={1.5} sx={{ width: '50%' }}>
            <Typography variant="subtitle2">ISBN</Typography>
            <Field.Text name="isbn" placeholder="Enter ISBN..." />
          </Stack>
        </Stack>
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Genre</Typography>
          <Field.Select name="genre" label="Genre">
            {BOOK_GENRE_OPTIONS.map((genre) => (
              <MenuItem key={genre} value={genre}>
                {genre}
              </MenuItem>
            ))}
          </Field.Select>
        </Stack>
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Summary</Typography>
          <Field.Text multiline rows={4} name="summary" placeholder="Enter summary..." />
          {title?.length && author?.length ? <Box>
            <LoadingButton loading={generatingSummary.value} variant="outlined" onClick={handleGenerateSummary}>✨ Generate</LoadingButton>
          </Box> : null}
        </Stack>
      </Stack>
    </Card>
  );

  const renderActions = (
    <Box display="flex" alignItems="center" justifyContent="flex-end" flexWrap="wrap">

      <LoadingButton
        type="submit"
        variant="contained"
        size="large"
        loading={isSubmitting}
        sx={{ ml: 2 }}
      >
        {!currentBook ? 'Create book' : 'Save changes'}
      </LoadingButton>
    </Box>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={{ xs: 3, md: 5 }} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
        {renderDetails}
        {renderActions}
      </Stack>
    </Form>
  );
}
