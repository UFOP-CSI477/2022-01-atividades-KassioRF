import { Request, response, Response } from "express";
import { prismaClient } from "../../database/client";

export class GetAllEstado {
  async handle(req: Request, res: Response) {
    const estados = await prismaClient.estado.findMany();
    
    return res.json(estados);
  }
}