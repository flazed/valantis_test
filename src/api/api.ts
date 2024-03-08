import { call } from '@services/call';

import {
  APIType,
  GetFilteredProductsID,
  GetProductsContentParams,
  GetProductsParams,
} from '@common/api.types';
import { GUID } from '@common/common.types';
import { Item } from '@common/market.types';

const apiUrl: string = `https://${import.meta.env.VITE_API_URL}` ?? '';

function API(): APIType {
  return {
    getProducts(params: GetProductsParams) {
      return call<GetProductsParams, GUID[]>(apiUrl, 'POST', {
        action: 'get_ids',
        params,
      });
    },

    getProductsContent(params: GetProductsContentParams) {
      return call<GetProductsContentParams, Item[]>(apiUrl, 'POST', {
        action: 'get_items',
        params,
      });
    },

    getFilteredProductsID(params: Partial<GetFilteredProductsID>) {
      return call<Partial<GetFilteredProductsID>, GUID[]>(apiUrl, 'POST', {
        action: 'filter',
        params,
      });
    },

    getFields(params) {
      return call(apiUrl, 'POST', {
        action: 'get_fields',
        params,
      });
    },
  };
}

export const api = API();
