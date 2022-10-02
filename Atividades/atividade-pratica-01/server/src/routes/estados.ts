import { Router } from "express";
import { GetAllEstado } from "../controller/estado/GetAllEstado";
import { GetByIdEstado } from "../controller/estado/GetByIdEstado";


const estadosRouter = Router();

const getAllEstado = new GetAllEstado();
const getByIdEstado = new GetByIdEstado();

estadosRouter.get('/estados', getAllEstado.handle);
estadosRouter.get('/estados/:id', getByIdEstado.handle);

export { estadosRouter };