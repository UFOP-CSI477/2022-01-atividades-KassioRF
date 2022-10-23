import { Request, Response } from "express";
import { prismaClient } from "../../database/client";

export class GetAllUnidade {
  async handle( req: Request, res: Response) {
    const unidade = await prismaClient.unidade.findMany({
      
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
  
    return res.json(unidade)
  }
}
