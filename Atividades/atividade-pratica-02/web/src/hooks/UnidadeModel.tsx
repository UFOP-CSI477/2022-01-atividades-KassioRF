import { DistribuicaoModel } from "./DistribuicaoModel";
import { EnderecoModel } from "./EnderecoModel";

export interface UnidadeModel {
  id?: number;
  nome: string;
  distribuicao: DistribuicaoModel[];
  endereco: EnderecoModel;
  created_at?: string;
  updated_at?: string;
}