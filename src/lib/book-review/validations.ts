import { z as zod } from 'zod';

// ----------------------------------------------------------------------

export const bookReviewSchema = zod.object({
  rating: zod.number().min(1, 'Please provide a rating of at least 1 star.'),
  comment: zod.string().min(1, { message: 'Please share your thoughts about the book.' }),
  reviewer_name: zod.string().min(1, { message: 'Please enter your name.' }),
  reviewer_email: zod
    .string()
    .min(1, { message: 'Please provide your email address.' })
    .email({ message: 'Please enter a valid email address.' }),
});
