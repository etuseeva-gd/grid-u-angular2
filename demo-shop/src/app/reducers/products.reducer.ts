import {ProductActions, ProductsActionTypes} from "../actions/product.actions";

export function products(state: any = [], action: ProductActions) {
  switch (action.type) {
    case ProductsActionTypes.ADD_NEW:
      return action.payload;
    case ProductsActionTypes.ADD:
      return [...state, ...action.payload];
    case ProductsActionTypes.CREATE:
      return [...state, action.payload];
    case ProductsActionTypes.EDIT:
      return state.map(item => {
        return item.id === action.payload.id ? Object.assign({}, item, action.payload) : item;
      });
    case ProductsActionTypes.DELETE:
      return state.filter(item => {
        return item.id !== action.payload.id;
      });
    case ProductsActionTypes.FILTER:
      return state.filter(item => {
        return action.payload.name && item.name.includes(action.payload.name);
      });
    default:
      return state;
  }
}
