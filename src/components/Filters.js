import React from "react";
import styled from "styled-components";
import { useFilterContext } from "../context/filter_context";
import { getUniqueValues, formatPrice } from "../utils/helpers";
import { FaCheck } from "react-icons/fa";
import { UPDATE_FILTERS } from "../actions";

const Filters = () => {
  const {
    filters: {
      search,
      category,
      company,
      colors,
      price,
      free_shipping,
      min_price,
      max_price,
    },
    updateFilters,
    all_products,
    clearFilters,
  } = useFilterContext();

  const uni_type_companies = getUniqueValues(all_products, "company");
  const uni_type_colors = getUniqueValues(all_products, "colors");
  const uni_type_categories = getUniqueValues(all_products, "category");

  // const newArray = [...all_products];
  // // console.log(newArray);
  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={(e) => e.preventDefault()}>
          {/* search input */}
          <div className="form-control">
            <input
              type="text"
              className="search-input"
              name="search"
              value={search}
              onChange={(e) => updateFilters(e)}
              placeholder="search"
            />
          </div>

          {/* category */}
          <div className="form-control">
            <h5>Category</h5>
            <button
              className={category === "all" ? "active" : ""}
              type="button"
              name="category"
              value="all"
              onClick={(e) => updateFilters(e)}
            >
              All
            </button>

            {uni_type_categories.sort().map((item) => {
              return (
                <button
                  key={item}
                  className={category === item ? "active" : ""}
                  type="button"
                  name="category"
                  value={item}
                  onClick={(e) => updateFilters(e)}
                >
                  {item}
                </button>
              );
            })}

            {/* use Array from */}
            {/* {[
            ...new Set(
              Array.from([...newArray], (product) => product.category)
            ),
          ]
            .sort()
            .map((item) => {
              return (
                <button
                  key={item}
                  className={category === item ? "active" : ""}
                  type="button"
                  name="category"
                  value={item}
                  onClick={(e) => updateFilters(e)}
                >
                  {item}
                </button>
              );
            })} */}

            {/* hard code */}

            {/* <button
            className={category === "living room" ? "active" : ""}
            type="button"
            name="category"
            value="living room"
            onClick={(e) => updateFilters(e)}
          >
            Living Room
          </button>
          <button
            className={category === "kitchen" ? "active" : ""}
            type="button"
            name="category"
            value="kitchen"
            onClick={(e) => updateFilters(e)}
          >
            Kitchen
          </button>
          <button
            className={category === "bedroom" ? "active" : ""}
            type="button"
            name="category"
            value="bedroom"
            onClick={(e) => updateFilters(e)}
          >
            Bedroom
          </button>
          <button
            className={category === "dining" ? "active" : ""}
            type="button"
            name="category"
            value="dining"
            onClick={(e) => updateFilters(e)}
          >
            Dining
          </button>
          <button
            className={category === "kids" ? "active" : ""}
            type="button"
            name="category"
            value="kids"
            onClick={(e) => updateFilters(e)}
          >
            Kids
          </button> */}
          </div>
          {/* category end */}
          {/* company */}
          <div className="form-control ">
            <h5>company</h5>
            <select
              value={company}
              name="company"
              id="company"
              className="company"
              onChange={(e) => updateFilters(e)}
            >
              <option value="all">All</option>
              {/* {[
              ...new Set(
                Array.from([...newArray], (product) => product.company)
              ),
            ]
              .sort()
              .map((company) => {
                return (
                  <option key={company} value={company}>
                    {company}
                  </option>
                );
              })} */}
              {uni_type_companies.sort().map((company) => {
                return (
                  <option key={company} value={company}>
                    {company}
                  </option>
                );
              })}
            </select>
          </div>
          {/* company end */}
          {/* color */}
          <div className="form-control">
            <h5>Colors</h5>
            <div className="colors">
              <button
                className={colors === "all" ? "active all-btn " : "all-btn"}
                type="button"
                name="colors"
                value="all"
                onClick={(e) => updateFilters(e)}
              >
                All
              </button>
              {/* {[
              ...new Set(
                Array.from([...newArray], (products) => products.colors).flat()
              ),
            ].map((item) => {
              return (
                <button
                  type="button"
                  key={item}
                  className={colors === item ? "active color-btn" : "color-btn"}
                  style={{ backgroundColor: item }}
                  name="colors"
                  value={item}
                  onClick={(e) => updateFilters(e)}
                >
                  {colors === item ? <FaCheck /> : ""}
                </button> */}
              {uni_type_colors.map((item) => {
                return (
                  <button
                    type="button"
                    key={item}
                    className={
                      colors === item ? "active color-btn" : "color-btn"
                    }
                    style={{ backgroundColor: item }}
                    name="colors"
                    value={item}
                    onClick={(e) => updateFilters(e)}
                  >
                    {colors === item ? <FaCheck /> : null}
                  </button>
                );
              })}
            </div>
          </div>
          {/* color end */}
          {/* price */}
          <div className="form-control">
            <h5>price</h5>
            <p className="price">{formatPrice(price)}</p>
            <input
              type="range"
              name="price"
              min={min_price}
              max={max_price}
              value={price}
              onChange={(e) => updateFilters(e)}
            />
          </div>
          {/* price end*/}
          {/* shipping*/}
          <div className="form-control shipping">
            <label htmlFor="free_shipping">Free Shipping</label>
            <input
              type="checkbox"
              name="free_shipping"
              id="free_shipping"
              value="change"
              checked={free_shipping}
              onChange={(e) => updateFilters(e)}
            />
          </div>
          {/* shipping end*/}
          {/* clear button */}
        </form>
        <button type="button" className="clear-btn" onClick={clearFilters}>
          clear button
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
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
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
