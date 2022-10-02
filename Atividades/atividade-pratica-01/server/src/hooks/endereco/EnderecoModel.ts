import { CidadeModel } from "./CidadeModel";

export interface EnderecoModel {
  rua: string;
  numero: string;
  complemento: string;
  cidade: CidadeModel;

}