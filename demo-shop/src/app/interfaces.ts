export interface IProduct {
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
}

export interface IUser {
  id: number;
  login: string;
  roleId: number;
}

export interface IRole {
  id: number;
  name: string;
}

export interface ICategory {
  id: number;
  name: string;
}
