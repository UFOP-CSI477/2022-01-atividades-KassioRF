import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { CidadeModel, EstadoModel } from "../../hooks/EnderecoModel";
import { TipoSanguineoModel } from "../../hooks/TipoSanguineoModel";
import _Spinner from '../utils/spinner';
import FormGroupEndereco from "../widgets/FormEndereco";


const CreatePessoa = () => {
  const navigate = useNavigate();
  const [loading, setLoading ] = useState(false); // Controla a exibição do Spinnner  
  // loaded apiData
  const [ tiposSanguineos, setTiposSanguineos] = useState<TipoSanguineoModel[]>([]);
  const [ estados, setEstados ] = useState<EstadoModel[]>([]);
  const [ cidades, setCidades ] = useState<CidadeModel[]>([]);

  //form data
  const [ nome, setNome ] = useState('');
  const [ sobrenome, setSobrenome ] = useState('');
  const [ documento, setDocumento ] = useState('');
  const [ tipoSanguineoId, setTipoSanguineoId ] = useState(0);
  const [ rua, setRua ] = useState('');
  const [ numero, setNumero] = useState('');
  const [ complemento, setComplemento ] = useState('');
  const [ cidadeId, setCidadeId] = useState(0);

  // Solicita dados pre carregados no formulário
  useEffect(() => {
    // Carrega estados
    api.get('/tipoSanguineo')
      .then(response => {
        setTiposSanguineos(response.data);
      });
    api.get('/estados')
      .then(response => {
        setEstados(response.data);
      });

    // Carrega tipos sanguineos

  }, []);

  // Envia a requisição de criação para o servidor
  const handleCreatePessoa = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      nome: `${nome} ${sobrenome}`,
      documento,
      rua,
      numero,
      complemento,
      cidade_id: String(cidadeId),
      tipo_sanguineo_id: tipoSanguineoId
    };  
    console.log(data);
    try {
      setLoading(true);
      await api.post('/pessoas', data);
      navigate('/pessoas');
    
    }catch (error) {
      alert('Erro ao realizar o cadastro');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (

    <div>
      <h4>Cadastrar Pessoa</h4>
      <Form onSubmit={handleCreatePessoa}>
        {/* DADOS PESSOAIS */}
        <Row className="mb-3">
          <p>Dados Pessoais:</p>
          <Form.Group as={Col} controlId="firsName">
            <Form.Label>Nome</Form.Label>
            <Form.Control 
              name="nome" 
              value={nome}
              onChange={e => setNome(e.target.value)}
              required
              placeholder="Nome" />

          </Form.Group>
          <Form.Group as={Col} controlId="lastName">
            <Form.Label>Sobrenome</Form.Label>
            <Form.Control 
            name="sobrenome" 
            value={sobrenome}
            onChange={e => setSobrenome(e.target.value)}
            required
            placeholder="Sobrenome" />
          </Form.Group>
        </Row>

        <Row>          
          <Form.Group as={Col} controlId="document">
            <Form.Label>Documento</Form.Label>
            <Form.Control 
              name="documento" 
              value={documento}
              onChange={e => setDocumento(e.target.value)}
              required
              placeholder="Documento - RG/CPF" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            
            <Form.Label>Tipo Sanguíneo</Form.Label>                
            <Form.Select 
              name="tiposanguineo"
              onChange={e => setTipoSanguineoId(parseInt(e.target.value))}
              required
              defaultValue="selecione">
              <option value="">selecione...</option>
              { tiposSanguineos.map(item => (
                <option key={item.id} value={item.id}> {item.tipo}{item.fator} </option>
              ))}
            </Form.Select>
          
          </Form.Group>
        </Row>

        {/* ENDERECO */}
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
        <Button variant="primary" onClick={(_) => navigate('/pessoas')}>
          Voltar
        </Button>
        { loading ?
          <_Spinner /> :
          <Button variant="primary" type="submit">
            Cadastrar
          </Button>
        }

      </Form>


    </div>

  );
}

export default CreatePessoa;