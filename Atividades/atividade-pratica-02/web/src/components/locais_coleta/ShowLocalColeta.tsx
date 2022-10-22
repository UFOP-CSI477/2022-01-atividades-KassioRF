import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import api from '../../services/api';
import _Spinner from '../utils/spinner';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { formatDate } from '../utils/formatDate';
import { LocalColetaModel } from '../../hooks/LocalColetaModel';


const ShowLocalColeta = () => {
  const [localColeta, setLocalColeta] = useState<LocalColetaModel>();

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    api.get(`/localColeta/${id}`)
      .then(response => {
        setLocalColeta(response.data);
      })
      .catch((error) => {
        alert('ops algo deu errado');
      });
  }, [id]);

  const handleDeleteLocalColeta = async() => {
    if(!window.confirm("Confirma exclusão deste registro?")) {
      return;
    }
    try {
      await api.delete(`/localColeta/${id}`);
      navigate('/locais_coleta');
        

    }catch (error) {
      alert('Erro ao excluir o registro!');
      console.error(error);
    }    
  }

  return (
    <>
      <Table>
        <tbody>
          <tr>
            <th>Id:</th>
            <td>{localColeta?.id}</td>
          </tr>
          <tr>
            <th>Nome:</th>
            <td>{localColeta?.nome}</td>
          </tr>
          <tr>
            <th>Endereço:</th>
            <td>
            {`
                ${localColeta?.endereco.rua}, 
                ${localColeta?.endereco.numero}, 
                ${localColeta?.endereco.complemento}. 
                ${localColeta?.endereco.cidade?.nome} - ${localColeta?.endereco.cidade.estado?.sigla}
              `}              
            </td>
          </tr>
          <tr>
            <th>Criado em:</th>
            <td> {formatDate(localColeta?.created_at)} </td>
          </tr>

          <tr>
            <th>Atualizado em:</th>
            <td> {formatDate(localColeta?.updated_at)} </td>
          </tr>

        </tbody>
      </Table>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Button variant="primary" onClick={(_) => navigate('/locais_coleta')}>
            Voltar
          </Button>              
        </Col>        
        <Col md="auto">
          <Button variant="warning" onClick={(_) => navigate('/locais_coleta')}>
            Atualizar
          </Button>        
        </Col>        
        <Col md="auto">
          <Button variant="danger" onClick={(_) => handleDeleteLocalColeta()}>
            Excluir
          </Button>              
        </Col>
      
      </Row>      
    </>

  );

}

export default ShowLocalColeta;