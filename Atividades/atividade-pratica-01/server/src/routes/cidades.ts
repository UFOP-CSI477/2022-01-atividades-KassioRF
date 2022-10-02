import { Router } from "express";
import { GetAllCidade } from "../controller/cidade/GetAllCidade";
import { GetByIdCidade } from "../controller/cidade/GetByIdCidade";

const cidadesRouter = Router();

const getAllCidade = new GetAllCidade();
const getByIdCidade = new GetByIdCidade();

cidadesRouter.get('/cidades', getAllCidade.handle);
cidadesRouter.get('/cidades/:id', getByIdCidade.handle);

export { cidadesRouter }