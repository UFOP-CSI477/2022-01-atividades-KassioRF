import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <Navbar style={{minHeight: '10vh'}} bg="dark" variant="dark">
      <Container>
      <Link to="/" style={{textDecoration: "none"}} > <Navbar.Brand > Atv02: Sistema de doação de sangue </Navbar.Brand> </Link>  
        <Navbar.Toggle />
      </Container>
    </Navbar>
  );

}

export default Header