import ListDistribuicao from "./ListDistribuicao";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useNavigate} from "react-router-dom";

const Distribuicao = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <h3>Distribuicao:</h3>
      <Link to="/distribuicoes/cadastrar"> Cadastrar </Link>
      <ListDistribuicao />
      </div>
      <Button variant="primary" onClick={(_) => navigate('/')}>
        Voltar
      </Button>                
    </>


  );
}

export default Distribuicao;