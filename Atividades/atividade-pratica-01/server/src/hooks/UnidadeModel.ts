import { EnderecoModel } from "./EnderecoModel";

export interface UnidadeModel {
  id?: number;
  nome: string;
  endereco: EnderecoModel;
  created_at?: string;
  updated_at?: string;
}