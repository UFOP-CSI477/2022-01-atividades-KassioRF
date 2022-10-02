import { Request, Response } from "express";
import { prismaClient } from "../../database/client";

export class GetByDocumentoPessoa {
  async handle(req: Request, res: Response) {
    const { documento } = req.params;

    // trocar por unique no modelo e substituir findMany
    const pessoa = await prismaClient.pessoa.findMany({
      where: {
        documento: String(documento)
      },
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

    return res.json(pessoa[0]);
  }
}