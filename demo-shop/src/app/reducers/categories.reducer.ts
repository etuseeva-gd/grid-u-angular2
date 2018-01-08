import {CategoryActions, CategoryActionTypes} from "../actions/category.actions";

export function categories(state: any = [], action: CategoryActions) {
  switch (action.type) {
    case CategoryActionTypes.ADD:
      return action.payload;
    default:
      return state;
  }
}

