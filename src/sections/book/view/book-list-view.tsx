
'use client';

import type { Tables } from 'src/database.types';

import { useState, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useSetState } from 'src/hooks/use-set-state';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { BookList } from '../book-list';
import { BookSearch } from '../book-search';


// ----------------------------------------------------------------------

type Props = {
  books: Tables<'book'>[];
}

export function BookListView({ books }: Props) {

  const [sortBy, setSortBy] = useState('latest');

  const search = useSetState<{
    query: string;
    results: Tables<'book'>[];
  }>({ query: '', results: [] });



  const notFound = !books.length;

  const handleSortBy = useCallback((newValue: string) => {
    setSortBy(newValue);
  }, []);

  const handleSearch = useCallback(
    (inputValue: string) => {
      search.setState({ query: inputValue });

      if (inputValue) {
        const results = books.filter(
          (book) => book.title.toLowerCase().indexOf(search.state.query.toLowerCase()) !== -1
        );

        search.setState({ results });
      }
    },
    [search, books]
  );

  const renderFilters = (
    <Stack
      spacing={3}
      justifyContent="space-between"
      alignItems={{ xs: 'flex-end', sm: 'center' }}
      direction={{ xs: 'column', sm: 'row' }}
    >
      <BookSearch search={search} onSearch={handleSearch} />
    </Stack>
  );

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="List"
        links={[
          { name: 'Books', href: paths.books.root },
          { name: 'List' },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.books.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New book
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Stack spacing={2.5} sx={{ mb: { xs: 3, md: 5 } }}>
        {renderFilters}
      </Stack>

      {notFound && <EmptyContent filled sx={{ py: 10 }} />}

      <BookList books={books} />
    </DashboardContent>
  );
}
