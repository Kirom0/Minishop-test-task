import { configureStore } from '@reduxjs/toolkit';
import { reducer as cartReducer } from './cart/reducer';

export const store = configureStore({
  reducer: {
    cart: cartReducer
  }
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;