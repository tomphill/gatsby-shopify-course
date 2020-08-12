import React from 'react';
import { LayoutWrapper } from './styles';
import { Header } from '../Header';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <LayoutWrapper>
        <main>{children}</main>
      </LayoutWrapper>
    </>
  );
};

export { Layout };
