import { useState, useEffect } from 'react';
import { PessoaModel } from '../../hooks/PessoaModel';
import api from '../../services/api';
import _Spinner from '../utils/spinner';
import { Link } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';

const ListPessoas = () => {
  
  const [ pessoas, setPessoas ] = useState<PessoaModel[]>([]); // Dados API
  const [loading, setLoading ] = useState(false); // Controla a exibição do Spinnner
  const [_error, setError] = useState({'error': false, 'msg': ''}); // Em caso de erro armazena a msg de erro a ser exibida

  useEffect(() => {
    setLoading(true); // mostrar spinner
    loadData();
  }, []);

  const loadData = () => {
    api.get('/pessoas')
     .then(response => {
        setPessoas(response.data);
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
        pessoas.length == 0 ?
          <> Sem dados carregados </> :        

          <Table responsive>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Documento</th>
                <th>tipo sang.</th>
                <th>Cidade</th>
                <th>  </th>
              </tr>    
            </thead>
            <tbody>
              {pessoas.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.nome}</td>
                  <td>{item.documento}</td>
                  <td>{item.tipo.tipo}{item.tipo.fator}</td>
                  <td>{item.endereco.cidade.nome} - {item.endereco.cidade.estado.sigla}</td>

                  <td><Link to={`/pessoas/${item.id}`} > ver </Link></td>
                </tr>              

              ))}
            </tbody>

            
          </Table>
        }
    
 
    </>


  );
}

export default ListPessoas;