import React, { createContext, useContext } from "react";

export const SearchOptionsContext = createContext([]);

export const SearchOptionsProvider = ({ children, options }) => (
  <SearchOptionsContext.Provider value={options}>
    {children}
  </SearchOptionsContext.Provider>
);

export const useSearchOptions = () => useContext(SearchOptionsContext);