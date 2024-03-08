import { GUID } from '@common/common.types';
import { Item } from '@common/market.types';
import { Filters } from '@store/slices/market.types';

export type Response<T> = {
  result: T
};

export interface APIType {
  getProducts: (params: GetProductsParams) => Promise<Response<GUID[]>>
  getProductsContent: (params: GetProductsContentParams) => Promise<Response<Item[]>>
  getFilteredProductsID: (params: Partial<GetFilteredProductsID>) => Promise<Response<GUID[]>>
  getFields: (params: GetFieldsParams) => Promise<Response<(Item[keyof Item])[]>>
}

export type GetProductsParams = {
  offset: number
  limit: number
};

export type GetProductsContentParams = {
  ids: GUID[]
};

export type GetFilteredProductsID = {
  [K in keyof Filters]: Filters[K]
};

export type GetFieldsParams = {
  field: keyof Item
  offset?: number
  limit?: number
};
