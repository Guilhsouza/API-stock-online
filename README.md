# 📦 API-estoque-online

## 📢 Tópicos

- [Sobre o Projeto](#sobre-o-projeto)
  
- [Tecnologias e Ferramentas Utilizadas](#tecnologias-e-ferramentas-utilizadas)

- [Estrutura e Arquitetura](#estrutura-e-arquitetura)
  
- [Autenticação](#autenticacao)
  
## 📌 Sobre o Projeto
A **principal ideia** deste projeto é oferecer **operações de usuário e estoque** em um ambiente online. Os **usuários podem realizar um CRUD**, criando, editando e excluindo uma conta, além da função de login. As operações de estoque incluem um CRUD simples para a tabela, e outro CRUD para os próprios produtos, possibilitando a **criação**, **edição**, **busca específica** e **exclusão tanto das tabelas quanto dos produtos**.

## 🧰 Tecnologias e Ferramentas Utilizadas

<div>
 <img title='JavaScript' alt='javascript' src='https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E' />
 <img title='Node JS' alt='nodejs' src='https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white' />
 <img title='Express' alt='express' src='https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white' />
 <img title='JsonWebToken' alt='jwt' src='https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white' />
 <img title='PostgreSQL' alt='postgresql' src='https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white' />
 <img title='Nodemon' alt='nodemon' src='https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD' />
 <img title='Swagger' alt='swagger' src='https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white' />
 <img title='Postman' alt='postman' src='https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white' />
</div>

## 🧱 Estrutura e Arquitetura
O projeto segue os princípios da **arquitetura limpa** e leva também o princípio **SRP** do **SOLID**. O código foi organizado de seguindo os conceitos de **responsabilidade única**, **modularidade** e **reutilização**.

## 🔏 Autenticação
Para utilizar a API, é necessário **se autenticar**. Você deve obter um token **JWT válido** através do endpoint de login. O token JWT deve ser incluído no cabeçalho de autorização Bearer Token de todas as proximas solicitações. Dessa forma garantindo **acesso total** aos recursos da API.

## 📃 Documentação da Aplicação
A seguir, temos o link da **documentação oficial** da aplicação no **Swagger**: <br>
https://api-stock-online.onrender.com/api-docs
> obs: É possível ocorrer atraso no carregamento, isso acontece quando o deploy não é acessado por um certo tempo na plataforma, mas basta aguardar que uma requisição solicitará ao Render que a aplicação seja reativada.
