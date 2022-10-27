import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from "firebase/auth";
import ListarAnuncios from './components/livros/ListarAnuncios';

const App = () => {
  const [user, loading, error] = useAuthState(getAuth());
  
  
  return (
    <div className="App container">
      <h2 className="main-title" style={{textAlign: "center"}}> Anúncios </h2>
      {/* { user ? <p>Logado</p> : <p>Deslogado</p> } */}

      <ListarAnuncios />

    </div>
  );
}

export default App;
