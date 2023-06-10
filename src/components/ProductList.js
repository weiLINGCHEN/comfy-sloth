import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const { filtered_products, all_products, grid_view } = useFilterContext();
  if (filtered_products.length === 0) {
    return (
      <h5 style={{ textTransform: "none" }}>
        Sorry, no product matched your search...
      </h5>
    );
  }
  if (grid_view) {
    return <GridView filtered_products={filtered_products} />;
  }

  return <ListView filtered_products={filtered_products} />;
};

export default ProductList;
