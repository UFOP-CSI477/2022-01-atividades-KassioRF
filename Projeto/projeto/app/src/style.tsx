import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { UploadImg } from './components/livros/AnunciarLivroWidgets/UploadImage';

export const _Center = styled(Container)`
  text-align: center;
  display: flex;
  flex-direction: column;
  min-height: 70vh;
  justify-content: end;
  align-items: center;
`;

export const ProfileView = styled(Container)`
  text-align: center;
  display: flex;
  flex-direction: column;
  min-height: 30vh;
  justify-content: flex-start;
  
`;

export const ListAnunciosArea = styled(Row)`
  justify-content: ;
`;

export const EmptyContainer = styled(Col)`
  display: flex;
  flex-direction: column;
  min-height: 25vh;
  justify-content: flex-end;
`;