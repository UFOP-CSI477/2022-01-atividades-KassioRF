export interface EnderecoModel {
  rua: string;
  numero: string;
  complemento: string;
  cidade_id: number;
  cidade: CidadeModel;
}

export interface EstadoModel {
  id?: number;
  nome: string;
  sigla: string;
  created_at?: string;
  cidade: CidadeModel[];
}

export interface CidadeModel {
  id?: number;
  nome: string;
  estado_id: number;
  estado: EstadoModel;
  created_at?: string;
}