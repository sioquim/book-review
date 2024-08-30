import { Container } from '@mui/material';

import { DashboardLayout } from 'src/layouts/dashboard';


// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <DashboardLayout>
      <Container maxWidth="lg">{children}</Container>
    </DashboardLayout>
  );
}
