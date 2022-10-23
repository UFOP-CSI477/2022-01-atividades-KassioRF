import React, {useEffect, useState} from "react";
import api from "../../services/api";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import _Spinner from '../utils/spinner';
import FormGroupEndereco from "../widgets/FormEndereco";
import { CidadeModel, EstadoModel } from "../../models/EnderecoModel";
import { LocalColetaModel } from "../../models/LocalColetaModel";
import { useNavigate, useParams } from "react-router-dom";
import { _Center } from "../globalStyles";

const EditLocalColeta = () => {

  const navigate = useNavigate();
  const [loading, setLoading ] = useState(false); // Controla a exibição do Spinnner
  const [_error, setError] = useState({'error': false, 'msg': ''}); // Em caso de erro armazena a msg de erro a ser exibida
  

  const [localColeta, setLocalColeta] = useState<LocalColetaModel>();

  // loaded apiData
  const [ estados, setEstados ] = useState<EstadoModel[]>([]);
  const [ cidades, setCidades ] = useState<CidadeModel[]>([]);

  const [ nome, setNome ] = useState('');
  const [ rua, setRua ] = useState('');
  const [ numero, setNumero] = useState('');
  const [ complemento, setComplemento ] = useState('');
  const [ cidadeId, setCidadeId] = useState(0);
  const [estadoId, setEstadoId] = useState(0);
  
  const { id } = useParams();
  
  useEffect(() => {
    setLoading(true);
    // carrega pessoa selecionada
    api.get(`/localColeta/${id}`)
      .then(response => {
        setNome(response.data.nome);
        setRua(response.data.endereco.rua);
        setNumero(response.data.endereco.numero);
        setComplemento(response.data.endereco.complemento);
        setCidadeId(response.data.endereco.cidade.id);
        setEstadoId(response.data.endereco.cidade.estado.id);
        
      })
      .catch(error => {
        var err = {'error': true, 'msg': 'Sem conexão com o servidor :('};
        setError(err);
        console.log(_error);
      })
    // carrega estados
    api.get('/estados')
    .then(response => {
      setEstados(response.data);
    });
    setLoading(false);

  },[]);


  const handleUpdateLocalColeta = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const data = {
      id: id ? parseInt(id) : '',
      nome,
      rua,
      numero,
      complemento,
      cidade_id: String(cidadeId),

    };  
    try {
      setLoading(true);
      await api.put(`/localColeta/${id}`, data);
      navigate(`/locais_coleta/${id}`);
    
    }catch (error) {
      alert('Erro ao atualizar o cadastro');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <_Center>
      <h5>Atualizar local de coleta</h5>      
      <Form onSubmit={handleUpdateLocalColeta}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="firsName">
            <Form.Label>Nome</Form.Label>
            <Form.Control 
              name="nome" 
              value={nome}
              onChange={e => setNome(e.target.value)}
              required
              placeholder="Nome" />

          </Form.Group>          
        </Row>
        <hr/>
        <FormGroupEndereco 
          rua={rua}
          numero={numero}
          complemento={complemento}
          estados={estados}
          cidadeId={cidadeId}
          setRua={setRua}
          setNumero={setNumero}
          setComplemento={setComplemento}
          setCidadeId={setCidadeId}  
          estadoSelected={estadoId}  
        />  

        <Row style={{paddingTop: '2rem'}}>
          <Col md={6}>
            <Button variant="primary" onClick={(_) => navigate('/locais_coleta')}>
              Voltar
            </Button>
          </Col>

          <Col md={6}>
            { loading ?
              <_Spinner /> :
              <Button variant="primary" type="submit">
                Atualizar
              </Button>
            }                   
          </Col>
        </Row>  

        

      </Form>
  
  
    </_Center>
  );  

}

export default EditLocalColeta;