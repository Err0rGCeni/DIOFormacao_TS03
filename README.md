# Node + TypeScript

## Node e Métodos HTTP

> Node é um software de código aberto, que permite a execução do JavaScript fora do navegador web.

**Single Thread**: Cria uma pilha com as funções chamadas e executa uma por vez.

Métodos HTTP:

- **GET**: O método GET é usado para solicitar dados de um recurso. Ele não deve alterar o estado do servidor e é geralmente usado para recuperar informações.
- **POST**: O método POST é usado para enviar dados ao servidor para serem processados e geralmente leva a uma mudança de estado no servidor. É usado para criar recursos.
- **PUT**: O método PUT é usado para atualizar ou substituir completamente um recurso existente no servidor.
- **PATCH**: O método PATCH é semelhante ao PUT, mas é usado para aplicar parcialmente uma atualização a um recurso existente.
- **DELETE**: O método DELETE é usado para remover um recurso do servidor. Ele solicita a exclusão do recurso especificado.
- **HEAD**: O método HEAD é semelhante ao GET, mas solicita apenas os cabeçalhos de resposta, sem os dados do corpo, sem baixar o conteúdo completo.
- **OPTIONS**: O método OPTIONS é usado para obter informações sobre os métodos HTTP permitidos em um recurso, como GET, POST, PUT, etc. Ele é usado para descobrir quais ações podem ser realizadas em um recurso.
- **TRACE**: O método TRACE é usado para diagnosticar problemas de rede, pois permite que o cliente solicite que o servidor retorne uma cópia das mensagens de solicitação, ajudando a rastrear o roteamento da requisição.
- **CONNECT**: O método CONNECT é usado para estabelecer uma conexão de rede com um recurso, geralmente por meio de um proxy, para criar um túnel de comunicação seguro.

Status Code:

- **1xx** (Informational): Esses códigos são informativos e indicam que a solicitação foi recebida e está sendo processada.
- **2xx** (Successful): Esses códigos indicam que a solicitação foi bem-sucedida e o servidor respondeu de maneira apropriada.
  - **200** OK: Indica que a solicitação foi bem-sucedida e o servidor retornou os dados solicitados.
- **3xx** (Redirection): Esses códigos indicam que o cliente deve tomar alguma ação adicional para completar a solicitação.
  - **301** Moved Permanently: Indica uma redireção permanente para uma nova URL.
- **4xx** (Client Error): Esses códigos indicam que a solicitação feita pelo cliente é inválida ou não pode ser processada pelo servidor.
  - **400** Bad Request: Indica que a solicitação do cliente é inválida ou malformada.
  - **404** Not Found: Indica que o recurso solicitado não foi encontrado no servidor.
- **5xx** (Server Error): Esses códigos indicam que ocorreu um erro no servidor ao processar a solicitação.
  - **500** Internal Server Error: Indica um erro genérico do servidor.

## Utilizando o Node com TypeScript

Lembrando que TypeScript será usado apenas no desenvolvimento.

```bash
npm init --y
```

```bash
npm i -D typescript ts-node-dev
```

```bash
npx tsc --init
```

Criar scripts em `package.json`:

```json
  "scripts": {
    "build": "rimraf ./build && tsc",
    "start": "node build/index.js",
    "dev": "ts-node-dev src/index.ts",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

1. Remover o diretório e executar o compilador TypeScript;
1. Iniciar a aplicação executando o arquivo .js principal de /build;
1. Usado durante o desenvolvimento para executar o arquivo .ts principal;
1. Executar testes unitários ou de integração;

### Alterações em tsconfig.json

Transpilar a pasta src:

```json
  "include": [
    "src"
  ]
