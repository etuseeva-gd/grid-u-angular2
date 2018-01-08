import {Action} from "@ngrx/store";

export const ProductsActionTypes = {
  ADD_NEW: '[Product] Add new',
  ADD: '[Product] Add',
  CREATE: '[Product] Create',
  EDIT: '[Product] Edit',
  DELETE: '[Product] Delete',
  FILTER: '[Product] Filter'
};

export class AddNew implements Action {
  readonly type: string = ProductsActionTypes.ADD_NEW;

  constructor(public payload: any) {
  }
}

export class Add implements Action {
  readonly type: string = <string>ProductsActionTypes.ADD;

  constructor(public payload: any) {
  }
}

export class Create implements Action {
  readonly type: string = <string>ProductsActionTypes.CREATE;

  constructor(public payload: any) {
  }
}

export class Edit implements Action {
  readonly type: string = <string>ProductsActionTypes.EDIT;

  constructor(public payload: any) {
  }
}

export class Delete implements Action {
  readonly type: string = <string>ProductsActionTypes.DELETE;

  constructor(public payload: any) {
  }
}

export class Filter implements Action {
  readonly type: string = <string>ProductsActionTypes.FILTER;

  constructor(public payload: any) {
  }
}

export type ProductActions = AddNew | Add | Create | Edit | Delete | Filter;
