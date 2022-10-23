import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import _Spinner from '../utils/spinner';
import { _Center } from "../globalStyles";
// select auto complete
import Select from 'react-select'

// datepicker
import { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/pt-br';
import { DoacaoModel } from "../../models/DoacaoModel";
import { formatDate } from "../utils/formatDate";

  
const CreateProduto = () => {
  const navigate = useNavigate();
  const [loading, setLoading ] = useState(false); // Controla a exibição do Spinnner  

  // loaded apidata
  // para criar uma doação precisamos da lista de pessoas cadastrads
  // para criar uma doação também precisamos da lista de locais de coleta
  const [ doacoes, setDoacoes ] = useState<DoacaoModel[]>([]);
  
  //Form data
  const [ etiqueta, setEtiqueta ] = useState('');
  const [ doacaoId, setDoacaoId ] = useState(0);
  
  const [ date, setDate] = useState<Dayjs | null>(null);

  // Solicita dados pre carregados no formulario
  useEffect(() => {
    //carrega doacoes
    api.get('/doacao')
      .then(response => {
        setDoacoes(response.data);
      });

  }, []);

  const handleCreateProduto = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      etiqueta: etiqueta,
      doacao_id: doacaoId,
      validade: date?.format('DD/MM/YYYY')
    };
    
    try {
      setLoading(true);
      await api.post('/produto', data);
      navigate('/produtos');
    }catch(error) {
      alert('Erro ao realizar o cadastro');
      console.error(error);
    } finally {
      setLoading(false);
    }

  }

  // preencher o select pessoas
  const getDoacoesOptionSelect = () => {
    const options: {value: string, label: string}[] = [];   
    doacoes.map(item => {
      options.push({value: `${item?.id}`, label: `[tipo] ${item?.pessoa.tipo.tipo}${item?.pessoa.tipo.fator} : [doador] ${item?.pessoa.documento} : [coleta] ${formatDate(item?.date)}`});
    })  
    return options;
  }
  
  return (
    <_Center>
      <p>Create produto</p>
      
      <Form onSubmit={handleCreateProduto}>
        <Col>
          <Form.Label>Etiqueta:</Form.Label>
          <Form.Control 
                name="etiqueta" 
                value={etiqueta}
                onChange={e => setEtiqueta(e.target.value)}
                required
                placeholder="etiqueta" />

        </Col>
        <Col>
        <Form.Label>Doacao:</Form.Label>
          <Select 
            isClearable={true}
            options={getDoacoesOptionSelect()}
            placeholder="Doação"
            onChange={e => e ? setDoacaoId(parseInt(e?.value)) : setDoacaoId(0)} 
          />        
        </Col>
        
        <Col>
          <Form.Label>Validade:</Form.Label>
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

        <Row style={{paddingTop: '2rem'}}>
          <Col md={6}>
            <Button variant="primary" onClick={(_) => navigate('/produtos')}>
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

export default CreateProduto;