import React, {useEffect, useState} from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link as MuiLink }from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';

import { useNavigate} from "react-router-dom";
// Firebase
import { getAuth, createUserWithEmailAndPassword, setPersistence, browserLocalPersistence, updateProfile } from "firebase/auth";
import InputMask from 'react-input-mask';
import { getDatabase, set, ref } from "firebase/database";
import { firebaseApp } from "../../services/firebase";


const theme = createTheme();
function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {' '}
      <MuiLink href="https://github.com/KassioRF" target="_blank">
        
      </MuiLink>{' '}
      {''}
      {''}
    </Typography>
  );
}

const Register = () => {
  const navigate = useNavigate();
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ userName, setUserName ] = useState('');
  const [ telefone, setTelefone ] = useState('');
  


  // Cadastrar Usuario
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    console.log({
      userName: userName,
      email: email,
      password: password
    });

    const auth = getAuth();
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // New sign-in will be persisted with session persistence.
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            updateProfile(user, {
              displayName: userName
            });

            
            const db = getDatabase(firebaseApp());
            //const userProfile = ref(db, `users/${auth.currentUser.uid}`);
            set(ref(db, `users/${userCredential.user.uid}`), { telefone })
              .then(() => {})
              .catch((error) => {
                console.log(error);
              });                
          

            console.log(user);
            // redirect signed in (home: alterar navbar como logado)
              
            alert('Cadastro realizado ^^');
            navigate('/');
            //window.location.reload();

          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);

          });
      })      
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`code:${errorCode}, message: ${errorMessage}`);
      });

  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" className="App">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Cadastrar
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="userName"
                  required
                  fullWidth
                  id="userName"
                  label="Apelido"                  
                  autoFocus
                  value={userName}
                  onChange={e => setUserName(e.target.value)}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}

                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid className="spaceElements">
              <InputMask
                value={telefone ? telefone : ' ' }
                onChange={e => setTelefone(e.target.value)}
                mask="(99) 9 9999 9999">
                <TextField required fullWidth label="Telefone"/>
              </InputMask>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">
                  Já possiu cadastro? Entre
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

export default Register