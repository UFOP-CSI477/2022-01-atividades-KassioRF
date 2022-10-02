"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetByDocumentoPessoa = void 0;
const client_1 = require("../../database/client");
class GetByDocumentoPessoa {
    async handle(req, res) {
        const { documento } = req.params;
        // trocar por unique no modelo e substituir findMany
        const pessoa = await client_1.prismaClient.pessoa.findMany({
            where: {
                documento: String(documento)
            },
            select: {
                id: true,
                nome: true,
                documento: true,
                tipo: {
                    select: {
                        tipo: true,
                        fator: true,
                    }
                },
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
        return res.json(pessoa[0]);
    }
}
exports.GetByDocumentoPessoa = GetByDocumentoPessoa;
//# sourceMappingURL=GetByDocumentoPessoa.js.map