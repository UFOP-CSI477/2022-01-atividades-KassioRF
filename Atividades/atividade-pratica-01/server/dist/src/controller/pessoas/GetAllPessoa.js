"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllPessoa = void 0;
const client_1 = require("../../database/client");
class GetAllPessoa {
    async handle(req, res) {
        const pessoas = await client_1.prismaClient.pessoa.findMany({
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
        return res.json(pessoas);
    }
}
exports.GetAllPessoa = GetAllPessoa;
//# sourceMappingURL=GetAllPessoa.js.map