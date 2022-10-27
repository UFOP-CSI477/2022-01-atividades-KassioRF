
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import {TextField, Button} from '@mui/material';

import InputMask from 'react-input-mask';
import {Form, Col, Row } from "react-bootstrap";
import { _Center, ProfileView } from "./../../style";
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, updateProfile, updateEmail, updatePassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, push, set, onValue } from "firebase/database";
import { firebaseApp } from "./../../services/firebase";

const EditarPerfilForm = () => {  
  // loaded apiData
  const [ userName, setUserName ] = useState<string | null | undefined>('');
  const [ email, setEmail ] = useState<string | null | undefined>('');
  const [ telefone, setTelefone ] = useState<string | null | undefined>('');
  const [ password, setPassword ] = useState('');

  //const [user, _loading, error] = useAuthState(getAuth());
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const db = getDatabase(firebaseApp());
    setUserName(auth?.currentUser?.displayName);
    setEmail(auth?.currentUser?.email);
    setTelefone(auth?.currentUser?.phoneNumber);
    const uid = auth?.currentUser?.uid
    if (uid) {
      const currtelefone = ref(db, `users/${uid}`);
      onValue(currtelefone, (snapshot) => {
        setTelefone(snapshot.val()?.telefone);
      });
    }
  
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>)  => {
    console.log('submit!');
    event.preventDefault();

    var opStatus = true;
    if (userName && email && telefone && password) {
      const auth = getAuth();
      if (auth.currentUser) {
        // display name
        await updateProfile(auth.currentUser, {displayName: userName})
          .then(() => {})
          .catch((error) => {
            // An error occurred
            console.log(error);
            opStatus = false;
          });
        // email
        await updateEmail(auth.currentUser, email)
          .then(() => {})
          .catch((error) => {
          // An error occurred
            console.log(error);
            opStatus = false;
          });
        // password
        await updatePassword(auth.currentUser, password)
          .then(() => {})
          .catch((error) => {
            // An error ocurred
            console.log(error);
            opStatus = false;
          });
        
          //phone
        const db = getDatabase(firebaseApp());
        //const userProfile = ref(db, `users/${auth.currentUser.uid}`);
        await set(ref(db, `users/${auth.currentUser.uid}`), { telefone })
          .then(() => {})
          .catch((error) => {
            console.log(error);
            opStatus = false;
          });
        
        if(opStatus) {
          alert('Perfil Atualizado ^^');
        }else {
          alert('Ops! algo deu errado =/. Tente novamente');
        }

      }else {
        alert('Sessão expirada Faça login novamente')
  
      }

    }
  }


  return (    
    <Form onSubmit={handleSubmit}>
      <h5>Editar perfil form</h5> 

        <Col className="spaceElements">
          <TextField
            autoComplete="given-name"
            name="userName"
            required
            fullWidth
            id="userName"
            label="Apelido"                  
            autoFocus
            value={userName ? userName : ''}
            onChange={e => setUserName(e.target.value)}
            />
        </Col>
        <Col className="spaceElements">
          <TextField
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            value={email ? email : ''}
            onChange={e => setEmail(e.target.value)}

            />
        </Col>
        <Col className="spaceElements">
          <InputMask
            value={telefone ? telefone : ' ' }
            onChange={e => setTelefone(e.target.value)}
            mask="(99) 9 9999 9999">
            <TextField required fullWidth label="Telefone"/>
          </InputMask>
        </Col>
        <Col className="spaceElements">
          <TextField
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            onChange={e => setPassword(e.target.value)}
            
          />
        </Col>

      <Col >
        <Button 
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Atualizar
        </Button>

      </Col>

    </Form>



  );
}

export default EditarPerfilForm;
