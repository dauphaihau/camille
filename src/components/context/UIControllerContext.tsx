'use client'

import { createContext, useContext, useState } from "react";
import * as React from "react";

const initialState = {
  categories: [],
  progress: 0,
};


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
  // const [urlBeforeNavigateSettingPage, setUrlBeforeNavigateSettingPage] = useState()
  const [amountAllItemsCart, setAmountAllItemsCart] = useState(0)
  const [progress, setProgress] = useState(0)
  const [showSidebar, setShowSidebar] = useState(true)

  const providerValues: UIControllerProps = {
    // categories,
    progress, setProgress, amountAllItemsCart, setAmountAllItemsCart, showSidebar, setShowSidebar,
    // setUrlBeforeNavigateSettingPage, urlBeforeNavigateSettingPage
  };

  return (
    <UIControllerContext.Provider value={providerValues}>
      {children}
    </UIControllerContext.Provider>
  );
}
