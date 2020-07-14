import React from 'react';
import { LayoutWrapper } from './styles';

const Layout = ({ children }) => {
  return (
    <>
      <LayoutWrapper>
        <main>{children}</main>
      </LayoutWrapper>
    </>
  );
};

export { Layout };
