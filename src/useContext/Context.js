import React, { createContext, useEffect, useState } from "react";

export const StoreContext = createContext({
  searchQuery: "",
  subCategory: {},
  setSubCategory: {},
});

export const StoreProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [subCategory, setSubCategory] = useState({});

  return (
    <StoreContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        subCategory,
        setSubCategory,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
