// Interface locais_coleta

import { EnderecoModel } from "./EnderecoModel";


export interface LocalColetaModel {
  id?: number;
  nome: string;
  endereco: EnderecoModel;
  created_at?: string;
  updated_at?: string;

}