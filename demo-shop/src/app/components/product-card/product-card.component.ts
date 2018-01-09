import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {IProduct} from "../../models";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input()
  product: IProduct;

  @Input()
  hasAdminAccess: boolean;

  @Output()
  detailsEventEmitter = new EventEmitter<IProduct>();

  @Output()
  deleteEventEmitter = new EventEmitter<IProduct>();

  constructor() { }

  ngOnInit() {
  }

  showDetails() {
    this.detailsEventEmitter.emit(this.product);
  }

  deleteProduct() {
    this.deleteEventEmitter.emit(this.product);
  }
}
