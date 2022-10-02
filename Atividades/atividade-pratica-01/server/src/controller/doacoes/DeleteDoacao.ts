import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Request, Response } from "express";
import { prismaClient } from "../../database/client";


export class DeleteDoacao {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const doacao = await prismaClient.doacao.delete({
        where: {
          id: parseInt(id)
        }
      });
      
      return res.json(doacao);
      
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