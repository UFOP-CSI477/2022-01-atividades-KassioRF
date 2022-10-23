import { Request, Response } from "express";
import { prismaClient } from "../../database/client";

export class GetAllUnidade {
  async handle( req: Request, res: Response) {
    const unidade = await prismaClient.unidade.findMany({
      
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
  
    return res.json(unidade)
  }
}
