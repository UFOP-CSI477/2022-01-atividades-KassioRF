import { Request, response, Response } from "express";
import { prismaClient } from "../../database/client";

export class GetAllEstado {
  async handle(req: Request, res: Response) {
    //const estados = await prismaClient.estado.findMany();
    const estados = await prismaClient.estado.findMany({
      orderBy: {
        sigla: 'asc'
      },
      
      select: {
        id: true,
        nome: true,
        sigla: true,
        cidade: {
          orderBy: {
            nome: 'asc'
          },
          select: {
            id:true,
            nome:true,
          }
        }
      }
    });
    return res.json(estados);
  }
}