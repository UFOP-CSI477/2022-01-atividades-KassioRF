import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';


import { AnuncioModel } from '../../models/Anuncio';
import { getDatabase, ref, onValue} from "firebase/database";
import { database } from "../../services/firebase";
import { Item } from 'react-bootstrap/lib/Breadcrumb';
import { Badge, Col, Row } from 'react-bootstrap';


import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const DetalhesLivro = () => {

  const navigate = useNavigate();
  const { uid } = useParams();

  const [anuncio, setAnuncio] = useState<AnuncioModel>();

  useEffect(() => {
    const db = getDatabase();
    const _anuncio = ref(db, `anuncios/${uid}`);
    onValue(_anuncio, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        var _item = data as AnuncioModel;
        _item.uid = uid;
        setAnuncio(_item);
      }
    });

  }, [uid]);


  return (
    <>

    <Card className="container App">
      <Row>
        <Col md={4} className="book-page-img-book">
          <img className="img-fluid rounded-start book-page-image"  src={anuncio?.image ? anuncio?.image.dataURL : " " } alt={anuncio?.titulo} />
        </Col>

        <Col md={8}>
          <Card.Body  className="row card-book-info">

            <Card.Title as={"h4"}>{anuncio?.titulo}</Card.Title>
            <span className="text-muted"> anunciado por: @{anuncio?.user.displayName} </span>


            <p> {anuncio?.descricao} </p>

            <div style={{opacity: .5}}>
              {anuncio?.categorias?.map((item) => (              
                <Badge className="categoria-badge" key={item.value} bg="secondary">{item.label}</Badge>
              ))}          
            </div>
            
            <div className="row justify-center book-price">
              <p className=""> <strong> R$ {anuncio?.preco} </strong> </p>
            </div>



            <div className="book-page-table element row">
              <div className='col-md-4'>
                <table className="book-page-table-info ">
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
              <div className="add-cart-element col-md-6">
                <p className="">Entre em contato com o vendedor: </p>               
                <p> <span > <MailOutlineIcon />  {anuncio?.user?.email} </span> <span style={{paddingLeft: "1em"}}> <WhatsAppIcon /> {anuncio?.user?.telefone} </span></p>
              </div>

            </div>

          </Card.Body>


        </Col>
      </Row>
    </Card>
    
    </>
  );

}

export default DetalhesLivro;