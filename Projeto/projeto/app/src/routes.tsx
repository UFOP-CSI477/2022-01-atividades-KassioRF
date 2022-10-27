import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import NavBarApp from "./components/navbar/NavBarApp";
import { firebaseApp } from "./services/firebase";
import AnunciarLivro from "./components/livros/AnunciarLivro";
import Perfil, { tabOption } from "./components/perfil/Perfil";
import DetalhesLivro from "./components/livros/DetalhesLivro";
import EditarAnuncio from "./components/livros/EditarAnuncio";


const  AppRoutes = () => {
  firebaseApp();
  
  return (
    <BrowserRouter>
    
    <NavBarApp />
    
    <Routes>

        <Route path="/" element={ <App /> } />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        <Route path="/anunciar_livro" element={<AnunciarLivro />} />
        <Route path="/perfil/:activeMenu" element={<Perfil /> } />
        <Route path="/anuncio/:uid" element={<DetalhesLivro />} />
        <Route path="/anuncio/editar/:uid" element={<EditarAnuncio />} />
        
    </Routes>
    </BrowserRouter>
    
  );

}

export default  AppRoutes;