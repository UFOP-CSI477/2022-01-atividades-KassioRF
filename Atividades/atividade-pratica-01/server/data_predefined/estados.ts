/**
 * Insere no banco de dados os registros dos Estados
 * disponibilizados pela API do IBGE
 * fonte: https://servicodados.ibge.gov.br/api/v1/
 * 
 */

import { prismaClient } from "../src/database/client";
import { EstadoModel } from "../src/hooks/EnderecoModel";
import axios from "axios";

// EndPoint api
const apiIBGE = axios.create({
  baseURL: "https://servicodados.ibge.gov.br/api/v1/localidades"
});

// requisição do serviço
const loadEstados = () => {
  apiIBGE.get<EstadoModel[]>('/estados').then( res => {
    insertEstados(res.data);
  });
}

// inserção dos dados no banco de dados
function insertEstados(estados: EstadoModel[]) {
  estados.map(async e => {
    await prismaClient.estado.create({
      data: {
        nome: e.nome,
        sigla: e.sigla
      }
    });
  });
}

// necessário executar apenas para povoar o banco de dados
//loadEstados();

