// export const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASE_URL : 'http://localhost:3000'

export enum USER_STATUS {NOT_ACTIVATED = -1, LOCKED, ACTIVE}

export const SUFFIX_DOMAIN_SHARE_TO_WEB = '.camille.site'

export enum ROLE_USER_ON_WORKSPACE {ADMIN = 0, MEMBER, GUEST}

export enum DELETE_PAGE_TYPE {SOFT_DELETE = 0, HARD_DELETE, RECOVER}

export enum ARCHIVED_TEAMSPACE {SOFT_DELETE = 0, HARD_DELETE, RECOVER}

export const PATH = {
  HOME: '/',
  LOGIN: '/login',
  PRICING: '/pricing',
  FEATURES: '/features',
  SOLUTIONS: '/solutions',
  WORKSPACE: '/workspace',
  SETTINGS: '/settings',
};
