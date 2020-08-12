import React from 'react';
import { Layout, CartContents, SEO } from 'components';

export default function CartPage() {
  return (
    <Layout>
      <SEO description="The MadHatter cart" title="Cart" />
      <CartContents />
    </Layout>
  );
}
