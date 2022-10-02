import { Request, response, Response } from "express";
import { prismaClient } from "../../database/client";

export class GetByIdEstado {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const estado = await prismaClient.estado.findUnique({
      where: {
        id: parseInt(id)
      }
    });

    return res.json(estado);
  }
}