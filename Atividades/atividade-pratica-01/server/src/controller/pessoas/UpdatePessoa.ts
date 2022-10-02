import { Request, Response } from "express";
import { prismaClient } from "../../database/client";

export class UpdatePessoa {
  async handle(req: Request, res: Response) {
    const { 
      id,
      nome,
      documento,
      rua,
      numero,
      complemento,
      cidade_id,
      tipo_sanguineo_id,
    
    } = req.body;


    

    try {
      const _pessoa = await prismaClient.pessoa.findUnique({
        where: {
          id: id
        }
      });
      console.log(_pessoa);

      if (_pessoa) {
        const endereco = await prismaClient.endereco.update({
          where: {
            id: _pessoa.endereco_id
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

        const pessoa = await prismaClient.pessoa.update({
          where: {
            id: id
          },
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
        })
        return res.json(pessoa);
      
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
