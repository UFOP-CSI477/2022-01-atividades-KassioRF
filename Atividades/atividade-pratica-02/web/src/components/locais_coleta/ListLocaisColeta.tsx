import { useState, useEffect } from 'react';
import { LocalColetaModel } from '../../models/LocalColetaModel';
import api from '../../services/api';
import _Spinner from '../utils/spinner';
import { Link } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';

const ListLocaisColeta = () => {
  
  const [ locaisColeta, setLocaisColeta ] = useState<LocalColetaModel[]>([]); // Dados API
  const [loading, setLoading ] = useState(false); // Controla a exibição do Spinnner
  const [_error, setError] = useState({'error': false, 'msg': ''}); // Em caso de erro armazena a msg de erro a ser exibida

  useEffect(() => {
    setLoading(true); // mostrar spinner
    loadData();
  }, []);

  const loadData = () => {
    api.get('/localColeta')
      .then(response => {
        setLocaisColeta(response.data);
        // console.log(response.data);
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
        locaisColeta.length == 0 ?
          <> Sem dados carregados </> :        
          <Table responsive bordered>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Cidade</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {locaisColeta.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.nome}</td>
                  <td>{item.endereco.cidade.nome} {item.endereco.cidade.estado.sigla}</td>
                  <td><Link to={`/locais_coleta/${item.id}`} > ver </Link></td>
                </tr>
              ))}
            </tbody>

          </Table>
        }

    </>
  );
}

export default ListLocaisColeta;
