import {PRODUCTS} from "../services/product.service";

export const products = (state: any = [], {type, payload}) => {
  switch (type) {
    case PRODUCTS.ADD_PRODUCTS:
      return [...state, ...payload];
    case PRODUCTS.CREATE_PRODUCT:
      return [...state, payload];
    case PRODUCTS.EDIT_PRODUCT:
      return state.map(item => {
        return item.id === payload.id ? Object.assign({}, item, payload) : item;
      });
    case PRODUCTS.DELETE_PRODUCT:
      return state.filter(item => {
        return item.id !== payload.id;
      });
    case PRODUCTS.FILTER:
      //need filter
      return state.filter(item => {
        return payload.name && item.name.includes(payload.name);
      });
    default:
      return state;
  }
};
