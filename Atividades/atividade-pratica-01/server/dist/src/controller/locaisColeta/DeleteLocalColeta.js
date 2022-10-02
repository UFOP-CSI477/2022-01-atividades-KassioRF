"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteLocalColeta = void 0;
const runtime_1 = require("@prisma/client/runtime");
const client_1 = require("../../database/client");
class DeleteLocalColeta {
    async handle(req, res) {
        const { id } = req.params;
        try {
            const localColeta = await client_1.prismaClient.localColeta.delete({
                where: {
                    id: parseInt(id)
                }
            });
            const endereco = await client_1.prismaClient.endereco.delete({
                where: {
                    id: localColeta.endereco_id
                }
            });
            return res.json(localColeta);
        }
        catch (error) {
            if (error instanceof runtime_1.PrismaClientKnownRequestError) {
                if (error.code == "P2025") {
                    return res.status(400).json({
                        message: `[Error ${error.code}]: id [${id}] não existe no banco de dados`
                    });
                }
            }
            else {
                return res.status(400).json({
                    message: `[Error]: ${error}`
                });
            }
        }
    }
}
exports.DeleteLocalColeta = DeleteLocalColeta;
//# sourceMappingURL=DeleteLocalColeta.js.map