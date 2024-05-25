import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function formatDate(input: Date | string | number, options?: object): string {
  const date = new Date(input);
  return date.toLocaleDateString('en-US', options ?? {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
}

// Extends the return of the HTTPError class
export async function fetcher<TResponseBody = unknown>(
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any,
  method?: string
) {
  const options = {
    method: method ?? (payload ? 'POST' : 'GET'),
    ...(payload && { body: JSON.stringify(payload) }),
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  return fetch(url, options).then(r => r.json() as TResponseBody).catch(err => err);
}

export const capitalize = s => (s && s[0].toUpperCase() + s.slice(1)) || '';

export function getValueOfLastBracketInString(str) {
  if (!str) {
    return '';
  }
  const isStringHaveBrackets = str.match(/(.*)\(.*\)/);
  if (isStringHaveBrackets) {
    return str.match(/\(([^)]+)\)?(){1}$/)[1];
  }
}

export const wordInString = (s: string | null, word: string) => {
  if (!s) return false;
  return new RegExp('\\b' + word + '\\b', 'i').test(s);
};

export const isEmptyObject = (obj = {}) => {
  return Object.keys(obj).length === 0;
};

export const isNil = (value: unknown) => {
  return typeof value === 'undefined' || value === null;
};

export const isString = (value: unknown) => {
  return typeof value === 'string' || value instanceof String;
};

export const isNumber = (value: unknown) => {
  return typeof value == 'number' && !isNaN(value);
};

export const isBoolean = (value: unknown) => {
  return value === true || value === false;
};

export const omitFieldNullish = (obj: object) => {
  return Object.entries(obj)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, v]) => v || v === 0)
    .reduce(
      (acc, [k, v]) => ({ ...acc, [k]: v === Object(v) ? omitFieldNullish(v) : v }),
      {}
    );
};

// ---------- others
export const createMaps = <ObjectMapType extends Record<string, string>>(
  obj: ObjectMapType
) => obj;

export const capitalizeEachWord = (text?: string) => {
  if (typeof text !== 'string') return;
  const pattern = /(^\w|\s\w)(\S*)/g;
  return text.replace(pattern, (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase());
};
