# **CSI606-2021-02 - Remoto - Trabalho Final - Resultados**

## Kassio Rodrigues Ferreira

--------------

<!-- Este documento tem como objetivo apresentar o projeto desenvolvido, considerando o que foi definido na proposta e o produto final. -->

### Resumo

  <!-- (Apresentar um breve resumo sobre o seu trabalho, indicando o contexto e as principais funcionalidades.) -->
   O tema proposto neste trabalho consiste em uma aplicação web com o objetivo de intermediar o contato entre pessoas que queiram comprar ou vender livros usados.
   
   Portanto, trata-se de uma aplicação multiusuário e tem como principais funcionalidades o cadastro e login de usuários, e a publicação de anuncios na plataforma. 
  
### 1. Funcionalidades implementadas
<!-- Descrever as funcionalidades que eram previstas e foram implementas. -->
  - Cadastro de usuário;
  - Login de usuário;
  - Edição de perfil de usuário;
  - Publicação anúncios de venda (somente usuários autenticados);
  - Edição de anúncios publicados (somente usuários proprietários do anúncio);
  - Exclusão de anúncios publicados (somente usuários proprietários do anúncio);
  - Visualização de anúncios publicados (todos os usuários);
  
### 2. Funcionalidades previstas e não implementadas
<!-- Descrever as funcionalidades que eram previstas e não foram implementas, apresentando uma breve justificativa do porquê elas não foram incluídas -->
- Permitir que os usuários realizem compras diretamente pelo sistema;
- Permitir que os usuários realizem compras diretamente pelo sistema;

Ao decorrer do desenvolvimento do trabalho notei que, por ser uma plataforma multiusuário, não seria interessante lidar com questões de faturamento.


### 4. Principais desafios e dificuldades
<!-- Descrever os principais desafios encontrados no desenvolvimento do trabalho, quais foram as dificuldades e como elas foram superadas e resolvidas. -->
A princípio houve um uma dificuldade para tratar o upload de imagens via formulário. Porém após algum tempo de pesquisa foi possível encontrar uma solução viável.

### 5. Instruções para instalação e execução
<!-- Descrever o que deve ser feito para instalar (ou baixar) a aplicação, o que precisa ser configurando (parâmetros, banco de dados e afins) e como executá-la. -->

O backend da aplicação foi desenvolvido em conjunto com alguns serviços do [FireBase](https://firebase.google.com/) e por tanto as dependências necessárias já estão registradas no package.json do aplicação. Como os serviços utilizados (Banco de dados e autenticação) permanecem hospedados no servidor do Firebase não é necessário inicialização prévia. Basta apenas executar o [projeto](./projeto/app/) que foi desenvolvido com ReactTs.

Para instalar as depêndencias do projeto é necessário executar o comando ``npm install --force``. 

Obs: É necessário utilizar o ``--force`` devido alguns conflitos das depências do MaterialUi (utilizado para construir alguns componentes visuais).


### 6. Referências
<!-- Referências podem ser incluídas, caso necessário. Utilize o padrão ABNT. -->

 - https://firebase.google.com/docs/ Documentação do Firebase 
    
 - https://github.com/danileao/youtube-input-mask Máscara para input de moeda BRL 
    
 - https://codesandbox.io/s/react-images-uploading-demo-typescript-fr2zm Upload de Imagens com ReactTs 
    
