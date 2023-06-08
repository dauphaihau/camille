import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function formatDate(input: Date | string | number, options?: object): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", options ?? {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  })
}

export const fetcher = async (
  url: string,
  payload?: any,
  method?: string,
) => {
  const options = {
    method: method ?? (payload ? "POST" : "GET"),
    ...(payload && { body: JSON.stringify(payload) }),
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  return fetch(url, options).then(r => r.json()).catch(err => err);
};

export const capitalize = s => (s && s[0].toUpperCase() + s.slice(1)) || ""

export function debounce(callback, interval: number) {
  let debounceTimeoutId;
  return function (...args) {
    clearTimeout(debounceTimeoutId);
    debounceTimeoutId = setTimeout(
      () => callback.apply(null, args),
      interval
    );
  };
}

export function getValueOfLastBracketInString(str) {
  if (!str) {
    return '';
  }
  let isStringHaveBrackets = str.match(/(.*)\(.*\)/);
  if (isStringHaveBrackets) {
    return str.match(/\(([^)]+)\)?(){1}$/)[1];
  }
}

export const wordInString = (s, word) => new RegExp('\\b' + word + '\\b', 'i').test(s);

export const isEmptyObject = (obj = {}) => {
  return Object.keys(obj).length === 0
}

export const isNil = (value) => {
  return typeof value === 'undefined' || value === null
}

export const isString = (value) => {
  return typeof value === 'string' || value instanceof String
}

export const isNumber = (value) => {
  return typeof value == 'number' && !isNaN(value)
}

export const isBoolean = (value) => {
  return value === true || value === false
}

export const omitFieldNullish = (obj) => {
  return Object.entries(obj)
  .filter(([_, v]) => v || v === 0)
  .reduce(
    (acc, [k, v]) => ({ ...acc, [k]: v === Object(v) ? omitFieldNullish(v) : v }),
    {}
  );
}

// ---------- others
export const createMaps = <ObjectMapType extends Record<string, string>>(
  obj: ObjectMapType
) => obj;

export const capitalizeEachWord = (text: string) => {
  if (typeof text !== 'string') return
  const pattern = /(^\w|\s\w)(\S*)/g
  return text.replace(pattern, (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase())
}
