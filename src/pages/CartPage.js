import React from "react";
import styled from "styled-components";
import { useCartContext } from "../context/cart_context";
import { Link } from "react-router-dom";
import { CartContent, PageHero } from "../components";

const CartPage = () => {
  const { cart } = useCartContext();

  return (
    <Wrapper>
      <PageHero title="cart" />
      {cart.length === 0 ? (
        <div className="page section section-center empty">
          <h2>Your cart is empty</h2>
          <Link to="/products" className="btn">
            shop now
          </Link>
        </div>
      ) : (
        <CartContent />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`;

export default CartPage;
