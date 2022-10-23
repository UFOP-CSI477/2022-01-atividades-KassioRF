import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const _Center = styled.div`
  text-align: center;

`;

// Home Page
function App() {
  return (
    <_Center>
      <h2> Operações - Atividade 2 </h2>
      <ul>
        <li><Link to="/doacoes"> Doações </Link></li>
        <li><Link to="/locais_coleta"> Locais Coleta </Link></li>
        <li><Link to="/pessoas"> Pessoas </Link></li>

        {/* PROVA */}
        <li><Link to="/produtos"> Produtos </Link></li>
        <li><Link to="/unidades"> Unidades </Link></li>
        <li><Link to="/distribuicoes"> Distribuicoes </Link></li>
      </ul>
    </_Center>
  );
}

export default App;
