"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDoacao = void 0;
const client_1 = require("../../database/client");
class CreateDoacao {
    async handle(req, res) {
        const { pessoa_id, local_id, data } = req.body;
        try {
            const doacao = client_1.prismaClient.doacao.create({
                data: {
                    pessoa: {
                        connect: {
                            id: parseInt(pessoa_id)
                        }
                    },
                    local: {
                        connect: {
                            id: parseInt(local_id)
                        }
                    },
                    data: data
                }
            });
        }
        catch (error) {
            console.log(error);
            return res.status(400).json({
                message: `[Error]: ${error}`
            });
        }
    }
}
exports.CreateDoacao = CreateDoacao;
//# sourceMappingURL=CreateDoacao.js.map