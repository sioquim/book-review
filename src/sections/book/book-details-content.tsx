import type { Tables } from 'src/database.types';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { useBookReviewSummary } from 'src/hooks/book-review/use-book-review-summary';

import { fDate } from 'src/utils/format-time';

import { Iconify } from 'src/components/iconify';

import { BookDetailsReview } from '../book-review/book-review';

// ----------------------------------------------------------------------

type Props = {
  book: Tables<'book'> & { reviews: Tables<'review'>[] };
};

export function BookDetailsContent({ book }: Props) {
  const renderContent = (
    <Card sx={{ p: 3, gap: 3, display: 'flex', flexDirection: 'column' }}>
      <Stack spacing={4}>
        <Stack spacing={1}>
          <Typography variant="h4">{book?.title}</Typography>
          <Typography variant="body2" color="text.secondary">{book?.author}</Typography>
        </Stack>

        <Typography variant="body2">{book?.summary}</Typography>


      </Stack>

    </Card>
  );

  const renderOverview = (
    <Card sx={{ p: 3, gap: 2, display: 'flex', flexDirection: 'column' }}>
      {[
        {
          label: 'Published',
          value: fDate(book?.published),
          icon: <Iconify icon="solar:calendar-date-bold" />,
        },
        {
          label: 'ISBN',
          value: book?.isbn,
          icon: <Iconify icon="solar:clock-circle-bold" />,
        },
      ].map((item) => (
        <Stack key={item.label} spacing={1.5} direction="row">
          {item.icon}
          <ListItemText
            primary={item.label}
            secondary={item.value}
            primaryTypographyProps={{ typography: 'body2', color: 'text.secondary', mb: 0.5 }}
            secondaryTypographyProps={{
              component: 'span',
              color: 'text.primary',
              typography: 'subtitle2',
            }}
          />
        </Stack>
      ))}
    </Card>
  );

  const { averageRating } = useBookReviewSummary(book.reviews)

  const renderReview = book?.id ? (
    <BookDetailsReview
      bookId={book.id}
      reviews={book.reviews || []}
      averageRating={averageRating}
      totalReviews={book.reviews?.length || 0}
    />
  ) : null

  return (
    <Grid container spacing={4}>
      <Grid xs={12} md={8}>
        {renderContent}
      </Grid>

      <Grid xs={12} md={4}>
        {renderOverview}
      </Grid>
      <Grid xs={12} md={8}>
        <Stack spacing={2} mt={8}>
          {renderReview}
        </Stack>
      </Grid>
    </Grid>
  );
}
