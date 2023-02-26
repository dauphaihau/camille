export const BASE_URL = process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_BASE_URL : "http://localhost:3000"

export enum USER_STATUS {NOT_ACTIVATED = -1, LOCKED, ACTIVE}

export const PATH = {
  HOME: '/',
  LOGIN: '/login',
  PRICING: '/pricing',
  FEATURES: '/features',
  SOLUTIONS: '/solutions',

  PRODUCT: {
    _: '/product',
  },
  CATEGORIES: {
    _: '/categories',
  },
  ABOUT: {
    _: '/about',
  },
  CHECKOUT: {
    _: '/checkout',
  },
  NEWS: {
    _: '/news',
  },
};
