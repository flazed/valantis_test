import { GUID } from '@common/common.types';
import { Item } from '@common/market.types';

export type MarketState = {
  itemsIdList: Record<number, GUID[]>
  itemsDataList: Record<number, Item[]>
  brands: Item[keyof Item][]
  offset: number
  limit: number
  loading: boolean
  filters: {
    isFilterEnabled: boolean
  } & Filters
};

export type Filters = {
  product: string,
  price: number,
  brand: string
};

export type FilterFiled = {
  [K in keyof Filters]: Filters[K]
};
