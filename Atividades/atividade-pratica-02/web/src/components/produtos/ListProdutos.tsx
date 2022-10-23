import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ProdutoModel } from '../../hooks/ProdutoModel';
import api from '../../services/api';
import { formatDate } from '../utils/formatDate';
import _Spinner from '../utils/spinner';

const ListProdutos = () => {
  const [ produtos, setProdutos ] = useState<ProdutoModel[]>([]); // Dados API
  const [loading, setLoading ] = useState(false); // Controla a exibição do Spinnner
  const [_error, setError] = useState({'error': false, 'msg': ''}); // Em caso de erro armazena a msg de erro a ser exibida

  useEffect(() => {
    setLoading(true); // mostrar spinner
    loadData();

  }, []);

  const loadData = () =>  {
    api.get('/produto')
     .then(response => {
      // console.log(response.data);
      setProdutos(response.data);
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
                                   
        produtos.length == 0 ?
        <p> Não possui registros ainda </p> :

        <Table responsive bordered>
          <thead>
            <tr>
              <th>Id</th>            
              <th>etiqueta</th>
              <th>validade</th>
              <th>[id] doacao / data</th>
              <th>[id] pessoa </th>
              <th> tipo </th>
              <th>ver</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.etiqueta}</td>
                <td>{formatDate(item.validade)}</td>
                <td>[{item.doacao.id}] - { formatDate(item.doacao.date)} </td>
                <td>[{item.doacao.pessoa.id}] {item.doacao.pessoa.nome} </td>
                <td>{item.doacao.pessoa.tipo.tipo} {item.doacao.pessoa.tipo.fator}</td>
                <td><Link to={`/produtos/${item.id}`} > ver </Link></td>
              </tr>
            ))}
          </tbody>
        
        </Table>

        }
    </>
  );
}

export default ListProdutos;
