import React from 'react';
import { GlobalStyle } from './src/components/globalStyles';

export const wrapRootElement = ({ element }) => (
  <>
    <GlobalStyle />
    {element}
  </>
);
