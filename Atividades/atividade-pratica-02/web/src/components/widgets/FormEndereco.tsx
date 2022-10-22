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

  setRua: React.Dispatch<React.SetStateAction<any>>;
  setNumero: React.Dispatch<React.SetStateAction<any>>;
  setComplemento: React.Dispatch<React.SetStateAction<any>>;
  setCidadeId: React.Dispatch<React.SetStateAction<any>>;
  
}

const FormGroupEndereco = (props: FormEnderecoProps) => {
  
  const [ cidades, setCidades ] = useState<CidadeModel[]>([]);
  // Preenche o select das cidades
  const fillCidades = (estadoId: number | undefined) => {
    if (estadoId) {
      const _cidades = props.estados.find(estado => estado.id == estadoId)?.cidade;
      if (_cidades) {
        setCidades(_cidades);
      }
    } else {
      setCidades([]);
    }

  }

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
            <option value="">selecione</option>
            { props.estados.map(item => (
              <option key={item.id} value={item.id}> {item.sigla} </option>
            ))}

          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Cidade</Form.Label>
          <Form.Select 
            required
            onChange={e => props.setCidadeId(parseInt(e.target.value))} >

            <option value="">selecione</option>
            { cidades.length == 0 ?
              <option>...</option> :                
              cidades.map(item => (
                <option key={item.id} value={item.id}> {item.nome} </option>
              ))              
            }
            
          </Form.Select>
        </Form.Group>          
        
      </Row>
    </>
  );

}

export default FormGroupEndereco;