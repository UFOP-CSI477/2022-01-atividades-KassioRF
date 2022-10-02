"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllTipoSanguineo = void 0;
const client_1 = require("../../database/client");
class GetAllTipoSanguineo {
    async handle(req, res) {
        const tipos_sanguineos = await client_1.prismaClient.tipoSanguineo.findMany();
        return res.json(tipos_sanguineos);
    }
}
exports.GetAllTipoSanguineo = GetAllTipoSanguineo;
//# sourceMappingURL=GetAllTipoSanguineo.js.map