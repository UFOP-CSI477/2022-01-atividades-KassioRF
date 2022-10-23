import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Card } from 'react-bootstrap';
import { _Center, _Link } from './components/globalStyles';

// Home Page
function App() {
  return (
    <_Center>
      <Card body>
        <h4> Atividade 2 </h4>
        <_Link to="/doacoes"> <Button variant="secondary"> Doações </Button> </_Link>
        <_Link to="/locais_coleta"> <Button variant="secondary"> Locais Coleta </Button> </_Link>
        <_Link to="/pessoas"> <Button variant="secondary"> Pessoas </Button> </_Link>
      </Card>
    
      {/* PROVA */}
      <Card body>
        <h4> Prova </h4>      
        <_Link to="/produtos"> <Button variant="secondary"> Produtos </Button> </_Link>
        <_Link to="/unidades"> <Button variant="secondary"> Unidades </Button> </_Link>
        <_Link to="/distribuicoes"> <Button variant="secondary"> Distribuições </Button> </_Link>
      </Card>    
    </_Center>
  );
}

export default App;
