import { Request, Response } from "express";
import { prismaClient } from "../../database/client";

export class GetByIdCidade {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const cidade = await prismaClient.cidade.findUnique({
      where: {
        id: parseInt(id)
      },
      include: {
        estado: true
      }
      
    });
    return res.json(cidade);
  }
}