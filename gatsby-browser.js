import React from 'react';
import { ProductContextProvider } from './src/context/ProductContext';
import { CartContextProvider } from './src/context/CartContext';
import { GlobalStyle } from './src/components/globalStyles';

export const wrapRootElement = ({ element }) => (
  <ProductContextProvider>
    <CartContextProvider>{element}</CartContextProvider>
  </ProductContextProvider>
);

export const wrapPageElement = ({ element }) => (
  <>
    <GlobalStyle />
    {element}
  </>
);
