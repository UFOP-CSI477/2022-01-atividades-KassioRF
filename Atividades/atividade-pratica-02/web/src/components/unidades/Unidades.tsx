
import ListUnidades from "./ListUnidades";
import { useNavigate} from "react-router-dom";
import { _Center } from "../globalStyles";
import { Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Unidades = () => {
  const navigate = useNavigate();
  return (
    <_Center>
      <div>
        <h3> Unidades: </h3>
      </div>
      <div>
      <Link to="/unidades/cadastrar"> Cadastrar </Link>
      <ListUnidades />
      </div>
      <Col md={3}>
        <Button variant="secondary" onClick={(_) => navigate('/')}>
          Voltar
        </Button>                      
      </Col>
    </_Center>      
  );
}

export default Unidades;