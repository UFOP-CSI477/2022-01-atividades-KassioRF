import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button, Card, Container } from 'react-bootstrap';


export const _Center = styled(Container)`
  text-align: center;
  display: flex;
  flex-direction: column;
  min-height: 70vh;
  justify-content: space-evenly;
  align-items: center;
`;

export const _CenterAreaForm = styled(_Center)`
align-items: unset;

`;

export const _Link = styled(Link)`
  text-decoration: none

`;
