import { Button } from "react-bootstrap";
import ListLocaisColeta from "./ListLocaisColeta";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LocaisColeta = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <h3>Locais de Coleta:</h3>
      </div>
      <Link to="/locais_coleta/cadastrar"> Cadastrar </Link>
      <ListLocaisColeta />
      <Button variant="primary" onClick={(_) => navigate('/')}>
        Voltar
      </Button>                
    </>
  );
}

export default LocaisColeta;