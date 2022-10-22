// Interface pessoas

import { EnderecoModel } from "./EnderecoModel";
import { TipoSanguineoModel } from "./TipoSanguineoModel";

export interface PessoaModel {
  id?: number;
  nome: string;
  endereco: EnderecoModel;
  document: string;
  tipo: TipoSanguineoModel;
  created_at?: string,
  updated_at?: string;

}