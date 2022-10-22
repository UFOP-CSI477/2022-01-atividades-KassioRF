import ListDoacoes from "./ListDoacoes";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useNavigate} from "react-router-dom";

const Doacoes = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <h3>Doações:</h3>
      <Link to="/doacoes/cadastrar"> Cadastrar </Link>
      <ListDoacoes />
      </div>
      <Button variant="primary" onClick={(_) => navigate('/')}>
        Voltar
      </Button>                
    </>


  );
}

export default Doacoes;