```

Salvar os arquivos em .js na pasta build:

```json
"outDir": "./build"
```

### Express

> Express.js é um framework web minimalista para Node.js. É usado para simplificar o processo de criação de aplicativos web e APIs.

```bash
npm i express
npm i -D @types/express
```

A arquitetura comum para uma aplicação Express.js segue um padrão de design conhecido como arquitetura em camadas, que ajuda a organizar o código de maneira limpa e modular.

- **Routing Layer**: Rotas da aplicação, como a aplicação responde a diferentes URLs.
  - Métodos `.get()`, `.post()`, `.put()`, etc.
  - Mapeia solicitações HTTP para funções controladoras específicas.
- **Controller Layer**: Funções que tratam das solicitações HTTP específicas definidas nas rotas.
  - Lidam com a lógica de negócios do aplicativo, processam dados, fazem chamadas a bancos de dados e preparam respostas para o cliente.
- **Service Layer**: Contém lógica de negócios mais complexa e independente de solicitações HTTP.
  - Controladores podem chamar serviços para executar tarefas especificas.
- **Model Layer**: Os modelos representam a estrutura de dados do aplicativo e a interação com o banco de dados.
  - Definição de esquemas de banco de dados, operações CRUD e validações de dados.
- **Middleware Layer**: Execução de funções intermediárias entre a chegada de uma solicitação e a resposta enviada ao cliente.
  - Autenticação, autorização, manipulação de erros, registro de solicitações, compressão de resposta, etc.
- **View Layer**: Se a aplicação gera conteúdo HTML para o cliente, esta camada é responsável por renderizar modelos de visualização e incorporar dados dinâmicos neles.
- **Static Assets Layer**: Gerencia arquivos estáticos, como CSS, JavaScript, imagens e outros recursos.

### Testes

```bash
npm i -D jest ts-jest @types/jest
```

```bash
npx jest --init
```

Em `jest.config.ts`, alterar `preset: "ts-jest` e `testMatch:[    "**/?(*.)+(spec|test).[tj]s?(x)"]`.

## TypeORM

**ORM (Object Relational Mapper)** é uma técnica de mapeamento de objeto relacional que nos permite fazer uma relação do objeto com os dados que os mesmos representam.

```shell
npm install typeorm
```

```shell
npm i reflect-metadata sqlite3
```

Habilitar em tsconfig.json:

```json
...
    "experimentalDecorators": true,                   /* Enable experimental support for legacy experimental decorators. */
    "emitDecoratorMetadata": true,                    /* Emit design-type metadata for decorated declarations in source files. */
...
    "allowJs": true,                                  /* Allow JavaScript files to be a part of your program. Use the 'checkJS' option to get errors from these files. */
```

### Entities

As entidades representam os **objetos de negócios** do seu sistema. Elas são mapeadas para tabelas no banco de dados.

Cada **entidade** corresponde a uma **tabela** no banco de dados e possui **atributos** que correspondem às **colunas** dessa tabela.

### Repositories

Os repositórios são responsáveis por **interagir** com o banco de dados em nome das entidades. Eles fornecem uma abstração para acessar e manipular os dados do banco de dados, oferecendo **métodos** como _buscarTodos_, _salvar_, etc.

### Migrations

As migrações são alterações incrementais no esquema do banco de dados. Elas permitem que evoluir o banco de dados à medida que o código da aplicação muda.

Ao adicionar, remover ou modificar modelos (tabelas) no ORM, as migrações são usadas para atualizar automaticamente o esquema do banco de dados.

## JWT

JWT (JSON Web Token) é um padrão aberto (RFC 7519) para representar informações de forma segura entre duas partes.

- **Header**: Contém informações sobre o tipo de token e o algoritmo de assinatura usado.
- **Payload**: A carga útil contém os dados que queremos transmitir.
- **Verify Signature**: A assinatura é usada para verificar a integridade do token.

```shell
npm i jsonwebtoken
yarn add -D @types/jsonwebtoken
```

## Projetos

- [Criando a API do Dio Bank Com Node](https://github.com/Err0rGCeni/DIOProject_DIOBankNodeAPI)
