import { ProductInCart } from './../../interfaces/Product';
import { AnyAction } from 'redux';

export type CartAction = SetAction;

export interface SetAction extends AnyAction {
  payload: ProductInCart,
}
export const setAction : (payload : ProductInCart) => SetAction = (payload) => {
  return {
    type: 'set',
    payload,
  }
}