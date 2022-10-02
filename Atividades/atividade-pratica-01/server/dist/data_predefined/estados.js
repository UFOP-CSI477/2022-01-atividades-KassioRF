"use strict";
/**
 * Insere no banco de dados os registros dos Estados
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
// EndPoint api
const apiIBGE = axios_1.default.create({
    baseURL: "https://servicodados.ibge.gov.br/api/v1/localidades"
});
// requisição do serviço
const loadEstados = () => {
    apiIBGE.get('/estados').then(res => {
        insertEstados(res.data);
    });
};
// inserção dos dados no banco de dados
function insertEstados(estados) {
    estados.map(async (e) => {
        await client_1.prismaClient.estado.create({
            data: {
                nome: e.nome,
                sigla: e.sigla
            }
        });
    });
}
// necessário executar apenas para povoar o banco de dados
//loadEstados();
//# sourceMappingURL=estados.js.map