import { Router } from "express";
import { GetAllTipoSanguineo } from "../controller/tiposSanguineos/GetAllTipoSanguineo";

const tipoSanguineoRouter = Router();

const getAllTipoSanguineo = new GetAllTipoSanguineo();

tipoSanguineoRouter.get('/tipoSanguineo', getAllTipoSanguineo.handle);


export { tipoSanguineoRouter };