import { Request, Response } from "express";
import { prismaClient } from "../../database/client";

export class GetAllDistribuicao {
  async handle( req: Request, res: Response) {
    const distribuicao = await prismaClient.distribuicao.findMany({
      
      select: {
        id: true,
        created_at: true,
        updated_at: true,
        produto: {
          select: {
            id: true,
            etiqueta: true,
            validade: true,

          }          
        },
        unidade: {
          select: {
            id:true,
            nome: true,
            endereco: {
              select: {
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
            }            
          }
        },
      }
    });
  
    return res.json(distribuicao)
  }
}
