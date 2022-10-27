import { useState, useEffect } from "react";
import { CategoriaModel } from "../../../models/Categoria";
import SelectCategoria from "./SelectCategoria";
import { Button, Form } from "react-bootstrap";


import { formatValue } from 'react-currency-input-field';

import InputCurrency from "./inputCurrency";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { UploadImg } from "./UploadImage";
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from "firebase/auth";


import { getDatabase, ref, set, push, onValue } from "firebase/database";
import { firebaseApp } from "../../../services/firebase";
import { useNavigate } from "react-router-dom";
import _Spinner from "../../widgets/spinner";


// Format using prefix, groupSeparator and decimalSeparator
const formattedValue = formatValue({
  value: '123456',
  groupSeparator: ',',
  decimalSeparator: '.',
  prefix: '$',
});

const CadastrarLivro = () => {
  const [loading, setLoading ] = useState(false); // Controla a exibição do Spinnner
  const [user, _loading, error] = useAuthState(getAuth());
  //Atributos
  const [ titulo, setTitulo ] = useState('');
  const [ autor, setAutor ] = useState('');
  const [ editora, setEditora ] = useState('');
  const [ idioma, setIdioma] = useState('');
  const [ descricao, setDescricao] = useState('');
  const [ preco, setPreco ] = useState('');
  const [selectedCategorias, setSelectedCategorias] = useState<CategoriaModel[]>([]);
  
  
  const [ categorias, setCategorias] = useState<string[]>([]); // categorias predefinidas
  const [images, setImages] = useState([]);
  
  const [telefone, setTelefone] = useState([]);
  
  useEffect(() => {
    const uid = user?.uid
    if (uid) {
      const db = getDatabase(firebaseApp());
      const currtelefone = ref(db, `users/${uid}`);
      onValue(currtelefone, (snapshot) => {
        setTelefone(snapshot.val()?.telefone);
      });
    }
  });


  const navigate = useNavigate(); 
  //castrar livro
  const handleCadastrarLivro = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const db = getDatabase(firebaseApp());



    const data = {  
      user: {
        uid: user?.uid,
        displayName: user?.displayName,
        email: user?.email,
        telefone: telefone,
      },    
      titulo,
      autor,
      editora,
      idioma,
      descricao,
      preco,
      categorias: selectedCategorias,
      image: images.length > 0 ? images[0] : "",
      created_at: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`      
    }
    
    console.log(data);
    
    setLoading(true);
    
    // Referencia: 
    // FIREBASE: Trabalhar com listas de dados  Web
    // https://firebase.google.com/docs/database/web/read-and-write      
    const anunciosRef = ref(db, 'anuncios');
    const newAnunciosRef = push(anunciosRef);

    await set(newAnunciosRef, data)
      .then(() => {
        setLoading(false);
        alert('Anuncio cadastrado com sucesso!');        
        navigate('/');
      
      })
      .catch((error) => {
          console.log(error);
        alert(`Erro ao cadastrar anuncio: \n ${error}`);
      
      }).finally(() => setLoading(false));
    


  }

  return(
    <>
    { loading ? <_Spinner /> : 

      <Form onSubmit={handleCadastrarLivro} className="container">
        <Row className="justify-center">
          <Col md={5}>
            <UploadImg                     
              images={images} 
              setImages={setImages} 
            />        
          
          </Col>
          
          <Col md={5}>                
            <Row className="justify-center">
              <Col>
              <Form.Label>Título</Form.Label>
                <Form.Control 
                  type="text"
                  name="Titulo"
                  value={titulo}
                  onChange={e => setTitulo(e.target.value)}
                  required
                  />
              </Col>
              <Col>
                <Form.Label>Autor</Form.Label>
                <Form.Control 
                  type="text"
                  name="Autor"
                  value={autor}
                  onChange={e => setAutor(e.target.value)}
                  required
                  />
              </Col>
            </Row>  
            
              
            <Row className="justify-center">
              <Col>
              <Form.Label>Editora</Form.Label>
                <Form.Control 
                  type="text"
                  name="editora"
                  value={editora}
                  onChange={e => setEditora(e.target.value)}
                  required
                  />
              </Col>

              <Col>
                <Form.Label>Idioma</Form.Label>
                <Form.Control 
                  type="text"
                  name="Idioma"
                  value={idioma}
                  onChange={e => setIdioma(e.target.value)}
                  required
                  />        
              </Col>      
            </Row>        
            
            <Row className="justify-center"> 
              <Col>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Descrição</Form.Label>
                  <Form.Control 
                    value={descricao}
                    onChange={e => setDescricao(e.target.value)}
                    as="textarea" 
                    required
                    rows={3} 
                  />
                </Form.Group>        
              </Col>
            </Row>

            <Row className="justify-center">
              <Col>
                <Form.Label>Categorias</Form.Label>
                <SelectCategoria 
                  selectedCategorias={selectedCategorias}
                  setSelectedCategorias={setSelectedCategorias}
                  />
              </Col>
              <Col>
                <Form.Label>Preço</Form.Label>
                <InputCurrency 
                  id="preco"
                  name="preco"
                  mask="currency"
                  prefix=""
                  preco={preco}
                  setPreco={setPreco}
                  required
                  />        
              </Col>
            </Row>    
            
            <Row className="justify-center" style={{marginTop: "3rem"}}>
              <Col md={4}>
                <Button variant="primary" type="submit">
                  Cadastrar
                </Button>          
              </Col>              
            </Row>        
          </Col>


        </Row>     
      </Form>

      }

    </>
  );
}

export default CadastrarLivro;
{/* <Image width={300} height={400} src="https://cdn.culturagenial.com/imagens/caixa-de-passaros-0-cke.jpg?auto_optimize=low"></Image> */}
