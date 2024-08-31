import { CONFIG } from 'src/config-global';

import { BookCreateView } from 'src/sections/book/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Add a book | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <BookCreateView />;
}
