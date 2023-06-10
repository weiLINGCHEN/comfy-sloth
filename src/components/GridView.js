import React from "react";
import styled from "styled-components";
import Product from "./Product";

const GridView = ({ filtered_products }) => {
  if (filtered_products.length === 0) {
    return <h5>Sorry, no products matched your search.</h5>;
  }

  return (
    <Wrapper>
      <div className="products-container">
        {filtered_products.map((item) => {
          return <Product {...item} key={item.id} />;
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  img {
    height: 175px;
  }

  .products-container {
    display: grid;
    gap: 2rem 1.5rem;
  }

  @media (min-width: 992px) {
    .products-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 1170px) {
    .products-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

export default GridView;
