import { Request, Response } from "express";
import { prismaClient } from "../../database/client";

export class GetByIdPessoa {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const pessoa = await prismaClient.pessoa.findUnique({
      where: {
        id: parseInt(id)
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

    return res.json(pessoa);
  }
}