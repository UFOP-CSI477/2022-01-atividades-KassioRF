"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllCidade = void 0;
const client_1 = require("../../database/client");
class GetAllCidade {
    async handle(req, res) {
        const cidades = await client_1.prismaClient.cidade.findMany({
            include: {
                estado: true
            }
        });
        return res.json(cidades);
    }
}
exports.GetAllCidade = GetAllCidade;
//# sourceMappingURL=GetAllCidade.js.map