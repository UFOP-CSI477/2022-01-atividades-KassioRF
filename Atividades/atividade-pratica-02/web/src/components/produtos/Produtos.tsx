
import ListProdutos from "./ListProdutos";
import { useNavigate} from "react-router-dom";
import { _Center } from "../globalStyles";
import { Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Produtos = () => {
  const navigate = useNavigate();
  return (
    <_Center>
      <div>
        <h3>Produtos </h3>
      </div>
      <div>
        <Link to="/produtos/cadastrar"> Cadastrar </Link>
        <ListProdutos />
      </div>
      <Col md={3}>
        <Button variant="secondary" onClick={(_) => navigate('/')}>
          Voltar
        </Button>                      
      </Col>
    </_Center>    

  );
}

export default Produtos;