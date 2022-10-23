import { Router } from "express";
import { CreateDistribuicao } from "../controller/distribuicoes/CreateDistribuicao";
import { GetAllDistribuicao } from "../controller/distribuicoes/GetAllDistribuicao";
import { GetByIdDistribuicao } from "../controller/distribuicoes/GetByIdDistribuicao";



const distribuicoesRouter = Router();

const createDistribuicao = new CreateDistribuicao();
const getAllDistribuicao = new GetAllDistribuicao();
const getByIdDistribuicao = new GetByIdDistribuicao();

distribuicoesRouter.post('/distribuicao', createDistribuicao.handle);
distribuicoesRouter.get('/distribuicao', getAllDistribuicao.handle);
distribuicoesRouter.get('/distribuicao/:id', getByIdDistribuicao.handle);

export { distribuicoesRouter };