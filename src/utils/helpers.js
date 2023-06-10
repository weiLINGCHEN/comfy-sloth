export const formatPrice = (number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number / 100);
};

export const getUniqueValues = (all_products, title) => {
  let unique = all_products.map((product) => product[title]);
  if (title === "colors") {
    unique = unique.flat();
  }

  return [...new Set(unique)];
};
