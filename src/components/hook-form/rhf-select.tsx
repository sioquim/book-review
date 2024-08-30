import type { Theme, SxProps } from '@mui/material/styles';
import type { TextFieldProps } from '@mui/material/TextField';

import { Controller, useFormContext } from 'react-hook-form';

import TextField from '@mui/material/TextField';

// ----------------------------------------------------------------------

type RHFSelectProps = TextFieldProps & {
  name: string;
  native?: boolean;
  children: React.ReactNode;
  slotProps?: {
    paper?: SxProps<Theme>;
  };
};

export function RHFSelect({
  name,
  native,
  children,
  slotProps,
  helperText,
  inputProps,
  InputLabelProps,
  ...other
}: RHFSelectProps) {
  const { control } = useFormContext();

  const labelId = `${name}-select-label`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          select
          fullWidth
          SelectProps={{
            native,
            MenuProps: { PaperProps: { sx: { maxHeight: 220, ...slotProps?.paper } } },
            sx: { textTransform: 'capitalize' },
          }}
          InputLabelProps={{ htmlFor: labelId, ...InputLabelProps }}
          inputProps={{ id: labelId, ...inputProps }}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
        >
          {children}
        </TextField>
      )}
    />
  );
}
