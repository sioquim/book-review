'use client';

import { paths } from 'src/routes/paths';

import { useTabs } from 'src/hooks/use-tabs';

import { Tables } from 'src/database.types';
import { DashboardContent } from 'src/layouts/dashboard';

import { BookDetailsToolbar } from '../book-details-toolbar';
import { BookDetailsContent } from '../book-details-content';



// ----------------------------------------------------------------------

type Props = {
  book: Tables<'book'> & { reviews: Tables<'review'>[] };
};

export function BookDetailsView({ book }: Props) {
  const tabs = useTabs('content');
  return (
    <DashboardContent>
      <BookDetailsToolbar
        backLink={paths.books.root}
        editLink={paths.books.edit(`${book?.id}`)}
      />

      {tabs.value === 'content' && <BookDetailsContent book={book} />}

    </DashboardContent>
  );
}
