'use client';


import type { TablesUpdate } from 'src/database.types';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { BookNewEditForm } from '../book-new-edit-form';

// ----------------------------------------------------------------------

type Props = {
  book?: TablesUpdate<'book'>;
};

export function BookEditView({ book }: Props) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Books', href: paths.books.root },
          { name: book?.title },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <BookNewEditForm currentBook={book} />
    </DashboardContent>
  );
}
