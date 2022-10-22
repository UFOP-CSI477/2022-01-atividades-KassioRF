import {BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import Header from "./components/Header";
import Doacoes from "./components/doacoes/Doacoes";
import LocaisColeta from "./components/locais_coleta/LocaisColeta";
import Pessoas from "./components/pessoas/Pessoas";
import CreatePessoa from "./components/pessoas/CreatePessoa";
import ShowPessoa from "./components/pessoas/ShowPessoa";
import ShowLocalColeta from "./components/locais_coleta/ShowLocalColeta";
import CreateLocalColeta from "./components/locais_coleta/CreateLocalColeta";


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={ <App /> } />
        <Route path="/doacoes" element={ <Doacoes /> } />
        <Route path="/locais_coleta" element={ <LocaisColeta /> } />
        <Route path="/locais_coleta/cadastrar" element={ <CreateLocalColeta /> } />
        <Route path="/locais_coleta/:id" element={ <ShowLocalColeta /> } />
        <Route path="/pessoas" element={ <Pessoas /> } />
        <Route path="/pessoas/cadastrar" element= {<CreatePessoa />} />
        <Route path="/pessoas/:id" element={<ShowPessoa />} />             
      </Routes>      
    </BrowserRouter>
  );
}

export default AppRoutes;