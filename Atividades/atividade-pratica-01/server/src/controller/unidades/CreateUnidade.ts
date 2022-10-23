import { prismaClient } from "../../database/client";
import { Request, Response } from "express";


export class CreateUnidade {
  async handle (req: Request, res: Response) {
    const {
      nome,
      rua,
      numero,
      complemento,
      cidade_id,

    } = req.body;

    try {
      const endereco = await prismaClient.endereco.create({
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

      const unidade = await prismaClient.unidade.create({
        data: {
          nome,
          endereco: {
            connect: {
              id: endereco.id
            }
          }
        }
      });

      return res.json(unidade);

    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message: `[Error]: ${error}`
      });
    }
  
  }
}