import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import api from '../../services/api';
import _Spinner from '../utils/spinner';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { formatDate } from '../utils/formatDate';
import { DistribuicaoModel } from '../../models/DistribuicaoModel';
import { _Center } from "../globalStyles";

const ShowDistribuicao = () => {
  const [distribuicao, setDistribuicao ] = useState<DistribuicaoModel>();
  const navigate = useNavigate();
  
  const { id } = useParams();

  useEffect(() => {
    api.get(`/distribuicao/${id}`)
      .then(response => {
        setDistribuicao(response.data);
      })
      .catch((error) => {
        alert('ops algo deu errado');
      });
  }, [id]);

  const handleDeleteDistribuicao = async() => {
    if(!window.confirm("Confirma exclusão deste registro?")) {
      return;
    }
    try {
      await api.delete(`/distribuicao/${id}`);
      navigate('/distribuicao');      
    }catch (error) {
      alert('Erro ao excluir o registro!');
      console.error(error);
    }    
  }

  return (
    <_Center>
      <h4> Distribuição - detalhes: </h4>
      <Table responsive bordered>
        <tbody>
          <tr>
            <th>Id:</th>
            <td>{distribuicao?.id}</td>
          </tr>
          {/* tipo */}
          <tr>
            <th>[Id] Unidade:</th>
            <td>[{distribuicao?.unidade.id}] {distribuicao?.unidade.nome} - {distribuicao?.unidade.endereco.cidade.nome} {distribuicao?.unidade.endereco.cidade.estado.sigla} </td>
          {/* pessoa id */}
          </tr>
          <tr>
            <th>[Id] Produto:</th>
            <td>[{distribuicao?.produto.id}] {distribuicao?.produto.etiqueta} | validade: {formatDate(distribuicao?.produto.validade)} </td>
          </tr>
          <tr>
            <th>Tipo:</th>
            <td>{distribuicao?.produto.doacao.pessoa.tipo.tipo}{distribuicao?.produto.doacao.pessoa.tipo.fator}</td>
          </tr>
          <tr>
            <th>Criado em:</th>
            <td> {formatDate(distribuicao?.created_at)} </td>
          </tr>
        </tbody>
      </Table>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Button variant="primary" onClick={(_) => navigate('/distribuicoes')}>
            Voltar
          </Button>              
        </Col>              
      </Row>   
    </_Center>
  );

}



export default ShowDistribuicao;