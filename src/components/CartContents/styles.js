import styled from 'styled-components';

export const CartFooter = styled.div`
  display: grid;
  grid-template-columns: 5fr 1fr 40px;
  > div {
    padding: 8px;

    &:first-child {
      text-align: right;
    }
  }
`;

export const CartHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 2fr 1fr 40px;
  border-bottom: 1px solid black;
  font-weight: bold;
  > div {
    padding: 8px;
  }
`;

export const CartItem = styled.div`
  border-bottom: 1px solid black;
  display: grid;
  grid-template-columns: 2fr 1fr 2fr 1fr 40px;
  > div {
    padding: 8px;

    &:first-child {
      > div:first-child {
        font-weight: bold;
      }
      > div:last-child {
        color: #999;
        margin-top: 4px;
        font-size: 14px;
      }
    }
  }
`;

export const Footer = styled.footer`
  display: grid;
  grid-template-columns: 1fr 1fr;

  > div:last-child {
    text-align: right;
  }
`;
