
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { useBoolean } from 'src/hooks/use-boolean';

import { fShortenNumber } from 'src/utils/format-number';

import { Tables } from 'src/database.types';

import { Iconify } from 'src/components/iconify';

import { BookReviewList } from './book-review-list';
import { BookReviewNewForm } from './book-review-new-form';

// ----------------------------------------------------------------------

type Props = {
  averageRating?: number;
  totalReviews?: number;
  reviews?: Tables<'review'>[];
  bookId: string;
};

export function BookDetailsReview({
  averageRating,
  totalReviews,
  reviews = [],
  bookId
}: Props) {
  const review = useBoolean();

  const renderSummary = (
    <Stack spacing={1} alignItems="center" justifyContent="center">
      <Typography variant="subtitle2">Average rating</Typography>

      <Typography variant="h2">
        {averageRating}
        /5
      </Typography>

      <Rating readOnly value={averageRating} precision={0.1} />

      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        ({fShortenNumber(totalReviews)} reviews)
      </Typography>
    </Stack>
  );

  const renderReviewButton = (
    <Stack alignItems="center" justifyContent="center">
      <Button
        size="large"
        variant="contained"
        color="inherit"
        onClick={review.onTrue}
        startIcon={<Iconify icon="solar:pen-bold" />}
      >
        Write your review
      </Button>
    </Stack>
  );

  return (
    <>
      <Box
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        sx={{ py: { xs: 5, md: 0 } }}
      >
        {renderSummary}

        {renderReviewButton}
      </Box>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <BookReviewList reviews={reviews} />

      <BookReviewNewForm open={review.value} onClose={review.onFalse} bookId={bookId} />
    </>
  );
}
