import {Action} from "@ngrx/store";
export const CategoryActionTypes = {
  ADD: '[Category] Add'
};

export class Add implements Action {
  readonly type: string = CategoryActionTypes.ADD;

  constructor(public payload: any) {
  }
}

export type CategoryActions = Add;
