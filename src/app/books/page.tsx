
import { redirect } from 'next/navigation'

import { paths } from 'src/routes/paths';

import { createClient } from 'src/utils/supabase-server';

import { CONFIG } from 'src/config-global';

import { BookListView } from 'src/sections/book/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Book list | Dashboard - ${CONFIG.site.name}` };

export default async function Page() {

  const supabase = createClient()
  const { data: books, error } = await supabase
    .from('book')
    .select(`
      *,
      reviews:review(*)
    `)

  if (error) {
    redirect(paths.page500)
  }


  return <BookListView books={books || []} />;
}
