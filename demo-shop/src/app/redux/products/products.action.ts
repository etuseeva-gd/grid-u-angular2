import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {ProductState} from "../../models/models";
import {createAction} from "../createAction";

@Injectable()
export class ProductsAction {
  static ADD = 'ADD';

  //???
  constructor(private store: Store<ProductState>) {

  }

  add() {
    this.store.dispatch(createAction(ProductsAction.ADD));
  }
}
