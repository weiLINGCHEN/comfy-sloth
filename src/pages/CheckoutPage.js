import React from "react";
import styled from "styled-components";
import { PageHero, StripeCheckout } from "../components";
// extra imports
import { useCartContext } from "../context/cart_context";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  const { cart } = useCartContext();
  return (
    <main>
      <PageHero title="Checkout" />
      {cart.length < 1 ? (
        <Wrapper className="section page">
          <div className="empty">
            <h3>Your cart is empty...</h3>
            <Link to="/products" className="btn">
              go shopping
            </Link>
          </div>
        </Wrapper>
      ) : (
        <Wrapper>
          <StripeCheckout />
        </Wrapper>
      )}
    </main>
  );
};
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  .empty {
    text-align: center;
  }
`;
export default CheckoutPage;
