"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLocalColeta = void 0;
const client_1 = require("../../database/client");
class CreateLocalColeta {
    async handle(req, res) {
        const { nome, rua, numero, complemento, cidade_id, } = req.body;
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
            const localColeta = await client_1.prismaClient.localColeta.create({
                data: {
                    nome,
                    endereco: {
                        connect: {
                            id: endereco.id
                        }
                    }
                }
            });
            return res.json(localColeta);
        }
        catch (error) {
            console.log(error);
            return res.status(400).json({
                message: `[Error]: ${error}`
            });
        }
    }
}
exports.CreateLocalColeta = CreateLocalColeta;
//# sourceMappingURL=CreateLocalColeta.js.map