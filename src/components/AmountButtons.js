import React from "react";
import styled from "styled-components";
import { FaPlus, FaMinus } from "react-icons/fa";

const AmountButtons = ({ cartValue, setCartValue, stock }) => {
  const addAmount = () => {
    if (cartValue.amount < stock) {
      setCartValue({ ...cartValue, amount: cartValue.amount + 1 });
    }
  };
  const minusAmount = () => {
    if (cartValue.amount > 1) {
      setCartValue({ ...cartValue, amount: cartValue.amount - 1 });
    }
  };
  return (
    <Wrapper>
      <button type="button" onClick={minusAmount}>
        <FaMinus />
      </button>
      <h2>{cartValue.amount}</h2>
      <button type="button" onClick={addAmount}>
        <FaPlus />
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  width: 140px;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  h2 {
    margin-bottom: 0;
  }
  button {
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    padding: 1rem 0;
    width: 2rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h2 {
    margin-bottom: 0;
  }
`;

export default AmountButtons;
