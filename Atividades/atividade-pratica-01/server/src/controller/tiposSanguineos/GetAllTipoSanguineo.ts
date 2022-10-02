import { Request, Response } from "express";
import { prismaClient } from "../../database/client";

export class GetAllTipoSanguineo {
  async handle (req: Request, res: Response) {
    const tipos_sanguineos = await prismaClient.tipoSanguineo.findMany();
    return res.json(tipos_sanguineos)
  }
}