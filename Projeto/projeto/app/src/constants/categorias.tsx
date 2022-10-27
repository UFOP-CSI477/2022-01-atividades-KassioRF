import { CategoriaModel } from "../models/Categoria";


export enum categoriasConstants {  
  SUSPENSE = 'Suspense',
  FICCAO  = 'Ficção científica',
  POLICIAL = 'Policial',
  DISTOPIA = 'Distopia',
  UTOPIA = 'Utopia',
  POESIA = 'Poesia',
  INFANTIL = 'Infantil',
  HUMOR = 'Humor',
  GASTRONOMIA = 'Gastronomia',
  ROMANCE = 'Romance',
  ACAO = 'Ação',
  AVENTURA = 'Aventura',
  LGBTQI = 'LGBTQ+',
  BIOGRAFIA = 'Biografia',
  AUTOAJUDA = 'Auto ajuda'
};

export const categoriasOptions: readonly CategoriaModel[]  = [
  { value: categoriasConstants.ACAO, label: categoriasConstants.ACAO },
  { value: categoriasConstants.FICCAO, label: categoriasConstants.FICCAO },
  { value: categoriasConstants.POLICIAL, label: categoriasConstants.POLICIAL },
  { value: categoriasConstants.DISTOPIA, label: categoriasConstants.DISTOPIA },
  { value: categoriasConstants.UTOPIA, label: categoriasConstants.UTOPIA },
  { value: categoriasConstants.POESIA, label: categoriasConstants.POESIA },
  { value: categoriasConstants.INFANTIL, label: categoriasConstants.INFANTIL },
  { value: categoriasConstants.HUMOR, label: categoriasConstants.HUMOR },
  { value: categoriasConstants.GASTRONOMIA, label: categoriasConstants.GASTRONOMIA },
  { value: categoriasConstants.ACAO, label: categoriasConstants.ACAO },
  { value: categoriasConstants.AVENTURA, label: categoriasConstants.AVENTURA },
  { value: categoriasConstants.LGBTQI, label: categoriasConstants.LGBTQI },
  { value: categoriasConstants.BIOGRAFIA, label: categoriasConstants.BIOGRAFIA },
  { value: categoriasConstants.AUTOAJUDA, label: categoriasConstants.AUTOAJUDA },

]


