/**
 * Insere no banco de dados os registros das cidades
 * disponibilizados pela API do IBGE
 * fonte: https://servicodados.ibge.gov.br/api/v1/
 * 
*/

import { prismaClient } from "../src/database/client";
import { EstadoModel, CidadeModel } from "../src/hooks/EnderecoModel";
import axios from "axios";
import { prisma, Prisma } from "@prisma/client";


const apiIBGE = axios.create({
  baseURL: "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
});


// recupera estados no bd
// Executa paenas para povoar o bd
// prismaClient.estado.findMany()
//   .then(estados => {
//     for (const estado of estados) {
//       // carrega cidades
//       loadCidades(estado.sigla, estado.id);
//     }
//   });




const loadCidades = (uf: string, estado_id: number) => {
  apiIBGE.get<CidadeModel[]>(`/${uf}/municipios`).then(async res => {
    // insere as cidades
    insertCidades(estado_id, res.data);
    
  });

}
function insertCidades(estado_id: number , cidades: CidadeModel[]) {
  cidades.map(async c => {
    try{
      await prismaClient.cidade.create({
        data: {
          nome: c.nome,
          estado: {
            connect: {
              id: estado_id
            }
          }
        }
  
      });

    }
    catch {

    }

  });
}


