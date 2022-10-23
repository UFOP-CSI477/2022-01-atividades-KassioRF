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
import ShowDoacao from "./components/doacoes/ShowDoacao";
import CreateDoacao from "./components/doacoes/CreateDoacao";
import EditPessoa from "./components/pessoas/EditPessoa";
import EditLocalColeta from "./components/locais_coleta/EditLocalColeta";
import Produtos from "./components/produtos/Produtos";
import ShowProduto from "./components/produtos/ShowProduto";
import Unidades from "./components/unidades/Unidades";
import ShowUnidade from "./components/unidades/ShowUnidade";
import Distribuicao from "./components/distribuicoes/Distribuicao";
import ShowDistribuicao from "./components/distribuicoes/ShowDistribuicao";
import CreateProduto from "./components/produtos/CreateProduto";
import CreateUnidade from "./components/unidades/CreateUnidade";
import CreateDistribuicao from "./components/distribuicoes/CreateDistribuicao";


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={ <App /> } />
        <Route path="/doacoes" element={ <Doacoes /> } />
        <Route path="/doacoes/:id" element={ <ShowDoacao /> } />
        <Route path="/doacoes/cadastrar" element={ <CreateDoacao /> } />
        
        <Route path="/locais_coleta" element={ <LocaisColeta /> } />
        <Route path="/locais_coleta/cadastrar" element={ <CreateLocalColeta /> } />
        <Route path="/locais_coleta/:id" element={ <ShowLocalColeta /> } />
        <Route path="/locais_coleta/atualizar/:id" element={ <EditLocalColeta /> } />
        

        <Route path="/pessoas" element={ <Pessoas /> } />
        <Route path="/pessoas/cadastrar" element= {<CreatePessoa />} />
        <Route path="/pessoas/:id" element={<ShowPessoa />} />       
        <Route path="/pessoas/atualizar/:id" element={<EditPessoa />} />

        {/* PROVA */}
        <Route path="/produtos" element={ <Produtos /> } />
        <Route path="/produtos/cadastrar" element= {<CreateProduto />} />
        <Route path="/produtos/:id" element={<ShowProduto />} />

        <Route path="/unidades" element={ <Unidades /> } />
        <Route path="/unidades/cadastrar" element= {<CreateUnidade />} />
        <Route path="/unidades/:id" element={ <ShowUnidade /> } />

        <Route path="/distribuicoes" element={ <Distribuicao /> } />
        <Route path="/distribuicoes/cadastrar" element= {<CreateDistribuicao />} />
        <Route path="/distribuicoes/:id" element={ <ShowDistribuicao /> } />

      </Routes>      
    </BrowserRouter>
  );
}

export default AppRoutes;