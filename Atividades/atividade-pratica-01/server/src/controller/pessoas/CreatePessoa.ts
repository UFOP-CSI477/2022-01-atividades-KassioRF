import { prismaClient } from "../../database/client";
import { Request, Response } from "express";

export class CreatePessoa {
  async handle (req: Request, res: Response) {
    const { 
      nome,
      documento,
      rua,
      numero,
      complemento,
      cidade_id,
      tipo_sanguineo_id,
    
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

      const pessoa = await prismaClient.pessoa.create({
        data: {
          nome,
          documento,
          endereco: {
            connect: {
              id: endereco.id
            }
          },
          tipo: {
            connect: {
              id: parseInt(tipo_sanguineo_id)
            }
          }
        }
      });
    return res.json(pessoa);
    
    } catch (error) {
      return res.status(400).json({
        message: `[Error]: ${error}`
      });
    }
  }

}
  
