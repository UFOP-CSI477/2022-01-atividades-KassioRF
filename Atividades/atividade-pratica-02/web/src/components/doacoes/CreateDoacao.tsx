import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { CidadeModel, EstadoModel } from "../../hooks/EnderecoModel";
import _Spinner from '../utils/spinner';
import { PessoaModel } from "../../hooks/PessoaModel";
import { LocalColetaModel } from "../../hooks/LocalColetaModel";
//import FormGroupEndereco from "../widgets/FormEndereco";

// select auto complete
import Select, { GroupBase } from 'react-select'

// datepicker
import { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/pt-br';

  
const CreateDoacao = () => {
  const navigate = useNavigate();
  const [loading, setLoading ] = useState(false); // Controla a exibição do Spinnner  

  // loaded apidata
  // para criar uma doação precisamos da lista de pessoas cadastrads
  // para criar uma doação também precisamos da lista de locais de coleta
  const [ pessoas, setPessoas ] = useState<PessoaModel[]>([]);
  const [ locaisColeta, setLocaisColeta] = useState<LocalColetaModel[]>([]);

  //Form data
  const [ pessoaId, setPessoaId ] = useState(0);
  const [ localColetaId, setLocalColetaId ] = useState(0);
  const [ date, setDate] = useState<Dayjs | null>(null);

  // Solicita dados pre carregados no formulario
  useEffect(() => {
    //carrega pessoas
    api.get('/pessoas')
      .then(response => {
        setPessoas(response.data);
      });
    //carrega locais coleta
    api.get('/localColeta')
      .then(response => {
        setLocaisColeta(response.data);
      });
  }, []);

  const handleCreateDoacao = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      pessoa_id: pessoaId,
      local_id: localColetaId,
      date: date?.format('DD/MM/YYYY')
    };
    
    try {
      setLoading(true);
      await api.post('/doacao', data);
      navigate('/doacoes');
    }catch(error) {
      alert('Erro ao realizar o cadastro');
      console.error(error);
    } finally {
      setLoading(false);
    }

  }


  // preencher o select pessoas
  const getPessoasOptionSelect = () => {
    const options: {value: string, label: string}[] = [];   
    pessoas.map(item => {
      options.push({value: `${item?.id}`, label: `[${item?.id}] ${item?.nome} - ${item?.documento}`});
    })  
    return options;
  }
  // preencher o locais coleta
  const getLocaisColetaOptionSelect = () => {
    const options: {value: string, label: string}[] = [];   
    locaisColeta.map(item => {
      options.push({value: `${item?.id}`, label: `[${item?.id}] ${item?.nome}: ${item?.endereco.cidade.nome} ${item?.endereco.cidade.estado.sigla}` });
    })  
    return options;
  }


  return (
    <>
      <p>Create doacao</p>
      
      <Form onSubmit={handleCreateDoacao}>
        <Col md={6}>
        <Form.Label>Doador:</Form.Label>
          <Select 
            isClearable={true}
            options={getPessoasOptionSelect()}
            placeholder="Doador"
            onChange={e => e ? setPessoaId(parseInt(e?.value)) : setPessoaId(0)} 
          />        
        </Col>
        <Col md={6}>
        <Form.Label>Local de coleta:</Form.Label>
          <Select
            isClearable={true}
            placeholder="Local de coleta"
            onChange={e => e ? setLocalColetaId(parseInt(e?.value)) : setLocalColetaId(0)}        
            options={getLocaisColetaOptionSelect()} 
          />
        </Col>
        
        <Col md={6}>
          <Form.Label>Data da doação:</Form.Label>
          <div></div>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={`pt-br`}>
            <DatePicker
              
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>        
        </Col>



        <Button variant="primary" onClick={(_) => navigate('/doacoes')}>
            Voltar
          </Button>
          { loading ?
            <_Spinner /> :
            <Button variant="primary" type="submit">
              Cadastrar
            </Button>
          }
      </Form> 
        
    </>
  );

}

export default CreateDoacao;