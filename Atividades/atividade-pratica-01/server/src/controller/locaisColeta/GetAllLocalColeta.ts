import { Request, Response } from "express";
import { prismaClient } from "../../database/client";

export class GetAllLocalColeta {
  async handle( req: Request, res: Response) {
    const localColeta = await prismaClient.localColeta.findMany({
      
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
                nome: true,
                estado: {
                  select: {
                    sigla: true
                  }
                  
                }
              }
            }
          }
        },

      }
    });
  
    return res.json(localColeta)
  }
}
