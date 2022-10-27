import { useEffect } from "react";
import { Row, Container } from "react-bootstrap";
import { useNavigate} from "react-router-dom";
import { getUser } from '../../services/userAuth';
import { _Center } from "../../style";
import CadastrarLivro from "./AnunciarLivroWidgets/CadastrarLivro";

const AnunciarLivro = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if(!getUser()) {
      navigate('/login');
    }
  },[])
  
  
  return (
    <>    
      <Container className="App">
        <h5>Anunciar livro</h5>
        <CadastrarLivro />
      </Container>
    </>
  );
}

export default AnunciarLivro;