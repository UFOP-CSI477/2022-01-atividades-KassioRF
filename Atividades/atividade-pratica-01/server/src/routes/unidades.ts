import { Router } from "express";
import { CreateUnidade } from "../controller/unidades/CreateUnidade";
import { GetAllUnidade } from "../controller/unidades/GetAllUnidade";
import { GetByIdUnidade } from "../controller/unidades/GetByIdUnidade";


const unidadesRouter = Router();

const createUnidade = new CreateUnidade();
const getAllUnidade = new GetAllUnidade();
const getByIdUnidade = new GetByIdUnidade();

unidadesRouter.post('/unidade', createUnidade.handle);
unidadesRouter.get('/unidade', getAllUnidade.handle);
unidadesRouter.get('/unidade/:id', getByIdUnidade.handle);

export {unidadesRouter};