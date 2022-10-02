import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Request, Response } from "express";
import { prismaClient } from "../../database/client";


export class DeleteLocalColeta {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const localColeta = await prismaClient.localColeta.delete({
        where: {
          id: parseInt(id)
        }
      });
      const endereco = await prismaClient.endereco.delete({
        where: {
          id: localColeta.endereco_id
        }
      });

      return res.json(localColeta);

    }catch (error) {

      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == "P2025") {
          return res.status(400).json({
            message: `[Error ${error.code}]: id [${id}] não existe no banco de dados`
          });
        }
      }else {
        return res.status(400).json({
          message: `[Error]: ${error}`
        });

      }

    }
  }
}