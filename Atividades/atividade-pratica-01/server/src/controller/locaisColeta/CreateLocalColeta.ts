import { prismaClient } from "../../database/client";
import { Request, Response } from "express";


export class CreateLocalColeta {
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

      const localColeta = await prismaClient.localColeta.create({
        data: {
          nome,
          endereco: {
            connect: {
              id: endereco.id
            }
          }
        }
      });

      return res.json(localColeta);

    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message: `[Error]: ${error}`
      });
    }
  
  }
}