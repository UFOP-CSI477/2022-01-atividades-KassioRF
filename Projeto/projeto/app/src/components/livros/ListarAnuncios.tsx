import { useState, useEffect } from "react";
import { AnuncioModel } from "../../models/Anuncio";
import _Spinner from "../widgets/spinner";

import { ref, onValue } from "firebase/database";
import { database } from "../../services/firebase";


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ListAnunciosArea } from "../../style";
import { Link } from "react-router-dom";


const ListarAnuncios = () => {  
  
  const [ loading, setLoading ] = useState(false);
  const [anuncios, setAnuncios] = useState<AnuncioModel[]>([]);


  useEffect(() => {
    setLoading(true);
    const dbAnuncios = ref(database, 'anuncios');
    const _anuncios: AnuncioModel[] = [];        
    onValue(dbAnuncios, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const uid = childSnapshot.key;
        const childData = childSnapshot.val();
        const _anuncio = childData as AnuncioModel;
        _anuncio.uid = uid as string;        
        // console.log(_anuncio);
        _anuncios.push(childData as AnuncioModel);
      });
      _anuncios.reverse();
      setAnuncios(_anuncios);
    
    }, {
      onlyOnce: true
    });
    setLoading(false);
  },[]);


  return (
    <ListAnunciosArea >
      { loading ? <_Spinner /> :
        anuncios.map((item) => (
         
          <Card key={item.uid} sx={{ maxWidth: 220, marginBottom: "2em", margin: "1em"}}>
            <CardMedia
              component="img"
              height="150"
              image={item.image ? item.image.dataURL : " "}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="body1" component="div">
                {item.titulo}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                @{item.user.displayName}                
              </Typography>
              <Typography variant="body2" color="text.primary">
                R${item.preco}                
              </Typography>
            </CardContent>
          
          <CardActions >
            <Link to={`/anuncio/${item.uid}`}> Detalhes </Link>
          </CardActions>
          </Card>
        ))
      }
    
    </ListAnunciosArea>

  );  
}

export default ListarAnuncios;

