import { z as zod } from 'zod';

import { schemaHelper } from 'src/components/hook-form/schema-helper';

// ----------------------------------------------------------------------

export const newBookSchema = zod.object({
  title: zod.string().min(1, { message: 'Please enter a title for the book.' }).max(255, { message: 'Title must be 255 characters or less.' }),
  author: zod.string().min(1, { message: 'Please provide the author\'s name.' }).max(100, { message: 'Author name must be 100 characters or less.' }),
  published: schemaHelper.date({ message: { invalid_type_error: 'Please enter a valid date.' } }).optional().nullable(),
  isbn: zod.string()
    .regex(/^(?:\d{3}-\d-\d{2,7}-\d{1,7}-\d|\d{10}|\d{13})$/, 'ISBN must be in a valid format (e.g., 978-0-316-76948-0) or 10/13 digits.')
    .max(17, { message: 'ISBN must be 17 characters or less.' })
    .optional()
    .nullable(),
  genre: zod.string().max(50, { message: 'Genre must be 50 characters or less.' }).optional().nullable(),
  summary: zod.string().max(2000, { message: 'Summary must be 1000 characters or less.' }).optional().nullable(),
});
