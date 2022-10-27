import { useState, useEffect } from 'react';
import { Container } from "react-bootstrap";
import { getUser } from "../../services/userAuth";
import { useNavigate, useParams } from "react-router-dom";

import EditarAnuncioForm from './EditarAnuncioWidgets/EditarAnuncioForm';

const EditarAnuncio = () => {
  
  const navigate = useNavigate();
  
  const { uid } = useParams();


  return ( 
    <>    
      { !getUser() ? navigate('/login')  :   
        <Container className="App">
          <h5>Editar Anúncio</h5>
          <EditarAnuncioForm  
            uid={uid}          
          />
        </Container>
      }
    </>
  
  );
}

export default EditarAnuncio;