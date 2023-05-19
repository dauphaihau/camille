import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXTAUTH_URL}${path}`
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

function isDefined(value) {
  return value !== null && typeof value !== 'undefined';
}

export function connectRelations(data, relations) {
  const d = { ...data }; // it would be better to deep clone the data

  Object.keys(relations).forEach((key) => {
    if (Object.values(relations[key]).filter(isDefined).length > 0) {
      d[key] = { connect: relations[key] };
    }
  });
  return d;
}

export const capitalize = s => (s && s[0].toUpperCase() + s.slice(1)) || ""

export const sliceText = (text: string, quantity: number): string => {
  if (text && text.length > quantity) {
    return text.slice(0, quantity) + '...'
  }
  return text
}

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

export const uniqElement = (arr) => {
  return [...new Set(arr.filter((value, index, self) => self.indexOf(value) === index))];
}

export const toLower = (value) => {
  if (isString(value)) {
    return value.toLowerCase()
  }
  return value
}

// export const isEmpty = (obj = {}) => {
//   return Object.keys(obj).length === 0
// }

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

export const isDateString = (value) => {
  if (!isString(value)) return false

  return value.match(/^\d{2}-\d{2}-\d{4}$/)
}

export const omitFieldNullish = (obj) => {
  return Object.entries(obj)
  .filter(([_, v]) => v || v === 0)
  .reduce(
    (acc, [k, v]) => ({ ...acc, [k]: v === Object(v) ? omitFieldNullish(v) : v }),
    {}
  );
}

export const convertDateString = (value) => {
  return value.substr(6, 4) + value.substr(3, 2) + value.substr(0, 2)
}

// ----------------- components
// export const filterRows = (rows, filters) => {
//   if (isEmpty(filters)) return rows
//
//   return rows.filter((row) => {
//     return Object.keys(filters).every((accessor) => {
//       const value = row[accessor]
//       const searchValue = filters[accessor]
//
//       if (isString(value)) {
//         return toLower(value).includes(toLower(searchValue))
//       }
//
//       if (isBoolean(value)) {
//         return (searchValue === 'true' && value) || (searchValue === 'false' && !value)
//       }
//
//       if (isNumber(value)) {
//         return value == searchValue
//       }
//
//       return false
//     })
//   })
// }

export const sortRows = (rows, sort) => {
  return rows.sort((a, b) => {
    const { order, orderBy } = sort

    if (isNil(a[orderBy])) return 1
    if (isNil(b[orderBy])) return -1

    const aLocale = convertType(a[orderBy])
    const bLocale = convertType(b[orderBy])

    if (order === 'asc') {
      return aLocale.localeCompare(bLocale, 'en', { numeric: isNumber(b[orderBy]) })
    } else {
      return bLocale.localeCompare(aLocale, 'en', { numeric: isNumber(a[orderBy]) })
    }
  })
}

export const paginateRows = (sortedRows, currentPage, rowsPerPage) => {
  return [...sortedRows].slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
}

// ---------- others

export function titleIfy(slug: string, except = ['and', 'with', 'of']) {
  if (!slug) return
  let words = slug.split('-')
  for (let i = 0; i < words.length; i++) {
    let word = words[i]
    if (!except.includes(word)) {
      words[i] = word.charAt(0).toUpperCase() + word.slice(1)
    }
  }
  return words.join(' ')
}

export const formatDollarUS = (amount = 0, newOptions = {}) => {
  const pattern = /\d{1,2}[\,\.]{1}\d{1,2}/
  const isContainDot = pattern.test(String(amount))
  let options = {
    style: "currency",
    currency: "USD",
    useGrouping: true,
    maximumSignificantDigits: !isContainDot ? 3 : undefined,
  }
  options = { ...options, ...newOptions }
  return new Intl.NumberFormat("en-US", options).format(amount);
};

export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type]);
  if (type === "colors") {
    unique = unique.flat();
    unique = unique.filter(u => u !== undefined);
  }
  return ["all", ...new Set(unique)];
};

export const convertType = (value) => {
  if (isNumber(value)) {
    return value.toString()
  }

  if (isDateString(value)) {
    return convertDateString(value)
  }

  if (isBoolean(value)) {
    return value ? '1' : '-1'
  }

  return value
}

export const createMaps = <ObjectMapType extends Record<string, string>>(
  obj: ObjectMapType
) => obj;

export const capitalizeEachWord = (text: string) => {
  if (typeof text !== 'string') return
  const pattern = /(^\w|\s\w)(\S*)/g
  return text.replace(pattern, (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase())
}
