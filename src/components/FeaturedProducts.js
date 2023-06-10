import React from "react";
import { useProductsContext } from "../context/products_context";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Error from "./Error";
import Loading from "./Loading";
import Product from "./Product";

const FeaturedProducts = () => {
  const { featured_products, products_loading, products_error } =
    useProductsContext();
  if (products_loading) {
    return <Loading />;
  }
  if (products_error) {
    return <Error />;
  }
  return (
    <Wrapper className="section">
      <div className="section-center">
        <div className="title">
          <h2>Featured Products</h2>
          <div className="underline"></div>
        </div>
        <div className="featured">
          {featured_products.slice(0, 3).map((item) => {
            return <Product {...item} key={item.id} />;
          })}
        </div>
        <Link to="products" className="btn">
          all products
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`;

export default FeaturedProducts;
