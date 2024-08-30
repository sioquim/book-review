import type { Dayjs } from 'dayjs';

// ----------------------------------------------------------------------

type IPaymentCard = {
  id: string;
  cardType: string;
  primary?: boolean;
  cardNumber: string;
};

export type IAddressItem = {
  id?: string;
  name: string;
  company?: string;
  primary?: boolean;
  fullAddress: string;
  phoneNumber?: string;
  addressType?: string;
};

type IDateValue = string | number | null;

type IDatePickerControl = Dayjs | null;

type ISocialLink = {
  facebook: string;
  instagram: string;
  linkedin: string;
  twitter: string;
};
