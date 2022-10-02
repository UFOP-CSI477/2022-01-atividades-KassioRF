/**
 *
 * Script utilizado apenas para inserir os tipos sanguineos no banco de dados.
 * fonte utilizada para definir os tipos:
 * https://amigosdaoncologia.org.br/navegacaodepacientes/noticias/voce-sabe-qual-o-seu-tipo-de-sangue-e-o-fator-rh
 *
 */

import { prismaClient } from '../src/database/client';
import { TIPOS, FATOR } from '../src/hooks/Constants';
import { TipoSanguineoModel } from '../src/hooks/TipoSanguineoModel';

const _tiposSanguineos: Array<TipoSanguineoModel> = [
  // A+
  { tipo: TIPOS.A, fator: FATOR.pos },
  // A-
  { tipo: TIPOS.A, fator: FATOR.neg },
  // B+
  { tipo: TIPOS.B, fator: FATOR.pos },
  // B-
  { tipo: TIPOS.B, fator: FATOR.neg },
  // AB+
  { tipo: TIPOS.AB, fator: FATOR.pos },
  // AB-
  { tipo: TIPOS.AB, fator: FATOR.neg },
  // O+
  { tipo: TIPOS.O, fator: FATOR.pos },
  // O-
  { tipo: TIPOS.O, fator: FATOR.neg },
]

// Insere os dados no banco de dados na tipoSanguineo
function runInserts() {
  _tiposSanguineos.map(async item => {
    const tipo = await prismaClient.tipoSanguineo.create({
      data: {
        tipo: item.tipo,
        fator: item.fator
      }
    });
  });
}

// necessário executar apenas para povoar o banco de dados
runInserts();