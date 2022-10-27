import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from "react-router-dom";
import styled from 'styled-components';

import { useNavigate} from "react-router-dom";

import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { tabOption } from '../perfil/Perfil';


import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import AutoStoriesIcon from '@mui/icons-material/AutoStories';

const _DropDown = styled(NavDropdown)`
.dropdown-menu[data-bs-popper] {
  left: unset;
  right: 0;
}
`;

const NavBarApp = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(getAuth()); // verifica se o usuário está autenticado
  
  const handleLogOut = ( ) => {
    console.log('logout');
    const auth = getAuth();
    signOut(auth).then(() => {
      navigate('/');
      window.location.reload();
    }).catch((error) => {
      console.log({
        errorCode: error.code,
        errorMsg: error.message
      });
      alert('Ops.. ocorrou um erro. Tente novamente');
    })
  }

  return (
    <Navbar className="nav-box-shadow" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={ Link } to="/"> <AutoStoriesIcon fontSize='large'/> </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            
          </Nav>
      
          <Nav>
            <Nav.Link as={ Link } to='/anunciar_livro'>Anunciar Livro</Nav.Link>
            { user ?
              <_DropDown title={<AccountCircleIcon />} id="collasible-nav-dropdown">                                
                <NavDropdown.Item as={ Link } to={`/perfil/${tabOption.EDITARPERFIL}`}> Perfil </NavDropdown.Item>
                <NavDropdown.Item as={ Link } to={`/perfil/${tabOption.ANUNCIOS}`}> Meus Anúncios </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => handleLogOut()}> Logout </NavDropdown.Item>            
              </_DropDown>          
            : 
              <_DropDown title="Entrar" id="collasible-nav-dropdown">

                <NavDropdown.Item as={ Link } to="/login"> Login </NavDropdown.Item>
                <NavDropdown.Item as={ Link } to="/cadastro"> Cadastre-se </NavDropdown.Item>
                
              </_DropDown>
            }  

          </Nav>
      
        </Navbar.Collapse>
      
      </Container>
    </Navbar>
  );
}

export default NavBarApp;



