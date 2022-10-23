import { ProdutoModel } from "./ProdutoModel";
import { UnidadeModel } from "./UnidadeModel";



export interface DistribuicaoModel {
  id?: number;
  produto: ProdutoModel;
  unidade: UnidadeModel;
  created_at?: string;
  updated_at?: string;
}