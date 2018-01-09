export enum Roles {
  Admin,
  User
}

// export enum Gender {
//   MAN = 'Man',
//   WOMAN = 'Woman',
//   UNISEX = 'Unisex',
// }

export const API = {
  LOGIN: '/login',
  LOGOUT: '/logout',
};

export const PATHS = {
  MAIN: "/main",
  PRODUCTS: {
    LIST: "/main/products-list",
    DETAILS: "/main/product/details",
    EDIT: "/main/product/edit",
  },
  ERROR: "/404",
  LOGIN: "/login"
};
