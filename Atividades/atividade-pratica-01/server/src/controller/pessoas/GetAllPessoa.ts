import { Request, Response } from "express";
import { prismaClient } from "../../database/client";

export class GetAllPessoa {
  async handle( req: Request, res: Response) {
    const pessoas = await prismaClient.pessoa.findMany({
      
      select: {
        id: true,
        nome: true,
        documento: true,        
        tipo: {
          select: {
            tipo: true,
            fator: true,
          }
        },
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
  
    return res.json(pessoas)
  }


}