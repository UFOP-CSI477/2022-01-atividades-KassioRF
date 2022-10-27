import { useState, useEffect } from "react";
import { AnuncioModel } from "../../models/Anuncio";
import _Spinner from "../widgets/spinner";

import { ref, onValue, getDatabase, remove } from "firebase/database";
import { database } from "../../services/firebase";
import { getAuth } from "firebase/auth";

import { Item } from 'react-bootstrap/lib/Breadcrumb';
import { Badge, Col, Row, Card, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";


import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { _Center } from "../../style";

import { useNavigate } from "react-router-dom";

const MeusAnuncios = ( ) => {
  
  const [ loading, setLoading ] = useState(false);
  const [anuncios, setAnuncios] = useState<AnuncioModel[]>([]);
  const auth = getAuth();
  
  
  const navigate = useNavigate();

  useEffect(() => { loadAnuncios() },[])  

  const loadAnuncios = () => {
    const dbAnuncios = ref(database, 'anuncios');
    const _anuncios: AnuncioModel[] = [];        
    onValue(dbAnuncios, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const uid = childSnapshot.key;
        const childData = childSnapshot.val();
        const _anuncio = childData as AnuncioModel;
      
        if(childData.user.uid == auth?.currentUser?.uid) {
          _anuncio.uid = uid as string;        
          _anuncios.push(childData as AnuncioModel);

        }
      });

      setAnuncios(_anuncios);
    
    }, {
      onlyOnce: true
    });
  
  }   
  
  const handleDeleteAnuncio = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!window.confirm("Confirma exclusão do anúncio?")) {
      return;
    }
    const uid = e.currentTarget.value;
    const db = getDatabase();
    const _anuncio = ref(db, `anuncios/${uid}`);
    remove(_anuncio)
      .then(() => {
        console.log("location removed");
        loadAnuncios();
        alert('Anúncio removido');
      })
      .catch((error) => {
        console.log(error);
        alert('Ops.. algo deu errado')
      
      });
  }

  return(
    <>
    <h5> Meus Anúncios </h5>

      { anuncios.length == 0 ?
          <Col>
            <h6> Sem anúncios cadastrados </h6>
          </Col>
        :
        
        anuncios.map((anuncio) => (
        
        <Card key={anuncio?.uid} className="container card-small-meus-anuncios">
          <Row>
            <Col md={3}>
              <img className="img-fluid rounded-start card-book-small-image"  src={anuncio?.image ? anuncio?.image.dataURL : " " } alt={anuncio?.titulo} />
            </Col>

            <Col md={7}>
              <Card.Body  className="row card-book-info card-book-info-small">
                <Card.Title as={"h6"}>{anuncio?.titulo}</Card.Title>
                <span className="text-muted"> anunciado por: @{anuncio?.user.displayName} </span>
                {/* <p>
                  {anuncio?.descricao}
                </p> */}

                <div style={{opacity: .5}}>
                  {anuncio?.categorias?.map((item) => (              
                    <Badge className="categoria-badge" key={item.value} bg="secondary">{item.label}</Badge>
                  ))}          
                </div>
                
                <p> R$: {anuncio?.preco}</p>

                <div className="add-cart-element">
                  {/* <p className="">Entre em contato com o vendedor: {anuncio?.user?.email}</p>  */}
                </div>


                <div className="book-page-table element col-md-8">
                  <table className="book-page-table-info book-page-table-small">
                    <tbody>                  
                      <tr>
                        <td><strong> Autor: </strong></td>
                        <td>{anuncio?.autor}</td>
                      </tr>

                      <tr>
                        <td><strong> Editora: </strong></td>
                        <td> {anuncio?.editora} </td>
                      </tr>

                      <tr>
                        <td><strong> Idioma: </strong></td>
                        <td> {anuncio?.idioma} </td>
                      </tr>                  

                    </tbody>
                  </table>
                </div>

              </Card.Body>

            </Col>

              {/* <div className="card-book-small-actions col-md-6">
              </div>             */}
            <Col  md={2} className="card-book-small-actions">
                <Button value={anuncio?.uid} variant="link" onClick={e => handleDeleteAnuncio(e)}> <DeleteForeverIcon style={{color: "#e55039"}} /> remover </Button>
                <Button  variant="link" onClick={ _ => navigate(`/anuncio/editar/${anuncio?.uid}`)} > <ModeEditIcon /> editar </Button>
                <Button  variant="link" onClick={ _ => navigate(`/anuncio/${anuncio?.uid}`)} >  <VisibilityIcon />  </Button>
            </Col>

          </Row>
        </Card>
        
      ))

      }
    </>
  );
}

export default MeusAnuncios;