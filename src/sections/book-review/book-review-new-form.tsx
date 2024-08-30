import type { z as zod } from 'zod';
import type { TablesInsert } from 'src/database.types';
import type { DialogProps } from '@mui/material/Dialog';

import { toast } from 'sonner';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { insertReview } from 'src/app/books/actions';
import { bookReviewSchema } from 'src/lib/book-review/validations';

import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

type ReviewSchemaType = zod.infer<typeof bookReviewSchema>;


// ----------------------------------------------------------------------

type Props = DialogProps & {
  onClose: () => void;
  bookId: string;
};

export function BookReviewNewForm({ onClose, bookId, ...other }: Props) {
  const defaultValues = {
    rating: 0,
    review: '',
    name: '',
    email: '',
  };

  const methods = useForm<ReviewSchemaType>({
    mode: 'all',
    resolver: zodResolver(bookReviewSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;


  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await insertReview({
        ...data,
        book_id: bookId,
      } as TablesInsert<'review'>);
      if ('error' in response) {
        toast.error(response.error);
      }

      onClose()
    } catch (error) {
      console.error(error);
    }
  });

  const onCancel = useCallback(() => {
    onClose();
    reset();
  }, [onClose, reset]);

  return (
    <Dialog onClose={onClose} {...other}>
      <Form methods={methods} onSubmit={onSubmit}>
        <DialogTitle> Add Review </DialogTitle>

        <DialogContent>
          <div>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Your review about this book:
            </Typography>
            <Field.Rating name="rating" />
          </div>

          <Field.Text name="comment" label="Review *" multiline rows={3} sx={{ mt: 3 }} />

          <Field.Text name="reviewer_name" label="Name *" sx={{ mt: 3 }} />

          <Field.Text name="reviewer_email" label="Email *" sx={{ mt: 3 }} />
        </DialogContent>

        <DialogActions>
          <Button color="inherit" variant="outlined" onClick={onCancel}>
            Cancel
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Post
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
