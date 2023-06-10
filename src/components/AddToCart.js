import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { useCartContext } from "../context/cart_context";
import AmountButtons from "./AmountButtons";
import { toast } from "react-toastify";

const AddToCart = ({ product }) => {
  const { addToCart } = useCartContext();
  const { id, stock, colors, images, name, price, amount } = product;
  const [cartValue, setCartValue] = useState({ id, color: null, amount: 1 });

  return (
    <Wrapper>
      <div className="colors">
        <span>
          <h5>Color :</h5>
        </span>
        <div>
          {colors.map((item) => {
            return (
              <button
                key={item}
                className={
                  cartValue.color === item ? "color-btn active" : "color-btn"
                }
                style={{ backgroundColor: item }}
                onClick={() => setCartValue({ ...cartValue, color: item })}
              >
                {cartValue.color === item && <FaCheck />}
              </button>
            );
          })}
          {cartValue.color ? (
            ""
          ) : (
            <p style={{ color: "grey" }}>please select the color</p>
          )}
        </div>
      </div>
      <div className="btn-container">
        <AmountButtons
          stock={stock}
          cartValue={cartValue}
          setCartValue={setCartValue}
        />
        {/* need a function to add locale state value to cart */}

        {cartValue.color ? (
          <Link
            to="/cart"
            className="btn"
            onClick={() =>
              addToCart(
                name,
                cartValue.id,
                cartValue.color,
                cartValue.amount,
                images[0].url,
                stock,
                price,
                amount
              )
            }
          >
            Add to cart
          </Link>
        ) : (
          <button
            type="button"
            className="btn"
            onClick={() =>
              toast.info("please select color", {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              })
            }
          >
            add to cart
          </button>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 0.5;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`;
export default AddToCart;
