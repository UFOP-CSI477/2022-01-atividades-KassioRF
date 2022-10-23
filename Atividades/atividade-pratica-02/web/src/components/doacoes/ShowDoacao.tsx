import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import api from '../../services/api';
import _Spinner from '../utils/spinner';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { formatDate } from '../utils/formatDate';
import { DoacaoModel } from '../../models/DoacaoModel';
import { _Center } from "../globalStyles";

const ShowDoacao = () => {
  const [doacao, setDoacao ] = useState<DoacaoModel>();
  const navigate = useNavigate();
  
  const { id } = useParams();

  useEffect(() => {
    api.get(`/doacao/${id}`)
      .then(response => {
        setDoacao(response.data);
      })
      .catch((error) => {
        alert('ops algo deu errado');
      });
  }, [id]);

  const handleDeleteDoacao = async() => {
    if(!window.confirm("Confirma exclusão deste registro?")) {
      return;
    }
    try {
      await api.delete(`/doacao/${id}`);
      navigate('/doacoes');      
    }catch (error) {
      alert('Erro ao excluir o registro!');
      console.error(error);
    }    
  }

  return (
    <_Center>
      <h5>Doação - detalhes:</h5>
      <Table responsive bordered>
        <tbody>
          <tr>
            <th>Id:</th>
            <td>{doacao?.id}</td>
          </tr>
          {/* tipo */}
          <tr>
            <th>tipo sang.:</th>
            <td>{doacao?.pessoa.tipo.tipo}{doacao?.pessoa.tipo.fator}</td>
          </tr>
          <tr>
            <th>Data:</th>
            <td>{formatDate(doacao?.date)}</td>
          </tr>
          {/* pessoa id */}
          <tr>
            <th>Pessoa:</th>
            <td>[{doacao?.pessoa.id}] {doacao?.pessoa.nome} | {doacao?.pessoa.documento} </td>
          </tr>
          <tr>
            <th>localColeta</th>
            <td>[{doacao?.local.id}] {doacao?.local.nome} | {doacao?.local.endereco.cidade.nome} {doacao?.local.endereco.cidade.estado.sigla} </td>
          </tr>
          <tr>
            <th>Criado em:</th>
            <td> {formatDate(doacao?.created_at)} </td>
          </tr>

          <tr>
            <th>Atualizado em:</th>
            <td> {formatDate(doacao?.updated_at)} </td>
          </tr>

        </tbody>
      </Table>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Button variant="primary" onClick={(_) => navigate('/doacoes')}>
            Voltar
          </Button>              
        </Col>        
        <Col md="auto">
          <Button variant="danger" onClick={(_) => handleDeleteDoacao()}>
            Excluir
          </Button>              
        </Col>
      
      </Row>   
    </_Center>
  );

}



export default ShowDoacao;