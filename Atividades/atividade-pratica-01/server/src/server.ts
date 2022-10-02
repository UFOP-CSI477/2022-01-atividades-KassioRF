import express from 'express';
import cors from 'cors';
import mainRouter from './routes/main';
import { tipoSanguineoRouter } from './routes/tipoSanguineo';
import { pessoasRouter } from './routes/pessoas';
import { estadosRouter } from './routes/estados'
import { cidadesRouter } from './routes/cidades';
import { localColetaRouter } from './routes/locaisColeta';
import { doacoesRouter } from './routes/doacoes';

// setup do server
const PORT = 4000;
const app = express();
app.use(express.json());
app.use(cors());


//rotas
app.use(mainRouter);
app.use(tipoSanguineoRouter);
app.use(pessoasRouter);
app.use(estadosRouter);
app.use(cidadesRouter);
app.use(localColetaRouter);
app.use(doacoesRouter);
// build server
app.listen(PORT, () => {
  console.log(`[SERVER] Server is running on port ${PORT}`);
});