import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UnidadeModel } from '../../hooks/UnidadeModel';
import api from '../../services/api';
import { formatDate } from '../utils/formatDate';
import _Spinner from '../utils/spinner';

const ListUnidades = () => {
  const [ unidades, setUnidades ] = useState<UnidadeModel[]>([]); // Dados API
  const [loading, setLoading ] = useState(false); // Controla a exibição do Spinnner
  const [_error, setError] = useState({'error': false, 'msg': ''}); // Em caso de erro armazena a msg de erro a ser exibida

  useEffect(() => {
    setLoading(true); // mostrar spinner
    loadData();

  }, []);

  const loadData = () =>  {
    api.get('/unidade')
     .then(response => {
      // console.log(response.data);
      setUnidades(response.data);
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
                                   
        unidades.length == 0 ?
        <p> Não possui registros ainda </p> :

        <Table responsive>
          <thead>
            <tr>
              <th>Id</th>            
              <th>nome</th>
              <th>distribuições</th>
              <th>endereco</th>
              <th>ver</th>
            </tr>
          </thead>
          <tbody>
            {unidades.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nome}</td>
                <td>{item.distribuicao.length}</td>
                <td>{item.endereco.cidade.nome} {item.endereco.cidade.estado.sigla}</td>
                <td><Link to={`/unidades/${item.id}`} > ver </Link></td>
              </tr>
            ))}
          </tbody>
        
        </Table>

        }
    </>
  );
}

export default ListUnidades;
