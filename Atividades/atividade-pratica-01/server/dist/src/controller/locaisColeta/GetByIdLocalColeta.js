"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetByIdLocalColeta = void 0;
const client_1 = require("../../database/client");
class GetByIdLocalColeta {
    async handle(req, res) {
        const { id } = req.params;
        const localColeta = await client_1.prismaClient.localColeta.findUnique({
            where: {
                id: parseInt(id)
            },
            select: {
                id: true,
                nome: true,
                endereco: {
                    select: {
                        rua: true,
                        numero: true,
                        complemento: true,
                        cidade: {
                            select: {
                                nome: true,
                                estado: {
                                    select: {
                                        sigla: true
                                    }
                                }
                            }
                        }
                    }
                },
            }
        });
        return res.json(localColeta);
    }
}
exports.GetByIdLocalColeta = GetByIdLocalColeta;
//# sourceMappingURL=GetByIdLocalColeta.js.map