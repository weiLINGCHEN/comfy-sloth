import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { Navigate } from "react-router-dom";

const AuthWrapper = ({ children }) => {
  const { isLoading, error } = useAuth0();
  if (isLoading) {
    return (
      <Wrapper>
        <h4>Loading...</h4>
      </Wrapper>
    );
  }
  if (error) {
    return (
      <Wrapper>
        <h4>There is an error</h4>
        <p>Redirecting in 3 seconds...</p>
        {setTimeout(() => {
          return <Navigate to="/" />;
        }, 3000)}
      </Wrapper>
    );
  }

  return children;
};

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
`;

export default AuthWrapper;
