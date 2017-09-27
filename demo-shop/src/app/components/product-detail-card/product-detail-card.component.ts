import {Component, OnInit, Input} from '@angular/core';
import {IProduct} from "../../interfaces";

@Component({
  selector: 'app-product-detail-card',
  templateUrl: './product-detail-card.component.html',
  styleUrls: ['./product-detail-card.component.scss']
})
export class ProductDetailCardComponent implements OnInit {

  @Input()
  product: IProduct;
  
  constructor() { }

  ngOnInit() {
  }

}
