import React, {useEffect, useState} from "react"

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { CidadeModel, EstadoModel } from "../../hooks/EnderecoModel";


// Fonte utilizada para criar componentes com gerenciadores de estado como propriedades
// https://stackoverflow.com/questions/64729482/typescript-usestate-setstate-in-child-with-argument

// Define um tipo para as props
type FormEnderecoProps = {
  rua: string;
  numero: string;
  complemento: string;
  estados: EstadoModel[];
  cidadeId: number;
  estadoSelected?: number;

  setRua: React.Dispatch<React.SetStateAction<any>>;
  setNumero: React.Dispatch<React.SetStateAction<any>>;
  setComplemento: React.Dispatch<React.SetStateAction<any>>;
  setCidadeId: React.Dispatch<React.SetStateAction<any>>;
  
}

const FormGroupEndereco = (props: FormEnderecoProps) => {
  
  const [estadoId, setEstadoId] = useState(0);
  const [ cidades, setCidades ] = useState<CidadeModel[]>([]);
  const [firstLoad, setFirstLoad] = useState(true);
  // Preenche o select das cidades
  useEffect(() => {
    if (props.estadoSelected) {
      //setEstadoId(props.estadoSelected);
      props.setCidadeId(props.cidadeId);
      if (firstLoad){
        fillCidades(props.estadoSelected);
        setFirstLoad(false);
      }

    }

  },)

  const fillCidades = (_estadoId: number | undefined) => {
    console.log(_estadoId)
    if (_estadoId) {
      setEstadoId(_estadoId);
      const _cidades = props.estados.find(estado => estado.id == _estadoId)?.cidade;
      if (_cidades) {
        setCidades(_cidades);
      }
    } else {
      setCidades([]);
    }
    
  }
  const updateSelect = () => {
    fillCidades(estadoId);
  }

  // console.log(props.estadoSelected);
  // console.log(props.cidadeId);

  return (
    <>
      <Row className="mb-3">
        <p>Endereço:</p>
        <Form.Group as={Col} className="" controlId="formGridAddress1">
          <Form.Label>Rua</Form.Label>
          <Form.Control 
            name="rua" 
            value={props.rua}
            onChange={e => props.setRua(e.target.value)}
            required
            placeholder="Rua" />
        </Form.Group>
        <Col xs={2}>
          <Form.Group className="mb-2" controlId="formGridAddress1">
            <Form.Label>Numero</Form.Label>
            <Form.Control 
              name="numero" 
              type="number" 
              value={props.numero}                
              onChange={e => props.setNumero(String(e.target.value))}
              required
              placeholder="123" />
          </Form.Group>          
        </Col>

        <Form.Group as={Col} className="" controlId="formGridAddress2">
          <Form.Label>Complemento</Form.Label>
          <Form.Control 
            name="complemento" 
            value={props.complemento}
            onChange={e => props.setComplemento(e.target.value)}
            required
            placeholder="Apartamento studio etc" />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Estado</Form.Label>
          <Form.Select
            required  
            onChange={e => fillCidades(parseInt(e.target.value))}>
            {!props.estadoSelected ? <option value="">selecione</option>
            : <option key={props.estadoSelected} value={props.estadoSelected}>
              { props.estados.find(e => e.id == props.estadoSelected)?.sigla }
            </option>
            }
            { props.estados.map(item => (
              props.estadoSelected != item.id ?  
                <option key={item.id} value={item.id}> {item.sigla} </option>
              :
              null
            ))}            


          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Cidade</Form.Label>
          <Form.Select 
            required
            onClick= {e => updateSelect()}
            onChange={e => props.setCidadeId(parseInt(e.target.value))} >

            {estadoId  == 0 ?                      
              <option value="">selecione</option>

            : 
                        
            <option key={props.cidadeId} value={props.cidadeId}>
              {/* { cidades.find(e => e.id == props.cidadeId)?.nome } */}
              { props.estados.find( estado => estado.id == estadoId )
              ?.cidade.find(_cid => _cid.id == props.cidadeId)?.nome }
            </option>
            
            }

            {
                !props.estadoSelected && cidades.length == 0 ?                      
                <option value="">...</option>

                :
                cidades.map(item => (
                  props.cidadeId != item.id ?
                  <option key={item.id} value={item.id}> {item.nome} </option>
                :
                  null
                ))

            }
  
            {/* { cidades.length == 0 ?
              <option>...</option> :                
              cidades.map(item => (
                props.cidadeId != item.id ?
                  <option key={item.id} value={item.id}> {item.nome} </option>
                :
                  null
              ))              
            } */}
            
          </Form.Select>
        </Form.Group>          
        
      </Row>
    </>
  );

}

export default FormGroupEndereco;