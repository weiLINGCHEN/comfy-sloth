import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  HomePage,
  AboutPage,
  CartPage,
  ErrorPage,
  SharePage,
  ProductsPage,
  CheckoutPage,
  SingleProductPage,
  PrivateRoute,
  AuthWrapper,
} from "./pages";

function App() {
  return (
    <AuthWrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharePage />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="products/:id" element={<SingleProductPage />} />

            <Route
              path="checkout"
              element={
                <PrivateRoute>
                  <CheckoutPage />
                </PrivateRoute>
              }
            />

            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthWrapper>
  );
}

export default App;
