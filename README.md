# Single sign on usando Firebase

Esse projeto mostra como implementar um SSO usando o Firebase. São usados dois projetos do Firebase, um que tem os usuários, onde é feito efetivamente o login, e o outro que é um exemplo de projeto de negócio, que consome o primeiro.

O repositório tem 3 partes:

### firebase-auth-server

Esse é o servidor que executa efetivamente o login dentro do projeto único de login do Firebase e retorna o token para o client

### firebase-auth-single

É o client de autenticação, que chama método de login do servidor e retorna o token.

### firebase-auth-client-example

Um exemplo de regra de negócio consumindo o client de autenticação

## Como rodar

Instalar as packages de cada um dos projetos (usando **npm install** ou **yarn install** e rodar nessa ordem usando **npm start** ou **yarn start**:

1. Server
2. Single
3. Example

Depois disso basta abrir a página do Example (http://localhost:3001 e fazer o fluxo de login)