import {Component, OnDestroy, OnInit} from '@angular/core';
import {IModal, IModalActions, IModalAnswer, MODAL_ACTIONS, ModalService} from "./modal.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
  private showModal: boolean;

  private _mAction: Subscription;

  private modal: IModal;

  // private modal: IModal = {
  //   header: 'header',
  //   body: 'body',
  //   footer: 'footer'
  // };

  constructor(private modalService: ModalService) {
  }

  ngOnInit() {
    this._mAction = this.modalService.modalAction.subscribe((data: IModalActions) => {
      switch (data.action) {
        case MODAL_ACTIONS.OPEN: {
          this.modal = data.modal;
          this.toggleModal();
          break;
        }
        case MODAL_ACTIONS.CLOSE: {
          this.toggleModal();
          break;
        }
      }
    });
  }

  ngOnDestroy() {
    this._mAction.unsubscribe();
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  submit() {
    this.modal.onSubmit();
    this.toggleModal();
  }

}
