import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import api from '../../services/api';
import _Spinner from '../utils/spinner';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { formatDate } from '../utils/formatDate';
import { ProdutoModel } from '../../hooks/ProdutoModel';
import { _Center } from "../globalStyles";

const ShowProduto = () => {
  const [produto, setProduto ] = useState<ProdutoModel>();
  const navigate = useNavigate();
  
  const { id } = useParams();

  useEffect(() => {
    api.get(`/produto/${id}`)
      .then(response => {
        setProduto(response.data);
      })
      .catch((error) => {
        alert('ops algo deu errado');
      });
  }, [id]);

  const handleDeleteProduto = async() => {
    if(!window.confirm("Confirma exclusão deste registro?")) {
      return;
    }
    try {
      await api.delete(`/produto/${id}`);
      navigate('/produtos');      
    }catch (error) {
      alert('Erro ao excluir o registro!');
      console.error(error);
    }    
  }

  return (
    <_Center>
      <h4> Produto - detalhes: </h4>
      <Table responsive bordered>
        <tbody>
          <tr>
            <th>[Id] Etiqueta:</th>
            <td>[{produto?.id}]{produto?.etiqueta}</td>
          </tr>
          <tr>
            <th>Tipo:</th>
            <td>{produto?.doacao.pessoa.tipo.tipo} {produto?.doacao.pessoa.tipo.fator}</td>
          </tr>

          <tr>
            <th>Validade:</th>
            <td>{formatDate(produto?.validade)}</td>
          </tr>
          <tr>
            <th>Doacao:</th>
            <td>[{produto?.doacao.id}] - { formatDate(produto?.doacao.date)}</td>
          </tr>
          <tr>
            <th>Pessoa:</th>
            <td>[{produto?.doacao.pessoa.id}] {produto?.doacao.pessoa.nome} {produto?.doacao.pessoa.documento} </td>
          </tr>
          <tr>
            <th>Criado em:</th>
            <td> {formatDate(produto?.created_at)} </td>
          </tr>

        </tbody>
      </Table>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Button variant="primary" onClick={(_) => navigate('/produtos')}>
            Voltar
          </Button>              
        </Col>        

      </Row>   
    </_Center>
  );

}



export default ShowProduto;