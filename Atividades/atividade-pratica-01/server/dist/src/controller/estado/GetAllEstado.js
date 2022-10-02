"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllEstado = void 0;
const client_1 = require("../../database/client");
class GetAllEstado {
    async handle(req, res) {
        const estados = await client_1.prismaClient.estado.findMany();
        return res.json(estados);
    }
}
exports.GetAllEstado = GetAllEstado;
//# sourceMappingURL=GetAllEstado.js.map