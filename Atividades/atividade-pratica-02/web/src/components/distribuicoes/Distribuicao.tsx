import ListDistribuicao from "./ListDistribuicao";
import { useNavigate} from "react-router-dom";
import { _Center } from "../globalStyles";
import { Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Distribuicao = () => {
  const navigate = useNavigate();
  return (
    <_Center>
      <div>
        <h3>Distribuição:</h3>
      </div>
      <div>
        <Link to="/distribuicoes/cadastrar"> Cadastrar </Link>
        <ListDistribuicao />
      </div>
      <Col md={3}>
        <Button variant="secondary" onClick={(_) => navigate('/')}>
          Voltar
        </Button>
      </Col>
    </_Center>
  );
}

export default Distribuicao;