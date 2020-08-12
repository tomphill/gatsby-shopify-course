import React from 'react';
import { ProductTileWrapper, Title, Description, Price } from './styles';
import Img from 'gatsby-image';
import { StyledLink } from '../StyledLink';

export function ProductTile({
  title,
  imageFluid,
  description,
  minPrice,
  handle,
}) {
  return (
    <ProductTileWrapper>
      <Img fluid={imageFluid} />
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Price>from £{parseFloat(minPrice).toFixed(2)}</Price>
      <StyledLink to={`/products/${handle}`}>View product</StyledLink>
    </ProductTileWrapper>
  );
}
