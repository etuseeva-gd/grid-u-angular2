import {Action} from "@ngrx/store";
import {ProductsAction} from "./products.action";

export default function productsReducer(state: any, action: Action) {
  switch (action.type) {
    case ProductsAction.ADD: {
      return state;
    }
    default:
      return state;
  }
}
