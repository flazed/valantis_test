import { configureStore } from '@reduxjs/toolkit';
import marketSlice from '@store/slices/marketSlice';

const store = configureStore({
  reducer: {
    market: marketSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
