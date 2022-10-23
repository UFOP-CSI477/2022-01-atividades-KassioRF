import ListLocaisColeta from "./ListLocaisColeta";
import { useNavigate } from "react-router-dom";
import { _Center } from "../globalStyles";
import { Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const LocaisColeta = () => {
  const navigate = useNavigate();
  return (
    <_Center>
      <div>
        <h3>Locais de Coleta:</h3>
      </div>
      <div>
        <Link to="/locais_coleta/cadastrar"> Cadastrar </Link>
        <ListLocaisColeta />
      </div>
      <Col md={3}>
        <Button variant="secondary" onClick={(_) => navigate('/')}>
          Voltar
        </Button>                      
      </Col>
    </_Center>    
    
    // <>
    //   <div>
    //     <h3>Locais de Coleta:</h3>
    //   </div>
    //   <Link to="/locais_coleta/cadastrar"> Cadastrar </Link>
    //   <ListLocaisColeta />
    //   <Button variant="primary" onClick={(_) => navigate('/')}>
    //     Voltar
    //   </Button>                
    // </>
  );
}

export default LocaisColeta;