export enum Roles {
  Admin,
  User
}

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

export const NOT_FOUND_IMAGE = 'http://www.kickoff.com/chops/images/resized/large/no-image-found.jpg';
