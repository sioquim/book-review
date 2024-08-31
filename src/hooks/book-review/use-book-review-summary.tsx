import type { Tables } from 'src/database.types';

import { useMemo } from 'react';

type Review = Tables<'review'>;

export function useBookReviewSummary(reviews: Review[]) {
    return useMemo(() => {
        const validReviews = reviews || [];
        const totalReviews = validReviews.length;

        const sum = validReviews.reduce((acc, review) => acc + (review.rating || 0), 0);
        const averageRating = totalReviews > 0 ? sum / totalReviews : 0;

        const reviewSummary = '';

        return { averageRating, reviewSummary };
    }, [reviews]);
}