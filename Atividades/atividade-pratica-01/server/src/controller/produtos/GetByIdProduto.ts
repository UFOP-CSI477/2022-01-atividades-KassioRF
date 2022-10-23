import { prismaClient } from "../../database/client";
import { Request, Response } from "express";


export class GetByIdProduto {
  async handle(req: Request, res: Response) {

    const { id } = req.params;

    const produto = await prismaClient.produto.findUnique({
      where: {
        id: parseInt(id)
      },
      select: {
        id: true,
        etiqueta: true,
        validade: true,
        created_at: true,
        updated_at: true,
        doacao: {
          select: {
            id: true,
            local: true,
            date: true,
            pessoa: {
              select: {
                id: true,
                nome: true,
                documento: true,
                tipo: {
                  select: {
                    fator: true,
                    tipo: true,
                  }
                }
              }
            }
          }
        }
      }
    })
    
    return res.json(produto);
  
  }
}