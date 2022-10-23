import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DistribuicaoModel } from '../../hooks/DistribuicaoModel';
import api from '../../services/api';
import { formatDate } from '../utils/formatDate';
import _Spinner from '../utils/spinner';

const ListDistribuicao = () => {
  const [ distribuicao, setDistribuicao ] = useState<DistribuicaoModel[]>([]); // Dados API
  const [loading, setLoading ] = useState(false); // Controla a exibição do Spinnner
  const [_error, setError] = useState({'error': false, 'msg': ''}); // Em caso de erro armazena a msg de erro a ser exibida

  useEffect(() => {
    setLoading(true); // mostrar spinner
    loadData();

  },[]);
  console.log(distribuicao);
  const loadData = () =>  {
    api.get('/distribuicao')
     .then(response => {
      // console.log(response.data);
      setDistribuicao(response.data);
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
                                  
        distribuicao.length == 0 ?
        <p> Não possui registros ainda </p> :

        <Table responsive>
          <thead>
            <tr>
              <th>Id</th>            
              <th>[id] Unidade </th>
              <th>[id] Produto </th>
              <th>ver</th>
            </tr>
          </thead>
          <tbody>
            {distribuicao.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>[{item.unidade.id}] {item.unidade.nome} - {item.unidade.endereco.cidade.nome} {item.unidade.endereco.cidade.estado.sigla}</td>               
                <td>[{item.produto.id}] {item.produto.etiqueta}  </td>
                <td><Link to={`/distribuicoes/${item.id}`} > ver </Link></td>
              </tr>
            ))}
          </tbody>
        
        </Table>

        }
    </>
  );
}

export default ListDistribuicao;
