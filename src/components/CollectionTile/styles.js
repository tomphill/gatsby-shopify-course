import styled from 'styled-components';
import { StyledLink } from '../StyledLink';

export const CollectionTileWrapper = styled.div`
  height: 300px;
  max-height: 100vh;
  display: flex;
  position: relative;
  margin-bottom: 5px;
  > div {
    flex-grow: 1;
  }
`;

export const CollectionTileContent = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  color: white;
  text-decoration: none;
  background: rgba(0, 0, 0, 0.5);
  text-align: center;
  > div {
    padding: 20px;

    ${StyledLink} {
      padding: 10px;
      background: white;
      border: 1px solid black;
      font-weight: bold;
      font-size: 16px;
      text-transform: uppercase;
      display: inline-block;
      color: black;
      text-decoration: none;
      cursor: pointer;

      &:hover {
        color: white;
        background: black;
      }
    }
  }
`;

export const Title = styled.div`
  padding: 5px 10px;
  margin-bottom: 5px;
  display: inline-block;
  text-transform: uppercase;
  font-size: 40px;
  font-weight: bold;
  border-radius: 10px;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.75);
  background: ${props => (props.sale ? 'red' : 'none')};
`;

export const Description = styled.div`
  font-size: 20px;
  margin: 10px;
  border-radius: 10px;
  background: ${props => (props.sale ? 'red' : 'none')};
  padding: 10px;
`;
