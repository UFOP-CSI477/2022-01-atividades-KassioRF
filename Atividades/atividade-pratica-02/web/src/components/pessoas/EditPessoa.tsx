import { useState, useEffect } from 'react';
import api from '../../services/api';
import _Spinner from '../utils/spinner';
import { useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FormGroupEndereco from "../widgets/FormEndereco";
import { PessoaModel } from '../../models/PessoaModel';
import { CidadeModel, EstadoModel } from '../../models/EnderecoModel';
import { TipoSanguineoModel } from '../../models/TipoSanguineoModel';
import { _Center } from "../globalStyles";

const EditPessoa = () => {
  
  const [loading, setLoading ] = useState(false); // Controla a exibição do Spinnner
  const [_error, setError] = useState({'error': false, 'msg': ''}); // Em caso de erro armazena a msg de erro a ser exibida
  
  const [ pessoa, setPessoa] = useState<PessoaModel>();

  // loaded apiData
  const [ tiposSanguineos, setTiposSanguineos] = useState<TipoSanguineoModel[]>([]);
  const [ estados, setEstados ] = useState<EstadoModel[]>([]);
  const [ cidades, setCidades ] = useState<CidadeModel[]>([]);
  const [ estadoId, setEstadoId] = useState(0);

  const [ nome, setNome ] = useState('');
  const [ sobrenome, setSobrenome ] = useState('');
  const [ documento, setDocumento ] = useState('');
  const [ tipoSanguineoId, setTipoSanguineoId ] = useState(0);
  const [ rua, setRua ] = useState('');
  const [ numero, setNumero] = useState('');
  const [ complemento, setComplemento ] = useState('');
  const [ cidadeId, setCidadeId] = useState(0);


  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    setLoading(true);
    // carrega pessoa selecionada
    api.get(`/pessoas/${id}`)
      .then(response => {
        setPessoa(response.data);
        setNome(response.data.nome.split(' ')[0]);
        setSobrenome(response.data.nome.substring(response.data.nome.indexOf(' ') + 1));
        setDocumento(response.data.documento);
        setTipoSanguineoId(parseInt(response.data.tipo.id));
        setRua(response.data.endereco.rua);
        setNumero(response.data.endereco.numero);
        setComplemento(response.data.endereco.complemento);
        setCidadeId(response.data.endereco.cidade.id);
      })
      .catch(error => {
        var err = {'error': true, 'msg': 'Sem conexão com o servidor :('};
        setError(err);
        console.log(_error);
      });
    // carrega tipo sanguineo
    api.get('/tipoSanguineo')
    .then(response => {
      setTiposSanguineos(response.data);
    });
    // carrega estados
    api.get('/estados')
    .then(response => {
      setEstados(response.data);
    });
    setLoading(false);
  },[]);


  const handleUpdatePessoa = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const data = {
      id: id ? parseInt(id) : '',
      nome: `${nome} ${sobrenome}`,
      documento,
      rua,
      numero,
      complemento,
      cidade_id: String(cidadeId),
      tipo_sanguineo_id: tipoSanguineoId
    };  
    console.log(pessoa);
    console.log(data);
    try {
      setLoading(true);
      await api.put(`/pessoas/${id}`, data);
      navigate(`/pessoas/${id}`);
    
    }catch (error) {
      alert('Erro ao atualizar o cadastro');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <_Center>
      {loading ? 
      <_Spinner /> :       
      
      _error.error ?
      <p> {_error.msg }</p> :
      
      !pessoa ?
        <h4> Usuário não encontrado</h4> 
      :        
        <Form onSubmit={handleUpdatePessoa}>
        <h4> Atualizar cadastro</h4>
        {/* DADOS PESSOAIS */}
        <Row className="mb-3">
          <p>Dados Pessoais:</p>
          <Form.Group as={Col} controlId="firsName">
            <Form.Label>Nome</Form.Label>
            <Form.Control 
              name="nome" 
              defaultValue={nome}
              onChange={e => setNome(e.target.value)}
              required
              placeholder="Nome" />

          </Form.Group>
          <Form.Group as={Col} controlId="lastName">
            <Form.Label>Sobrenome</Form.Label>
            <Form.Control 
            name="sobrenome" 
            defaultValue={sobrenome}
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
              defaultValue={documento}
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
              //defaultValue={pessoa && tiposSanguineos.length > 0 ? pessoa.tipo.id : 2}              
              >

                
                { tipoSanguineoId == 0 ?  <option value="">selecione...</option>
                
                : <option defaultValue={tipoSanguineoId} value={tipoSanguineoId}>
                  {tiposSanguineos.find(t => t.id == tipoSanguineoId)?.tipo}{tiposSanguineos.find(t => t.id == tipoSanguineoId)?.fator}
                </option>
                }
                
                { tiposSanguineos.map(item => (   
                  tipoSanguineoId != item.id ?
                    <option key={item.id} value={item.id}> {item.tipo}{item.fator} </option>
                  : null
                ))}
              
              
              
              {/* {tipoSanguineoId == 0 ? <option defaultValue="">selecione...</option> 
              : 
                <option key={pessoa.tipo.id} value={pessoa.tipo.id}>{pessoa.tipo.tipo}{pessoa.tipo.fator}</option> }

              { tiposSanguineos.map(item => (
                tipoSanguineoId != item.id ?                
                  <option  key={item.id} value={item.id}> {item.tipo}{item.fator} </option>
                : 
                 null
              ))} */}

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
          cidadeId= {cidadeId}
          setRua={setRua}
          setNumero={setNumero}
          setComplemento={setComplemento}
          setCidadeId={setCidadeId}
          estadoSelected={pessoa.endereco.cidade.estado.id}  
        />              

        <Row style={{paddingTop: '2rem'}}>
          <Col md={6}>            
            <Button variant="primary" onClick={(_) => navigate('/pessoas')}>
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
      }
    </_Center>
    
    
  );
}

export default EditPessoa;