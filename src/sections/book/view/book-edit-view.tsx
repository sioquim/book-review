'use client';


import { paths } from 'src/routes/paths';

import { TablesUpdate } from 'src/database.types';
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
          { name: 'Dashboard', href: paths.root },
          { name: 'Book', href: paths.root },
          { name: book?.title },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <BookNewEditForm currentBook={book} />
    </DashboardContent>
  );
}
