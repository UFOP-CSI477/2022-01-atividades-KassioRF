### Atividade Prática 1

#### Observações:

1) A estrutura dos diretórios segue o padrão utilizado nas aulas práticas;

2) Optei por desenvolver a atividade utilizando TypeScript. Para interface de banco de dados utilizei o Prisma com o Sqlite.

3) Para as tabelas de cidade e estado foi feita a inserção de todos os registros disponíveis na API do IBGE. Desta forma desconsiderei para estas tabelas as operações de Criar, Atualizar e Remover. O mesmo foi feito para os tipos sanguineos;

4) Os scripts de inserção para estes dados pre-definidos se encontram no diretório: [server/data_predefined/](./server/data_predefined/);

5) Acrescentei uma tabela adicional para armazenar Endereços. Esta tabela está sendo associada às tabelas Pessoa e LocalColeta.
   
6) Os testes para as rotas foram implementados com a extensão REST Client do vscode. Os arquivos .rest se econtram no diretório: [server/api_tests/](./server/api_tests);



### PROVA

Conforme orientado o código fonte da implementação proposta na prova  foi incorporado à implementação da atividade prática 01(backend).

Abaixo a referência para os arquivos referentes a prova:

1) [/server/src/controller/produtos/](./server/src/controller/produtos/)
2) [/server/src/controller/distribuicoes/](./server/src/controller/distribuicoes/)
3) [/server/src/controller/unidades/](./server/src/controller/unidades/)

As rotas para os módulos criados foram adicionadas ao diretório [/server/src/routes/](./server/src/routes/)

As tabelas definidas pelo prisma se encontram no arquivo [/server/prisma/schema.prisma](./server/prisma/schema.prisma)
