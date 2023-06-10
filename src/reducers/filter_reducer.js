import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    // let min_price = 1000000;
    // let max_price = 0;
    // action.payload.map((products) => {
    //   if (products.price > max_price) {
    //     max_price = products.price;
    //   }
    //   if (products.price < min_price) {
    //     min_price = products.price;
    //   }
    // });
    let max_price = action.payload.map((p) => p.price);
    max_price = Math.max(...max_price);
    let min_price = action.payload.map((p) => p.price);
    min_price = Math.min(...min_price);

    return {
      ...state,
      //if both products set the same Array,they will point to the same memory
      //that how the array valuable work, so we need to set them differently
      //if we use separate operator, js will copy the array, and the valuable will reference to different memory(array)
      filtered_products: [...action.payload],
      all_products: [...action.payload],
      filters: {
        ...state.filters,
        min_price,
        max_price,
        price: max_price,
      },
    };
  }
  if (action.type === SET_GRIDVIEW) {
    return {
      ...state,
      grid_view: true,
    };
  }
  if (action.type === SET_LISTVIEW) {
    return {
      ...state,
      grid_view: false,
    };
  }
  if (action.type === UPDATE_SORT) {
    return {
      ...state,
      sort: action.payload,
    };
  }
  if (action.type === SORT_PRODUCTS) {
    let sortedProducts = [...state.all_products];
    if (state.sort === "price-lowest") {
      sortedProducts.sort((a, b) => a.price - b.price);
    }
    if (state.sort === "price-highest") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    if (state.sort === "name-a") {
      sortedProducts.sort((a, b) => {
        let nameA = a.name.toUpperCase();
        let nameB = b.name.toUpperCase();
        if (nameA > nameB) {
          return 1;
        }
        if (nameA < nameB) {
          return -1;
        }
        if (nameA === nameB) {
          return 0;
        }
      });
    }
    if (state.sort === "name-z") {
      sortedProducts.sort((a, b) => {
        let nameA = a.name.toUpperCase();
        let nameB = b.name.toUpperCase();
        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }
        if (nameA === nameB) {
          return 0;
        }
      });
    }
    return {
      ...state,

      all_products: sortedProducts,
    };
  }

  if (action.type === UPDATE_FILTERS) {
    return {
      ...state,
      filters: { ...state.filters, [action.name]: action.value },
    };
  }
  if (action.type === FILTER_PRODUCTS) {
    const { filters, all_products } = state;
    const { search, category, company, colors, price, free_shipping } = filters;
    let newFilteredProducts = [...all_products];
    // console.log(all_products);

    if (search) {
      newFilteredProducts = newFilteredProducts.filter(
        (product) =>
          product.name.toUpperCase().indexOf(search.toUpperCase()) === 0
      );
    }

    if (category === "all") {
      newFilteredProducts = [...newFilteredProducts];
    } else {
      newFilteredProducts = [...newFilteredProducts].filter(
        (product) => product.category === category
      );
    }
    // if (category === "office") {
    //   newFilteredProducts = [...newFilteredProducts].filter(
    //     (product) => product.category === "office"
    //   );
    // }
    // if (category === "living room") {
    //   newFilteredProducts = [...newFilteredProducts].filter(
    //     (product) => product.category === "living room"
    //   );
    // }
    // if (category === "kitchen") {
    //   newFilteredProducts = [...newFilteredProducts].filter(
    //     (product) => product.category === "kitchen"
    //   );
    // }
    // if (category === "bedroom") {
    //   newFilteredProducts = [...newFilteredProducts].filter(
    //     (product) => product.category === "bedroom"
    //   );
    // }
    // if (category === "dining") {
    //   newFilteredProducts = [...newFilteredProducts].filter(
    //     (product) => product.category === "dining"
    //   );
    // }
    // if (category === "kids") {
    //   newFilteredProducts = [...newFilteredProducts].filter(
    //     (product) => product.category === "kids"
    //   );
    // }
    if (company !== "all") {
      newFilteredProducts = newFilteredProducts.filter(
        (product) => product.company === company
      );
    }

    // if (company === "liddy") {
    //   newFilteredProducts = [...newFilteredProducts].filter(
    //     (product) => product.company === "liddy"
    //   );
    // }
    // if (company === "marcos") {
    //   newFilteredProducts = [...newFilteredProducts].filter(
    //     (product) => product.company === "marcos"
    //   );
    // }
    // if (company === "caressa") {
    //   newFilteredProducts = [...newFilteredProducts].filter(
    //     (product) => product.company === "caressa"
    //   );
    // }
    // if (company === "ikea") {
    //   newFilteredProducts = [...newFilteredProducts].filter(
    //     (product) => product.company === "ikea"
    //   );
    // }

    if (colors !== "all") {
      newFilteredProducts = newFilteredProducts.filter((item) =>
        item.colors.includes(colors)
      );
    }

    if (price) {
      newFilteredProducts = newFilteredProducts.filter(
        (item) => item.price <= Number(price)
      );
    }

    if (free_shipping) {
      newFilteredProducts = newFilteredProducts.filter(
        (item) => "shipping" in item
      );
    }

    return { ...state, filtered_products: newFilteredProducts };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        search: "",
        category: "all",
        company: "all",
        colors: "all",
        price: state.filters.max_price,
        free_shipping: false,
      },
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
