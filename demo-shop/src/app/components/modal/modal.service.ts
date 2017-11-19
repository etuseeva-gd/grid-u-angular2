import {Injectable} from '@angular/core';
import {Subject} from "rxjs/Subject";

export const MODAL_ACTIONS = {
  OPEN: 'OPEN',
  CLOSE: 'CLOSE'
};

export interface IModalActions {
  action: string;
  modal?: IModal;
}

export interface IModal {
  header?: string;
  body?: string;
  footer?: string;
  submitButton?: boolean;
  onSubmit?: Function;
  closeButton?: boolean;
  textButton?: string;
}

export interface IModalAnswer {
  confirm?: boolean;
}

@Injectable()
export class ModalService {
  private _modalAction = new Subject();

  constructor() {
  }

  get modalAction() {
    return this._modalAction.asObservable();
  }

  open(modal: IModal) {
    this._modalAction.next({action: MODAL_ACTIONS.OPEN, modal} as IModalActions);
  }

  close() {
    this._modalAction.next({action: MODAL_ACTIONS.CLOSE} as IModalActions);
  }

}
