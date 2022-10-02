"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetByIdEstado = void 0;
const client_1 = require("../../database/client");
class GetByIdEstado {
    async handle(req, res) {
        const { id } = req.params;
        const estado = await client_1.prismaClient.estado.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        return res.json(estado);
    }
}
exports.GetByIdEstado = GetByIdEstado;
//# sourceMappingURL=GetByIdEstado.js.map