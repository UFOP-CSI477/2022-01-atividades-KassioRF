import { Request, Response } from "express";
import { prismaClient } from "../../database/client";

export class GetByIdUnidade {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const unidade = await prismaClient.unidade.findUnique({
      where: {
        id: parseInt(id)
      },
      select: {
        id: true,
        nome: true,
        distribuicao: {
          orderBy: {
            created_at: 'asc'
          },
          select: {
            id: true,
            produto: {
              select: {
                id: true,
                etiqueta: true,
                doacao: {
                  select: {
                    pessoa:{
                      select: {
                        tipo: {
                          select: {
                            tipo: true,
                            fator: true
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        endereco: {
          select: {
            rua: true,
            numero: true,
            complemento: true,
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
        },
        created_at: true,
        updated_at: true
      }
    });

    return res.json(unidade);
  }
}