import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import api from '../../services/api';
import _Spinner from '../utils/spinner';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { formatDate } from '../utils/formatDate';
import { UnidadeModel } from '../../hooks/UnidadeModel';

const ShowUnidade = () => {
  const [unidade, setUnidade ] = useState<UnidadeModel>();
  const navigate = useNavigate();
  
  const { id } = useParams();

  useEffect(() => {
    api.get(`/unidade/${id}`)
      .then(response => {
        setUnidade(response.data);
      })
      .catch((error) => {
        alert('ops algo deu errado');
      });
  }, [id]);

  return (
    <>
      <Table responsive>
        <tbody>
          <tr>
            <th>[Id]</th>
            <td>[{unidade?.id}]</td>
          </tr>
          <tr>
            <th>Nome:</th>
            <td>{unidade?.nome}</td>
          </tr>

          <tr>
            <th>Endereco:</th>
            <td>
            {`
                ${unidade?.endereco.rua}, 
                ${unidade?.endereco.numero}, 
                ${unidade?.endereco.complemento}. 
                ${unidade?.endereco.cidade?.nome} - ${unidade?.endereco.cidade.estado?.sigla}
              `}              
            </td>
          </tr>

          <tr>
            <th>Criado em:</th>
            <td> {formatDate(unidade?.created_at)} </td>
          </tr>

        </tbody>
      </Table>
      <h4>Distribuicoes</h4>
      <Table responsive>
          <thead>
            <tr>
              <th>Id</th>            
              <th>[id] Produto </th>
              <th>tipo</th>
            </tr>
          </thead>
          <tbody>
            {unidade?.distribuicao.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>[{item.produto.id}] {item.produto.etiqueta}</td>
                <td>{item.produto.doacao.pessoa.tipo.tipo} {item.produto.doacao.pessoa.tipo.fator}</td>
              </tr>
            ))}
          </tbody>
        
        </Table>

      <Row className="justify-content-md-center">
        <Col md="auto">
          <Button variant="primary" onClick={(_) => navigate('/unidades')}>
            Voltar
          </Button>              
        </Col>        

      </Row>   
    </>
  );

}



export default ShowUnidade;