"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLocalColeta = void 0;
const client_1 = require("../../database/client");
class UpdateLocalColeta {
    async handle(req, res) {
        const { id, nome, rua, numero, complemento, cidade_id, } = req.body;
        try {
            const _localColeta = await client_1.prismaClient.localColeta.findUnique({
                where: {
                    id: id
                }
            });
            if (_localColeta) {
                const endereco = await client_1.prismaClient.endereco.update({
                    where: {
                        id: _localColeta.endereco_id
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
                const localColeta = await client_1.prismaClient.localColeta.update({
                    where: {
                        id: id
                    },
                    data: {
                        nome,
                        endereco: {
                            connect: {
                                id: endereco.id
                            }
                        },
                    }
                });
                return res.json(localColeta);
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
exports.UpdateLocalColeta = UpdateLocalColeta;
//# sourceMappingURL=UpdateLocalColeta.js.map