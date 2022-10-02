import { prismaClient } from "../../database/client";
import { Request, Response } from "express";

// Converter data dd/mm/yyyy para o DateTime format do prisma
// Fonte da solução: https://stackoverflow.com/questions/5619202/parsing-a-string-to-a-date-in-javascript
// Respondido por: Marcelo Rebouças
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


export class UpdateDoacao {

  async handle(req: Request, res: Response) {
    const {
      id,
      pessoa_id,
      local_id,
      date
    } = req.body


    try {
      const doacao = await prismaClient.doacao.update({
        where: {
          id: id
        },
        data: {
          date: getDateBR(date),
          pessoa: {
            connect: {
              id: parseInt(pessoa_id)
            }
          },
          local: {
            connect: {
              id: parseInt(local_id)
            }
          },
        }
      });

      return res.json(doacao);
    }catch (error) {
      console.log(error);
      return res.status(400).json({
        message: `[Error]: ${error}`
      });      
    }
  }

}