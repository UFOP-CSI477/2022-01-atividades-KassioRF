import { Request, Response } from "express";
import { prismaClient } from "../../database/client";

export class GetAllDoacao {
  async handle( req: Request, res: Response) {
    const doacao = await prismaClient.doacao.findMany({    
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
        
      },     
    });
  
    return res.json(doacao);
  }
}
