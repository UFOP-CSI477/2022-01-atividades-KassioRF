import ListPessoas from "./ListPessoas";
import { useNavigate } from "react-router-dom";
import { _Center } from "../globalStyles";
import { Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Pessoas = () => {
  const navigate = useNavigate();
  return (
    <_Center>
      <div>
      <h3>Pessoas:</h3>
      </div>
      <div>
      <Link to="/pessoas/cadastrar"> Cadastrar</Link>
      <ListPessoas />
      </div>
      <Col md={3}>
        <Button variant="secondary" onClick={(_) => navigate('/')}>
          Voltar
        </Button>                      
      </Col>
    </_Center>

    // <>
    //   <div>
    //     <h3>Pessoas:</h3>
    //   </div>
    //   <Link to="/pessoas/cadastrar"> Cadastrar</Link>
    //   {<ListPessoas />}
    //   <Button variant="primary" onClick={(_) => navigate('/')}>
    //     Voltar
    //   </Button>          
    // </>
  );
}

export default Pessoas;