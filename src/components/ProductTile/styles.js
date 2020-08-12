import styled from 'styled-components';
import { StyledLink } from '../StyledLink';

export const ProductTileWrapper = styled.div`
  border: 1px solid #ddd;
  display: flex;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  overflow: hidden;
  flex-direction: column;

  > ${StyledLink} {
    border: 1px solid black;
    text-decoration: none;
    display: block;
    padding: 10px;
    text-align: center;
    font-weight: bold;
    color: black;
  }
`;

export const Title = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin: 20px;
`;

export const Description = styled.div`
  color: #999;
  text-align: left;
  padding: 0 20px 10px 20px;
`;

export const Price = styled.div`
  font-style: italic;
  padding: 20px;
  font-weight: bold;
  margin-top: auto;
`;
