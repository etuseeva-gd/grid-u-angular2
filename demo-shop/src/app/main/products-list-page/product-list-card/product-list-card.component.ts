import {Component, Input, OnInit} from '@angular/core';
import {IProduct} from "../../../interfaces";

@Component({
  selector: 'app-product-list-card',
  templateUrl: './product-list-card.component.html',
  styleUrls: ['./product-list-card.component.scss']
})
export class ProductListCardComponent implements OnInit {
  @Input()
  product: IProduct;

  constructor() { }

  ngOnInit() {
  }

}
