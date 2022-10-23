import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { CidadeModel, EstadoModel } from "../../hooks/EnderecoModel";
import _Spinner from '../utils/spinner';
import { UnidadeModel } from "../../hooks/UnidadeModel";
import { ProdutoModel } from "../../hooks/ProdutoModel";
import { formatDate } from "../utils/formatDate";

// select auto complete
import Select, { GroupBase } from 'react-select'

// datepicker
import { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/pt-br';

  
const CreateDistribuicao = () => {
  const navigate = useNavigate();
  const [loading, setLoading ] = useState(false); // Controla a exibição do Spinnner  

  // loaded apidata
  // para criar uma Distribuição precisamos da lista de unidades cadastrads
  // para criar uma Distribuição também precisamos da lista de produtos
  const [ unidades, setUnidades ] = useState<UnidadeModel[]>([]);
  const [ produtos, setProdutos] = useState<ProdutoModel[]>([]);

  //Form data
  const [ unidadeId, setUnidadeId ] = useState(0);
  const [ produtoId, setProdutoId ] = useState(0);
  const [ date, setDate] = useState<Dayjs | null>(null);

  // Solicita dados pre carregados no formulario
  useEffect(() => {
    //carrega unidade
    api.get('/unidade')
      .then(response => {
        setUnidades(response.data);
      });
    //carrega locais coleta
    api.get('/produto')
      .then(response => {
        setProdutos(response.data);
      });
  }, []);

  const handleCreateDistribuicao = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      unidade_id: unidadeId,
      produto_id: produtoId,
      date: date?.format('DD/MM/YYYY')
    };
    
    try {
      setLoading(true);
      await api.post('/distribuicao', data);
      navigate('/distribuicoes');
    }catch(error) {
      alert('Erro ao realizar o cadastro');
      console.error(error);
    } finally {
      setLoading(false);
    }

  }


  // preencher o select unidades
  const getUnidadesOptionSelect = () => {
    const options: {value: string, label: string}[] = [];   
    unidades.map(item => {
      options.push({value: `${item?.id}`, label: `[${item?.id}] ${item?.nome} - ${item?.endereco.cidade.nome} ${item?.endereco.cidade.estado.sigla}`});
    })  
    return options;
  }
  // preencher o produtos
  const getProdutosOptionSelect = () => {
    const options: {value: string, label: string}[] = [];   
    produtos.map(item => {
      options.push({value: `${item?.id}`, label: `[${item?.id}] ${item?.etiqueta}: ${item?.doacao.pessoa.tipo.tipo}${item?.doacao.pessoa.tipo.fator} validade: ${formatDate(item?.validade)}` });
    })  
    return options;
  }


  return (
    <>
      <p>Create distribuicao</p>
      
      <Form onSubmit={handleCreateDistribuicao}>
        <Col md={6}>
        <Form.Label>Unidade:</Form.Label>
          <Select 
            isClearable={true}
            options={getUnidadesOptionSelect()}
            placeholder="Unidade"
            onChange={e => e ? setUnidadeId(parseInt(e?.value)) : setUnidadeId(0)} 
          />        
        </Col>
        <Col md={6}>
        <Form.Label>Produto:</Form.Label>
          <Select
            isClearable={true}
            placeholder="Produto"
            onChange={e => e ? setProdutoId(parseInt(e?.value)) : setProdutoId(0)}        
            options={getProdutosOptionSelect()} 
          />
        </Col>
        
        <Col md={6}>
          <Form.Label>Data:</Form.Label>
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



        <Button variant="primary" onClick={(_) => navigate('/distribuicoes')}>
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

export default CreateDistribuicao;