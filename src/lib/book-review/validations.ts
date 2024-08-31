import { z as zod } from 'zod';

// ----------------------------------------------------------------------

export const bookReviewSchema = zod.object({
  rating: zod.number().min(1, 'Please provide a rating of at least 1 star.').max(5, 'Rating cannot exceed 5 stars.'),
  comment: zod.string()
    .min(1, { message: 'Please share your thoughts about the book.' })
    .max(1000, { message: 'Your review must be 1000 characters or less.' }),
  reviewer_name: zod.string()
    .min(1, { message: 'Please enter your name.' })
    .max(100, { message: 'Name must be 100 characters or less.' }),
  reviewer_email: zod
    .string()
    .min(1, { message: 'Please provide your email address.' })
    .email({ message: 'Please enter a valid email address.' })
    .max(255, { message: 'Email must be 255 characters or less.' }),
});
