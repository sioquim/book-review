
import type { Tables } from 'src/database.types';

import { BookReviewItem } from './book-review-item';

// ----------------------------------------------------------------------

type Props = {
  reviews: Tables<'review'>[];
};

export function BookReviewList({ reviews }: Props) {
  return (
    <>
      {reviews.map((review) => (
        <BookReviewItem key={review.id} review={review} />
      ))}
    </>
  );
}
