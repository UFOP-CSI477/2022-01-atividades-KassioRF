"use strict";
/**
 *
 * Script utilizado apenas para inserir os tipos sanguineos no banco de dados.
 * fonte utilizada para definir os tipos:
 * https://amigosdaoncologia.org.br/navegacaodepacientes/noticias/voce-sabe-qual-o-seu-tipo-de-sangue-e-o-fator-rh
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../src/database/client");
const Constants_1 = require("../src/hooks/Constants");
const _tiposSanguineos = [
    // A+
    { tipo: Constants_1.TIPOS.A, fator: Constants_1.FATOR.pos },
    // A-
    { tipo: Constants_1.TIPOS.A, fator: Constants_1.FATOR.neg },
    // B+
    { tipo: Constants_1.TIPOS.B, fator: Constants_1.FATOR.pos },
    // B-
    { tipo: Constants_1.TIPOS.B, fator: Constants_1.FATOR.neg },
    // AB+
    { tipo: Constants_1.TIPOS.AB, fator: Constants_1.FATOR.pos },
    // AB-
    { tipo: Constants_1.TIPOS.AB, fator: Constants_1.FATOR.neg },
    // O+
    { tipo: Constants_1.TIPOS.O, fator: Constants_1.FATOR.pos },
    // O-
    { tipo: Constants_1.TIPOS.O, fator: Constants_1.FATOR.neg },
];
// Insere os dados no banco de dados na tipoSanguineo
function runInserts() {
    _tiposSanguineos.map(async (item) => {
        const tipo = await client_1.prismaClient.tipoSanguineo.create({
            data: {
                tipo: item.tipo,
                fator: item.fator
            }
        });
    });
}
// necessário executar apenas para povoar o banco de dados
runInserts();
//# sourceMappingURL=tipos_sanguineos.js.map