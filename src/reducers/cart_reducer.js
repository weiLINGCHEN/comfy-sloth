import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  const { cart, amount } = state;
  if (action.type === ADD_TO_CART) {
    const { name, id, amount, color, image, stock, price } = action.payload;
    const existItem = cart.find((item) => item.id === id + color);
    if (existItem) {
      let tempAmount = existItem.amount + amount;
      if (tempAmount > stock) {
        tempAmount = stock;
      }
      const newCart = cart.map((p) => {
        if (p.id === id + color) {
          return { ...p, amount: tempAmount };
        } else {
          return { ...p };
        }
      });
      return { ...state, cart: newCart };
    } else {
      return {
        ...state,
        cart: [
          ...state.cart,
          { name, id: id + color, amount, image, color, stock, price },
        ],
      };
    }
  }

  if (action.type === CLEAR_CART) {
    return {
      cart: [],
      amount: 0,
      subtotal: 0,
      shipping: 534,
    };
  }

  if (action.type === COUNT_CART_TOTALS) {
    let amount = 0;
    let subtotal = 0;
    state.cart.map((item) => {
      amount += item.amount;
      subtotal += item.amount * item.price;
    });

    return {
      ...state,
      amount,
      subtotal,
    };
  }

  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    let newCart = state.cart.map((p) => {
      if (p.id === action.payload.id) {
        return { ...p, amount: action.payload.itemAmount };
      } else {
        return p;
      }
    });
    return { ...state, cart: newCart };
  }

  if (action.type === REMOVE_CART_ITEM) {
    let newCart = state.cart.filter((item) => item.id !== action.payload);

    return { ...state, cart: newCart };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
