import { GUID } from '@common/common.types';

export type Item = {
  brand: string | null
  id: GUID,
  price: number,
  product: string
};
