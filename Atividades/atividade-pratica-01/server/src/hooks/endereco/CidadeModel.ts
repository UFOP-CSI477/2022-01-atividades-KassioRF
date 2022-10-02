import { EstadoModel } from "./EstadoModel";

export interface CidadeModel {
  id: number;
  nome: string;
  estado: EstadoModel;
}