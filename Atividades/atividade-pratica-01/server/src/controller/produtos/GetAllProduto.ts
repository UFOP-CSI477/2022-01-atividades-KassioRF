import { prismaClient } from "../../database/client";
import { Request, Response } from "express";


export class GetAllProduto {
  async handle(req: Request, res: Response) {
    const produto = await prismaClient.produto.findMany({
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
                documento: true
              }
            }
          }
        }
      }
    })
    
    return res.json(produto);
  
  }
}