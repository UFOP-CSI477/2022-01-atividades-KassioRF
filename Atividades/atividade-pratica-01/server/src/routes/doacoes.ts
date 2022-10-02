import { Router } from "express";
import { CreateDoacao } from "../controller/doacoes/CreateDoacao";
import { DeleteDoacao } from "../controller/doacoes/DeleteDoacao";
import { GetAllDoacao } from "../controller/doacoes/GetAllDoacao";
import { GetByIdDoacao } from "../controller/doacoes/GetByIdDoacao";
import { UpdateDoacao } from "../controller/doacoes/UpdateDoacao";


const doacoesRouter = Router();

const createDoacao = new CreateDoacao();
const getAllDoacao = new GetAllDoacao();
const getByIdDoacao = new GetByIdDoacao();
const updateDoacao = new UpdateDoacao();
const deleteDoacao = new DeleteDoacao();

doacoesRouter.post('/doacao', createDoacao.handle);
doacoesRouter.get('/doacao', getAllDoacao.handle);
doacoesRouter.get('/doacao/:id', getByIdDoacao.handle);
doacoesRouter.put('/doacao/:id', updateDoacao.handle);
doacoesRouter.delete('/doacao/:id', deleteDoacao.handle);

export { doacoesRouter }; 