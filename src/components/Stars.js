import React from "react";
import styled from "styled-components";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
const Stars = ({ reviews, stars }) => {
  // stars count method 1
  const tempStar = Array.from({ length: 5 }, (_, index) => {
    const tempNum = index + 0.5;
    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <span>
            <BsStarFill />
          </span>
        ) : stars >= tempNum ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
    );
  });

  return (
    <Wrapper>
      <div className="stars">
        {tempStar}
        {/* // stars count method 2 */}
        {/* {Array.from({ length: Math.floor(stars) }, (_, i) => i).map((i) => {
          return (
            <span key={i}>
              <BsStarFill />
            </span>
          );
        })}
        <span>{stars % 1 >= 0.5 ? <BsStarHalf /> : <BsStar />}</span>
        {Array.from({ length: 5 - Math.ceil(stars) }, (_, i) => i).map((i) => {
          return (
            <span key={i}>
              <BsStar />
            </span>
          );
        })} */}
      </div>
      <p className="reviews">({reviews} customer reviews)</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`;
export default Stars;
