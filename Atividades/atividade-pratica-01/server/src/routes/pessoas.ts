import { Router } from "express";
import { CreatePessoa } from "../controller/pessoas/CreatePessoa";
import { DeletePessoa } from "../controller/pessoas/DeletePessoa";
import { GetAllPessoa } from "../controller/pessoas/GetAllPessoa";
import { GetByDocumentoPessoa } from "../controller/pessoas/GetByDocumentoPessoa";
import { GetByIdPessoa } from "../controller/pessoas/GetByIdPessoa";
import { UpdatePessoa } from "../controller/pessoas/UpdatePessoa";

const pessoasRouter = Router();

const createPessoa = new CreatePessoa();
const getAllPessoa = new GetAllPessoa();
const getByIdPessoa = new GetByIdPessoa();
const getByDocumentoPessoa = new GetByDocumentoPessoa();
const updatePessoa = new UpdatePessoa();
const deletePessoa = new DeletePessoa();

pessoasRouter.post('/pessoas', createPessoa.handle);
pessoasRouter.get('/pessoas', getAllPessoa.handle);
pessoasRouter.get('/pessoas/:id', getByIdPessoa.handle);
pessoasRouter.get('/pessoas/doc/:documento', getByDocumentoPessoa.handle);
pessoasRouter.put('/pessoas/:id', updatePessoa.handle);
pessoasRouter.delete('/pessoas/:id', deletePessoa.handle);

export { pessoasRouter };