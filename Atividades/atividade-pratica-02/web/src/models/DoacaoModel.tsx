// Interface doacoes

import { LocalColetaModel } from "./LocalColetaModel";
import { PessoaModel } from "./PessoaModel";

export interface DoacaoModel {
  id?: number;
  pessoa: PessoaModel;
  local: LocalColetaModel;
  date: string;
  created_at?: string;
  updated_at?: string;

}