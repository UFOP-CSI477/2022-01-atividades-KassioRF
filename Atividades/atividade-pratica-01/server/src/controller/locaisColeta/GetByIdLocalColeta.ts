import { Request, Response } from "express";
import { prismaClient } from "../../database/client";

export class GetByIdLocalColeta {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const localColeta = await prismaClient.localColeta.findUnique({
      where: {
        id: parseInt(id)
      },
      select: {
        id: true,
        nome: true,
        endereco: {
          select: {
            rua: true,
            numero: true,
            complemento: true,
            cidade: {
              select: {
                id: true,
                nome: true,

                estado: {
                  select: {
                    id: true,
                    sigla: true
                  }
                  
                }
              }
            }
          }
        },
        created_at: true,
        updated_at: true
      }
    });

    return res.json(localColeta);
  }
}