import { Request, Response } from "express";
import { prismaClient } from "../../database/client";


export class UpdateLocalColeta {
  async handle(req: Request, res: Response) {
    const {
      id,
      nome,
      rua,
      numero,
      complemento,
      cidade_id,
    } = req.body;

    try {
      const _localColeta = await prismaClient.localColeta.findUnique({
        where: {
          id: id
        }
      });

      if (_localColeta) {
        const endereco = await prismaClient.endereco.update({
          where: {
            id: _localColeta.endereco_id
          },
          data: {
            rua,
            numero,
            complemento,
            cidade: {
              connect: {
                id: parseInt(cidade_id)
              }
            }
  
          }
        });

        const localColeta = await prismaClient.localColeta.update({
          where: {
            id: id
          },
          data: {
            nome,
            endereco: {
              connect: {
                id: endereco.id
              }
            },

          }
        });
        return res.json(localColeta);
      
      } else {
        return res.status(400).json({
          message: `[Error]: Person id not found`
        });        
      }

    
  }catch (error) {
    console.log(error);
    return res.status(400).json({
        message: `[Error]: ${error}`
      });
    }
  }

}
