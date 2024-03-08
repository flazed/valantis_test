import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '@api/api';
import {
  GetProductsParams,
  GetProductsContentParams,
  GetFilteredProductsID,
  GetFieldsParams,
} from '@common/api.types';

export const getMarketProducts = createAsyncThunk(
  'market/getMarketProducts',
  async (params: GetProductsParams) => api.getProducts(params),
);

export const getMarketProductsContent = createAsyncThunk(
  'market/getMarketProductsContent',
  async (params: GetProductsContentParams) => api.getProductsContent(params),
);

export const getMarketFilteredProducts = createAsyncThunk(
  'market/getMarketFilteredProducts',
  async (params: Partial<GetFilteredProductsID>) => api.getFilteredProductsID(params),
);

export const getMarketFields = createAsyncThunk(
  'market/getMarketFields',
  async (params: GetFieldsParams) => api.getFields(params),
);
