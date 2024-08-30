import { z as zod } from 'zod';

import { schemaHelper } from 'src/components/hook-form/schema-helper';

// ----------------------------------------------------------------------

export const newBookSchema = zod.object({
  title: zod.string().min(1, { message: 'Please enter a title for the book.' }),
  author: zod.string().min(1, { message: 'Please provide the author\'s name.' }),
  published: schemaHelper.date({ message: { invalid_type_error: 'Please enter a valid date.' } }).optional().nullable(),
  isbn: zod.string()
    .regex(/^(?:\d{10}|\d{13})$/, 'ISBN must be 10 or 13 digits long.')
    .optional()
    .nullable(),
  genre: zod.string().optional().nullable(),
  summary: zod.string().optional().nullable(),
});
