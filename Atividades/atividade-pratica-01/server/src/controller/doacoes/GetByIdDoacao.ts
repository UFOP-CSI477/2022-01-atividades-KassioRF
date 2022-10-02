import { Request, Response } from "express";
import { prismaClient } from "../../database/client";

export class GetByIdDoacao {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const doacao = await prismaClient.doacao.findUnique({
      where: {
        id: parseInt(id)
      },
      select: {
        id: true,
        pessoa: {
          select: {
            id: true,
            nome: true,
            documento: true,
            tipo: {
              select: {
                tipo: true,
                fator: true
              }
            }
          }
        },
        local: {
          select: {
            id: true,
            nome: true,            
          }
        }
        
      }
        
    });

    return res.json(doacao);
  }
}