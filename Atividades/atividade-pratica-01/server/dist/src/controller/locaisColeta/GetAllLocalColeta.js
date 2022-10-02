"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllLocalColeta = void 0;
const client_1 = require("../../database/client");
class GetAllLocalColeta {
    async handle(req, res) {
        const localColeta = await client_1.prismaClient.localColeta.findMany({
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
exports.GetAllLocalColeta = GetAllLocalColeta;
//# sourceMappingURL=GetAllLocalColeta.js.map