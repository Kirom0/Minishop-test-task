import { CartAction, SetAction } from './actions';
import { Reducer } from "redux";
import { ICartState, defaultState } from "./state";

export const reducer : Reducer<ICartState, CartAction> = (state = defaultState, action) => {
  console.log('reducer', action);
  switch (action.type) {
    case 'set':
      const payload = (action as SetAction).payload;
      if (state.some(prod => prod.product.id === payload.product.id)) {
        if (action.payload.count === 0) { //Delete
          return state.filter(prod => prod.product.id !== payload.product.id);
        }
        return state.map(prod => // Refresh
          prod.product.id === action.payload.product.id ?
          {...prod, count: action.payload.count} : 
          prod
        );
      }
      return [...state, payload]; //Add
    default: return state;
  }
}