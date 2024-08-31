'use client';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { BookNewEditForm } from '../book-new-edit-form';


// ----------------------------------------------------------------------

export function BookCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Create a new book"
        links={[
          { name: 'Books', href: paths.books.root },
          { name: 'Create' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <BookNewEditForm />
    </DashboardContent>
  );
}
