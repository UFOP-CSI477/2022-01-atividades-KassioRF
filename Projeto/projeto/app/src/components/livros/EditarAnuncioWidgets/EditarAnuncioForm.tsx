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


import { getDatabase, ref, set, push, onValue, update } from "firebase/database";
import { database, firebaseApp } from "../../../services/firebase";
import { useNavigate } from "react-router-dom";
import _Spinner from "../../widgets/spinner";
import { AnuncioModel, ImageModel } from "../../../models/Anuncio";

import { Link } from "react-router-dom";
// Format using prefix, groupSeparator and decimalSeparator
const formattedValue = formatValue({
  value: '123456',
  groupSeparator: ',',
  decimalSeparator: '.',
  prefix: '$',
});

interface EditAnuncioProps {
  uid?: string
}

const CadastrarLivro = (props: EditAnuncioProps ) => {
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
  // const [images, setImages] = useState([]);
  const [images, setImages] = useState<any[]>([]);
  
  const [telefone, setTelefone] = useState([]);
  



  useEffect(() => {
    const uid = user?.uid
    if (uid) {
      const _db = getDatabase(firebaseApp());
      const currtelefone = ref(_db, `users/${uid}`);
      onValue(currtelefone, (snapshot) => {
        setTelefone(snapshot.val()?.telefone);
      });
    }
  }, []);

  useEffect(() => {
    if (props.uid) {
      const _db = getDatabase();
      const _anuncio = ref(_db, `anuncios/${props.uid}`);
      onValue(_anuncio, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          var _item = data as AnuncioModel;
          _item.uid = props.uid;       
          setTitulo(_item?.titulo);
          setAutor(_item?.autor);
          setEditora(_item?.editora);
          setIdioma(_item?.idioma);
          setDescricao(_item?.descricao);
          setPreco(_item?.preco);          
          setSelectedCategorias(_item?.categorias as CategoriaModel[]);
          setImages([_item.image]);          
        }
      });
      console.log('useEffect');
    }

  }, [props.uid]);





  const navigate = useNavigate(); 
  //castrar livro
  const handleUpdateAnuncio = async (e: React.FormEvent<HTMLFormElement>) => {
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
    
    
    // Referencia: 
    // FIREBASE: Trabalhar com listas de dados  Web
    // https://firebase.google.com/docs/database/web/read-and-write      
    
    setLoading(true);
    await update(ref(db, `anuncios/${props.uid}`), {
      user: data.user,
      titulo: data.titulo,
      autor: data.autor,
      editora: data.editora,
      idioma: data.idioma,
      descricao: data.descricao,
      preco: data.preco,
      categorias: data.categorias,
      image: data.image,
    })
      .then(() => {
      setLoading(false);
      alert('Anuncio Atualizado com sucesso!');        
      navigate('/');

    })
    .catch((error) => {
        console.log(error);
      alert(`Erro ao atualizar anuncio: \n ${error}`);

    }).finally(() => setLoading(false));
      
  }

  return(
    <>
    { loading ? <_Spinner /> : 

      <Form onSubmit={handleUpdateAnuncio} className="container">
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
                <Link to={"/perfil/anuncios"}>
                  Voltar
                </Link>          
              </Col>
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
