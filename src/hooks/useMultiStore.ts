import { StoreApi, UseBoundStore } from 'zustand';

// Utility function, to allow us to pick fields from the store
export const useMulti = <T extends object, K extends keyof T>(
  fn: UseBoundStore<StoreApi<T>>,
  ...items: K[]
): Pick<T, K> => {
  return items.reduce(
    (carry, item) => ({
      ...carry,
      // No need to use useShallow here, as we fetch the objects one by one
      [item]: fn((state) => state[item]),
    }),
    {}
  ) as Pick<T, K>;
};
