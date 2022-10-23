import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { CidadeModel, EstadoModel } from "../../hooks/EnderecoModel";
import _Spinner from '../utils/spinner';
import FormGroupEndereco from "../widgets/FormEndereco";
import { _Center } from "../globalStyles";

const CreateLocalColeta = () => {
  const navigate = useNavigate();
  const [loading, setLoading ] = useState(false); // Controla a exibição do Spinnner  

  // loaded apiData
  const [ estados, setEstados ] = useState<EstadoModel[]>([]);
  const [ cidades, setCidades ] = useState<CidadeModel[]>([]);

  const [ nome, setNome ] = useState('');
  const [ rua, setRua ] = useState('');
  const [ numero, setNumero] = useState('');
  const [ complemento, setComplemento ] = useState('');
  const [ cidadeId, setCidadeId] = useState(0);

  // Solicita dados pre carregados no formulário
  useEffect(() => {
    // Carrega estados
    api.get('/estados')
      .then(response => {
        setEstados(response.data);
      });
  }, []);

  const handleCreateLocalColeta = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      nome,
      rua,
      numero,
      complemento,
      cidade_id: String(cidadeId),
    };

    try {
      setLoading(true);
      await api.post('/localColeta', data);
      navigate('/locais_coleta');
    }catch(error) {
      alert('Erro ao realizar o cadastro');
      console.error(error);
    } finally {
      setLoading(false);
    }

  }

  return (
    <_Center>
      <h5>Cadastrar Local de Coleta</h5>
      <Form onSubmit={handleCreateLocalColeta}>
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
                Cadastrar
              </Button>
            }            
          </Col>
        </Row>

      </Form>
  
  
    </_Center>
  );  
  
}

export default CreateLocalColeta;