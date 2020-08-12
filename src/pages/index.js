import React from 'react';
import {
  Layout,
  SEO,
  HomepageCollectionsGrid,
  FeaturedProducts,
} from 'components';
import ProductContext from 'context/ProductContext';

const IndexPage = () => {
  const { collections } = React.useContext(ProductContext);

  return (
    <Layout>
      <SEO description="The MadHatter store homepage" title="Homepage" />
      <HomepageCollectionsGrid
        collections={
          collections.filter(
            collection => collection.title !== 'Featured Hats'
          ) || []
        }
      />
      {!!collections.find(
        collection => collection.title === 'Featured Hats'
      ) && <FeaturedProducts />}
    </Layout>
  );
};

export default IndexPage;
