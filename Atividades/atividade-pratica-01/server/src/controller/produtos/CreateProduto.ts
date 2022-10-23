import { prismaClient } from "../../database/client";
import { Request, Response } from "express";

function getDateBR (dateString: string): Date {
  var dataSplit = dateString.split('/');
  var dateConverted;

  if (dataSplit[2].split(" ").length > 1) {

      var hora = dataSplit[2].split(" ")[1].split(':');
      dataSplit[2] = dataSplit[2].split(" ")[0];
      dateConverted = new Date(parseInt(dataSplit[2]), parseInt(dataSplit[1])-1, parseInt(dataSplit[0]), parseInt(hora[0]), parseInt(hora[1]));

  } else {
      dateConverted = new Date(parseInt(dataSplit[2]), parseInt(dataSplit[1]) - 1, parseInt(dataSplit[0]));
  }

  return dateConverted;
}  




export class CreateProduto {
  async handle(req: Request, res: Response) {
    const {
      etiqueta,
      doacao_id,
      validade,

    } = req.body;

    try {
      const produto = await prismaClient.produto.create({
        data: {
          doacao: {
            connect: {
              id: parseInt(doacao_id)
            }
          },
          etiqueta: etiqueta,
          validade: getDateBR(validade),
        }
      });
      return res.json(produto);

    }catch (error) {
      console.log(error);
      return res.status(400).json({
        message: `[Error]: ${error}`
      });      
    }

  }
}