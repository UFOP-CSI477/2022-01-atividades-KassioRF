"use strict";
/**
 * Insere no banco de dados os registros das cidades
 * disponibilizados pela API do IBGE
 * fonte: https://servicodados.ibge.gov.br/api/v1/
 *
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../src/database/client");
const axios_1 = __importDefault(require("axios"));
const apiIBGE = axios_1.default.create({
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
const loadCidades = (uf, estado_id) => {
    apiIBGE.get(`/${uf}/municipios`).then(async (res) => {
        // insere as cidades
        insertCidades(estado_id, res.data);
    });
};
function insertCidades(estado_id, cidades) {
    cidades.map(async (c) => {
        try {
            await client_1.prismaClient.cidade.create({
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
        catch (_a) {
        }
    });
}
//# sourceMappingURL=cidades.js.map