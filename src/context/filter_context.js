import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/filter_reducer";
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";

const initialState = {
  all_products: [],
  filtered_products: [],
  grid_view: false,
  sort: "price-lowest",
  filters: {
    search: "",
    category: "all",
    company: "all",
    colors: "all",
    max_price: 0,
    min_price: 0,
    price: 0,
    free_shipping: false,
  },
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { products } = useProductsContext();
  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);
  useEffect(() => {
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.sort]);
  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
  }, [state.all_products, state.filters]);

  const handleGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };
  const handleListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };

  const updateSort = (e) => {
    const value = e.target.value;

    dispatch({ type: UPDATE_SORT, payload: value });
  };

  const updateFilters = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "free_shipping") {
      value = e.target.checked;
    }

    dispatch({ type: UPDATE_FILTERS, name, value });
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  return (
    <FilterContext.Provider
      value={{
        ...state,
        handleGridView,
        handleListView,
        updateSort,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
