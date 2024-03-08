import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import {
  getMarketFields,
  getMarketFilteredProducts,
  getMarketProducts,
  getMarketProductsContent,
} from '@store/thunks/market';
import { Filters, FilterFiled, MarketState } from '@store/slices/market.types';
import { GUID } from '@common/common.types';
import { Response } from '@common/api.types';
import { Item } from '@common/market.types';

const initialFilters: Filters = {
  product: '',
  price: 0,
  brand: '',
};

const initialState: MarketState = {
  itemsIdList: {},
  itemsDataList: {},
  brands: [],
  offset: 0,
  limit: 50,
  loading: false,
  filters: {
    isFilterEnabled: false,
    ...initialFilters,
  },
};

const marketSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {
    changeOffset(state, action: PayloadAction<{ newOffset: number }>) {
      state.offset = action.payload.newOffset;
    },
    applyFilters(state, action: PayloadAction<Partial<FilterFiled>>) {
      const { payload } = action;

      const newFilterEnabledState = Boolean(Object.values(payload)[0]);
      if (
        !newFilterEnabledState
      ) {
        state.itemsIdList = {};
        state.itemsDataList = {};
        state.offset = 0;
      }

      state.filters.isFilterEnabled = newFilterEnabledState;

      state.filters = { ...state.filters, ...initialFilters, ...payload };
    },
    clearFilters(state) {
      if (state.filters.isFilterEnabled) {
        state.filters.isFilterEnabled = false;
        state.filters = { ...state.filters, ...initialFilters };
        state.itemsIdList = {};
        state.itemsDataList = {};
        state.offset = 0;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getMarketProducts.pending,
        (state) => {
          const currentPage = state.offset;
          state.itemsIdList[currentPage] = [];

          state.loading = true;
        },
      )
      .addCase(
        getMarketProducts.fulfilled,
        (state, action: PayloadAction<Response<GUID[]>>) => {
          const { payload } = action;

          const currentPage = state.offset;

          if (payload && state.itemsIdList[currentPage].length === 0) {
            state.itemsIdList[currentPage] = payload.result;
          }
        },
      )
      .addCase(
        getMarketProductsContent.pending,
        (state) => {
          if (state.filters.isFilterEnabled) {
            state.loading = true;
          }
          state.itemsDataList[state.offset] = [];
        },
      )
      .addCase(
        getMarketProductsContent.fulfilled,
        (state, action: PayloadAction<Response<Item[]>>) => {
          const { payload } = action;

          const currentPage = state.offset;

          if (!state.itemsDataList[currentPage]) state.itemsDataList[currentPage] = [];
          if (payload && state.itemsDataList[currentPage].length === 0) {
            const filteredProductsIds: GUID[] = [];
            const filteredProducts: Item[] = [];

            payload.result.forEach((product) => {
              if (!filteredProductsIds.includes(product.id)) {
                filteredProductsIds.push(product.id);
                filteredProducts.push(product);
              }
            });

            state.itemsDataList[currentPage] = filteredProducts;
          }

          state.loading = false;
        },
      )
      .addCase(
        getMarketFilteredProducts.fulfilled,
        (state, action: PayloadAction<Response<GUID[]>>) => {
          const { payload } = action;

          state.offset = 0;
          state.itemsIdList = {};
          state.itemsDataList = {};
          const pageCount = Math.floor(payload.result.length / state.limit);

          for (let page = 0; page <= pageCount; page += 1) {
            const start = page * state.limit;
            state.itemsIdList[page] = payload.result.slice(start, start + state.limit);
          }
        },
      )
      .addCase(
        getMarketFields.fulfilled,
        (state, action: PayloadAction<Response<Item[keyof Item][]>>) => {
          const { payload: { result } } = action;

          const uniqueArray = [...new Set(result)];

          state.brands = uniqueArray;
        },
      );
  },
});

export const { changeOffset, applyFilters, clearFilters } = marketSlice.actions;

export default marketSlice.reducer;
