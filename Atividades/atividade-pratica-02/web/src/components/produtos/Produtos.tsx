
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useNavigate} from "react-router-dom";
import ListProdutos from "./ListProdutos";

const Produtos = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <h3>Produtos </h3>
      <Link to="/produtos/cadastrar"> Cadastrar </Link>
      <ListProdutos />
      </div>
      <Button variant="primary" onClick={(_) => navigate('/')}>
        Voltar
      </Button>                
    </>


  );
}

export default Produtos;