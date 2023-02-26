import { createContext, useContext, useState } from "react";
import * as React from "react";

const initialState = {
  categories: [],
  progress: 0,
};

type Category  = {
  _id: string,
  count: number
}

export interface UIControllerProps {
  progress: number,
  setProgress: (prevState) => void,
  showSidebar: boolean,
  setShowSidebar: (prevState) => void,
  setAmountAllItemsCart: (prevState) => void,
  // categories: Category[],
  amountAllItemsCart: number,
}

export const UIControllerContext = createContext<Partial<UIControllerProps>>(initialState)

export function useUIController() {
  return useContext(UIControllerContext);
}

export const UIControllerProvider = ({ children }) => {
  // const { categories } = useCategories();
  const [amountAllItemsCart, setAmountAllItemsCart] = useState(0)
  const [progress, setProgress] = useState(0)
  const [showSidebar, setShowSidebar] = useState(true)

  const providerValues: UIControllerProps = {
    // categories,
    progress, setProgress, amountAllItemsCart, setAmountAllItemsCart, showSidebar, setShowSidebar
  };

  return (
    <UIControllerContext.Provider value={providerValues}>
      {children}
    </UIControllerContext.Provider>
  );
}
