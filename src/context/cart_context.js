import React, { useEffect, useContext, useReducer } from "react";

import reducer from "../reducers/cart_reducer";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from "../actions";

//localStorage is browser api
const getLocalStorage = () => {
  const localCart = localStorage.getItem("cart");
  if (localCart) {
    return JSON.parse(localCart);
  } else {
    return [];
  }
};

const initialState = {
  cart: getLocalStorage(),
  amount: 0,
  subtotal: 0,
  shipping: 534,
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const countCartTotals = () => {
    dispatch({ type: COUNT_CART_TOTALS });
  };

  const removeCartItem = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id });
  };
  const addToCart = (name, id, color, amount, image, stock, price) => {
    dispatch({
      type: ADD_TO_CART,
      payload: { name, id, color, amount, image, stock, price },
    });
  };

  const toggleCartItemAmount = (id, itemAmount) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, itemAmount } });
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
    countCartTotals();
  }, [state.cart]);
  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        clearCart,
        removeCartItem,
        toggleCartItemAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
