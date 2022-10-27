import { useEffect, useState } from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import { useNavigate , useParams} from "react-router-dom";
import { getUser } from '../../services/userAuth';
import { _Center, ProfileView } from "../../style";
import EditarPerfilForm from "./EditarPerfilForm";
import MeusAnuncios from "./MeusAnuncios";

export enum tabOption {
  ANUNCIOS = 'anuncios',
  EDITARPERFIL = 'editar_perfil',
}

type propsPerfil = {
  activeMenu: string;
};

const Perfil = () => {
  const navigate = useNavigate();

  // exibe o menu de acordo com a rota para o perfil/:activeMenu
  const { activeMenu } = useParams(); 

  return (
    <Container className="App">
      <Row className="justify-center">          
        <Col md={6} className="spaceElements">
          <ListGroup defaultActiveKey={`#${activeMenu}`} horizontal>
          
            <ListGroup.Item 
              className="bolder-text" 
              action onClick={() => navigate(`/perfil/${tabOption.EDITARPERFIL}`)} id={`#${activeMenu}`}>
              Meus dados
            </ListGroup.Item>
            <ListGroup.Item                 
              className="bolder-text" 
              action onClick={() => navigate(`/perfil/${tabOption.ANUNCIOS}`)} id={`#${activeMenu}`} >
              Meus Anúncios
            </ListGroup.Item>
          
          </ListGroup>
  
        </Col>
      </Row>

      <ProfileView className="">
      {/* <ProfileView className="update-user-form"> */}
        <Row className=" justify-center">
          <Col md={6} >
            {
              activeMenu == tabOption.ANUNCIOS ?
                <MeusAnuncios />                
              : <EditarPerfilForm />
            }  
          </Col>        
        </Row>          
      {/* </ProfileView>             */}

      </ProfileView>
    </Container>
  );
}

export default Perfil;