
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useNavigate} from "react-router-dom";
import ListUnidades from "./ListUnidades";
// import ListProdutos from "./ListProdutos";

const Unidades = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <h3>Produtos </h3>
      <Link to="/unidades/cadastrar"> Cadastrar </Link>
      <ListUnidades />
      </div>
      <Button variant="primary" onClick={(_) => navigate('/')}>
        Voltar
      </Button>                
    </>


  );
}

export default Unidades;