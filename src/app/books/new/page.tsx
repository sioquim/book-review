import { CONFIG } from 'src/config-global';

import { BookCreateView } from 'src/sections/book/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Create a new job | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <BookCreateView />;
}
