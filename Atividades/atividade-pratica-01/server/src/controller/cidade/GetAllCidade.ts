import { Request, Response } from "express";
import { prismaClient } from "../../database/client";

export class GetAllCidade {
  async handle(req: Request, res: Response) {
    const cidades = await prismaClient.cidade.findMany({
      include: {
        estado: true
      }
    });
    return res.json(cidades);
  }
}