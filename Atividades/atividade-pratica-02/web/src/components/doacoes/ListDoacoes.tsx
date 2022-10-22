import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DoacaoModel } from '../../hooks/DoacaoModel';
import api from '../../services/api';
import _Spinner from '../utils/spinner';

const ListDoacoes = () => {
  const [ doacoes, setDoacoes ] = useState<DoacaoModel[]>([]); // Dados API
  const [loading, setLoading ] = useState(false); // Controla a exibição do Spinnner
  const [_error, setError] = useState({'error': false, 'msg': ''}); // Em caso de erro armazena a msg de erro a ser exibida

  useEffect(() => {
    setLoading(true); // mostrar spinner
    loadData();

  }, []);

  const loadData = () =>  {
    api.get('/doacao')
     .then(response => {
      // console.log(response.data);
      setDoacoes(response.data);
     })
     .catch(error => {
      var err = {'error': true, 'msg': 'Sem conexão com o servidor :('};
      setError(err);
      console.log(_error);
     }).finally( () => setLoading(false)); // esconder spinner
  }

  return (
    <>
      { loading ? // se está esperando resposta api mostra spinner
        <_Spinner /> : 
        _error.error ? // se ocorre erro mostra a msg de erro
        <> {_error.msg}</> : 
        
        // Se tudo está ok exibe os dados carregados
        <ul>
          { doacoes.map(item => (
            <li key={item.id}>{item.id} | {item.pessoa.nome} | {item.pessoa.tipo.tipo} {item.pessoa.tipo.fator} | {item.local.nome} - {item.local.endereco.cidade.nome}  </li>
          ))}
        </ul>                                  

        }
    </>
  );
}

export default ListDoacoes;
