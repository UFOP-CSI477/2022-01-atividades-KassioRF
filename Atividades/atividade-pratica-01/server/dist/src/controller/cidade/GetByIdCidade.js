"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetByIdCidade = void 0;
const client_1 = require("../../database/client");
class GetByIdCidade {
    async handle(req, res) {
        const { id } = req.params;
        const cidade = await client_1.prismaClient.cidade.findUnique({
            where: {
                id: parseInt(id)
            },
            include: {
                estado: true
            }
        });
        return res.json(cidade);
    }
}
exports.GetByIdCidade = GetByIdCidade;
//# sourceMappingURL=GetByIdCidade.js.map