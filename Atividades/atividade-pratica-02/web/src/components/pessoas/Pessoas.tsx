import ListPessoas from "./ListPessoas";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Pessoas = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <h3>Pessoas:</h3>
      </div>
      <Link to="/pessoas/cadastrar"> Cadastrar</Link>
      {<ListPessoas />}
      <Button variant="primary" onClick={(_) => navigate('/')}>
        Voltar
      </Button>          
    </>
  );
}

export default Pessoas;