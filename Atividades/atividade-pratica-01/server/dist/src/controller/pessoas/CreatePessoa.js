"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePessoa = void 0;
const client_1 = require("../../database/client");
class CreatePessoa {
    async handle(req, res) {
        const { nome, documento, rua, numero, complemento, cidade_id, tipo_sanguineo_id, } = req.body;
        try {
            const endereco = await client_1.prismaClient.endereco.create({
                data: {
                    rua,
                    numero,
                    complemento,
                    cidade: {
                        connect: {
                            id: parseInt(cidade_id)
                        }
                    }
                }
            });
            const pessoa = await client_1.prismaClient.pessoa.create({
                data: {
                    nome,
                    documento,
                    endereco: {
                        connect: {
                            id: endereco.id
                        }
                    },
                    tipo: {
                        connect: {
                            id: parseInt(tipo_sanguineo_id)
                        }
                    }
                }
            });
            return res.json(pessoa);
        }
        catch (error) {
            return res.status(400).json({
                message: `[Error]: ${error}`
            });
        }
    }
}
exports.CreatePessoa = CreatePessoa;
//# sourceMappingURL=CreatePessoa.js.map