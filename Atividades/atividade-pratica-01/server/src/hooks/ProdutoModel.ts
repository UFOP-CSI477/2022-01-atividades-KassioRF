import { DoacaoModel } from "./DoacaoModel";

export interface ProdutoModel {
  id?: number;
  etiqueta: string;
  validade: string;
  doacao: DoacaoModel;
  created_at?: string;
  updated_at?: string;

}