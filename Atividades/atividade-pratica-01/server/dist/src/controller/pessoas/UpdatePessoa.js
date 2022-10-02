"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePessoa = void 0;
const client_1 = require("../../database/client");
class UpdatePessoa {
    async handle(req, res) {
        const { id, nome, documento, rua, numero, complemento, cidade_id, tipo_sanguineo_id, } = req.body;
        try {
            const _pessoa = await client_1.prismaClient.pessoa.findUnique({
                where: {
                    id: id
                }
            });
            console.log(_pessoa);
            if (_pessoa) {
                const endereco = await client_1.prismaClient.endereco.update({
                    where: {
                        id: _pessoa.endereco_id
                    },
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
                const pessoa = await client_1.prismaClient.pessoa.update({
                    where: {
                        id: id
                    },
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
            else {
                return res.status(400).json({
                    message: `[Error]: Person id not found`
                });
            }
        }
        catch (error) {
            console.log(error);
            return res.status(400).json({
                message: `[Error]: ${error}`
            });
        }
    }
}
exports.UpdatePessoa = UpdatePessoa;
//# sourceMappingURL=UpdatePessoa.js.map