import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {IProduct} from "../../interfaces";
import {NOT_FOUND_IMAGE} from "../../constants";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductListCardComponent implements OnInit {
  @Input()
  product: IProduct;

  @Output()
  detailsEventEmitter = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  showDetails() {
    this.detailsEventEmitter.emit(this.product.id);
  }

  getNotFoundImage() {
    return NOT_FOUND_IMAGE;
  }

}
