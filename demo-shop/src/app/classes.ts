import {IProduct} from "./interfaces";

export class Product implements IProduct {
  id: number;
  categoryId: number;
  image: string;
  name: string;
  description: string;
  cost: number;
  rating: number;
  gender: string;
  count: number;
  soldCount: number;

  constructor() {
    this.id = null;
    this.categoryId = null;
    this.image = null;
    this.name = null;
    this.description = null;
    this.cost = null;
    this.rating = null;
    this.gender = null;
    this.count = null;
    this.soldCount = null;
  }

}
