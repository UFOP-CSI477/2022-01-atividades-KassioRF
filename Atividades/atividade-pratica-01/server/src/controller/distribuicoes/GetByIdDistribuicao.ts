import { Request, Response } from "express";
import { prismaClient } from "../../database/client";

export class GetByIdDistribuicao {
  async handle( req: Request, res: Response) {
    const {id} = req.params;
    const distribuicao = await prismaClient.distribuicao.findUnique({
      where: {
        id: parseInt(id)
      }, 
      select: {
        id: true,
        created_at: true,
        updated_at: true,
        produto: {
          select: {
            id: true,
            etiqueta: true,
            validade: true,
            doacao: {
              select: {
                pessoa: {
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
