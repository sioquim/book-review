import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack, { StackProps } from '@mui/material/Stack';

import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = StackProps & {
  backLink: string;
  editLink: string;
};

export function BookDetailsToolbar({
  backLink,
  editLink,
  sx,
  ...other
}: Props) {

  return (
    <Stack spacing={1.5} direction="row" sx={{ mb: { xs: 3, md: 5 }, ...sx }} {...other}>
      <Button
        component={RouterLink}
        href={backLink}
        startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
      >
        Back
      </Button>

      <Box sx={{ flexGrow: 1 }} />
      <Button
        component={RouterLink}
        href={editLink}
        startIcon={<Iconify icon="solar:pen-bold" width={16} />}
      >
        Edit
      </Button>

    </Stack>
  );
}
