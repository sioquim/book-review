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
        heading="Add a new book"
        links={[
          { name: 'Dashboard', href: paths.root },
          { name: 'Book', href: paths.root },
          { name: 'New book' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <BookNewEditForm />
    </DashboardContent>
  );
}
