import { configureStore } from '@reduxjs/toolkit';

import products from './slices/productsSlice';
import cart from './slices/cartSlice';
import user from './slices/userSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    products,
    cart,
    user
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch ;