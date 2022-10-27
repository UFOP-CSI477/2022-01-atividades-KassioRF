import { CategoriaModel } from "./Categoria";
import { UserDataModel } from "./UserData";


export interface ImageModel {  
  dataURL?: string;
};
export interface AnuncioModel {
  uid?: string;
  user: UserDataModel;
  titulo: string;
  autor: string;
  editora: string;
  idioma: string;
  descricao: string;
  preco: string;
  categorias?: CategoriaModel[];
  image?: ImageModel;

};
