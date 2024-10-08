import { redirect } from 'next/navigation'

import { paths } from 'src/routes/paths';

import { createClient } from 'src/utils/supabase-server';

import { CONFIG } from 'src/config-global';

import { BookDetailsView } from 'src/sections/book/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Book details | Dashboard - ${CONFIG.site.name}` };

type Props = {
  params: { id: string };
};

export default async function Page({ params }: Props) {
  const { id } = params;

  const supabase = createClient()
  const { data: book, error } = await supabase
    .from('book')
    .select(`
      *,
      reviews:review(*)
    `)
    .eq('id', id)
    .maybeSingle()

  if (error) {
    redirect(paths.page500)
  }

  if (!book) {
    redirect(paths.page404)
  }

  return <BookDetailsView book={book} />;
}