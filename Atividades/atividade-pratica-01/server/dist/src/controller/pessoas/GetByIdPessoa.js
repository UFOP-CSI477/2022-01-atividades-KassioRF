"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetByIdPessoa = void 0;
const client_1 = require("../../database/client");
class GetByIdPessoa {
    async handle(req, res) {
        const { id } = req.params;
        const pessoa = await client_1.prismaClient.pessoa.findUnique({
            where: {
                id: parseInt(id)
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
        return res.json(pessoa);
    }
}
exports.GetByIdPessoa = GetByIdPessoa;
//# sourceMappingURL=GetByIdPessoa.js.map