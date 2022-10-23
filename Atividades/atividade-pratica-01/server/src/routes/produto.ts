import { Router } from "express";
import { CreateProduto } from "../controller/produtos/CreateProduto";
import { GetAllProduto } from "../controller/produtos/GetAllProduto";
import { GetByIdProduto } from "../controller/produtos/GetByIdProduto";


const produtosRouter = Router();

const createProduto = new CreateProduto();
const getAllProduto = new GetAllProduto();
const getByIdProduto = new GetByIdProduto();

produtosRouter.post('/produto', createProduto.handle);
produtosRouter.get('/produto', getAllProduto.handle);
produtosRouter.get('/produto/:id', getByIdProduto.handle);

export {produtosRouter}