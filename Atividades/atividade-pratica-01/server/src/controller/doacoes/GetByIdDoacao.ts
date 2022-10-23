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
        },
        created_at: true,
        updated_at: true
      }
        
    });

    return res.json(doacao);
  }
}