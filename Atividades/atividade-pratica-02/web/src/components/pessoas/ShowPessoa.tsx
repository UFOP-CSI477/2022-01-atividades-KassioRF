import { useState, useEffect } from 'react';
import { PessoaModel } from '../../hooks/PessoaModel';
import { useNavigate, useParams } from "react-router-dom";
import api from '../../services/api';
import _Spinner from '../utils/spinner';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { formatDate } from '../utils/formatDate';

const ShowPessoa = () => {
  const [ pessoa, setPessoa] = useState<PessoaModel>();

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    api.get(`/pessoas/${id}`)
      .then(response => {
        setPessoa(response.data);
      })
      .catch((error) => {
        alert('ops algo deu errado');
        console.log(error);
      })
  },[id]);


  const handleDeletePessoa = async() => {
    if(!window.confirm("Confirma exclusão deste registro?")) {
      return;
    }
    
    try {
      await api.delete(`/pessoas/${id}`);
      navigate('/pessoas');
        

    }catch (error) {
      alert('Erro ao excluir o registro!');
      console.error(error);
    }
  }

  return (
    <>
      <h4> Show pessoa </h4>
      <Table>
        <tbody>
          <tr>
            <th>Id:</th>
            <td>{pessoa?.id}</td>
          </tr>

          <tr>
            <th>Nome:</th>
            <td>{pessoa?. nome}</td>
          </tr>

          <tr>
            <th>Documento:</th>
            <td>{pessoa?.documento}</td>
          </tr>

          <tr>
            <th>tipo sang.:</th>
            <td>{pessoa?.tipo.tipo}{pessoa?.tipo.fator}</td>
          </tr>

          <tr>
            <th>Endereço:</th>
            <td>
              {`
                ${pessoa?.endereco.rua}, 
                ${pessoa?.endereco.numero}, 
                ${pessoa?.endereco.complemento}. 
                ${pessoa?.endereco.cidade?.nome} - ${pessoa?.endereco.cidade.estado?.sigla}
              `}
            </td>
          </tr>

          <tr>
            <th>Criado em:</th>
            <td> {formatDate(pessoa?.created_at)} </td>
          </tr>

          <tr>
            <th>Atualizado em:</th>
            <td> {formatDate(pessoa?.updated_at)} </td>
          </tr>

        </tbody>
      </Table>

      <Row className="justify-content-md-center">
        <Col md="auto">
          <Button variant="primary" onClick={(_) => navigate('/pessoas')}>
            Voltar
          </Button>              
        </Col>        
        <Col md="auto">
          <Button variant="warning" onClick={(_) => navigate(`/pessoas/atualizar/${pessoa?.id}`)}>
            Atualizar
          </Button>        
        </Col>        
        <Col md="auto">
          <Button variant="danger" onClick={(_) => handleDeletePessoa()}>
            Excluir
          </Button>              
        </Col>
      
      </Row>

    </>
  );
}

export default ShowPessoa;
