import { Request, Response } from "express";
import { prismaClient } from "../../database/client";

export class GetAllDoacao {
  async handle( req: Request, res: Response) {
    const doacao = await prismaClient.doacao.findMany({    
      select: {
        id: true,
        date: true,
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
            endereco: {
              select: {
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
            }            
          }
        }
        
      },     
    });
  
    return res.json(doacao);
  }
}
