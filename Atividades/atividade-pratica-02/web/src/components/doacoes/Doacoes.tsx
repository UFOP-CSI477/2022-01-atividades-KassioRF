import ListDoacoes from "./ListDoacoes";
import { useNavigate} from "react-router-dom";
import { _Center } from "../globalStyles";
import { Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Doacoes = () => {
  const navigate = useNavigate();
  return (
    <_Center>
      <div>
        <h3>Doações:</h3>
      </div>
      <div>
        <Link to="/doacoes/cadastrar"> Cadastrar </Link>
        <ListDoacoes />
      </div>
      <Col md={3}>
        <Button variant="secondary" onClick={(_) => navigate('/')}>
          Voltar
        </Button>                      
      </Col>
    </_Center>
  );
}

export default Doacoes;