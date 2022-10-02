import { Router } from "express";

import { CreateLocalColeta } from "../controller/locaisColeta/CreateLocalColeta";
import { GetAllLocalColeta } from "../controller/locaisColeta/GetAllLocalColeta";
import { GetByIdLocalColeta } from "../controller/locaisColeta/GetByIdLocalColeta";
import { UpdateLocalColeta } from "../controller/locaisColeta/UpdateLocalColeta";
import { DeleteLocalColeta } from "../controller/locaisColeta/DeleteLocalColeta";

const localColetaRouter = Router();

const createLocalColeta = new CreateLocalColeta();
const getAllLocalColeta = new GetAllLocalColeta();
const getByIdLocalColeta = new GetByIdLocalColeta();
const updateLocalColeta = new UpdateLocalColeta();
const deleteLocalColeta = new DeleteLocalColeta();


localColetaRouter.post('/localColeta', createLocalColeta.handle);
localColetaRouter.get('/localColeta', getAllLocalColeta.handle);
localColetaRouter.get('/localColeta/:id', getByIdLocalColeta.handle);
localColetaRouter.put('/localColeta/:id', updateLocalColeta.handle);
localColetaRouter.delete('/localColeta/:id', deleteLocalColeta.handle);

export { localColetaRouter };