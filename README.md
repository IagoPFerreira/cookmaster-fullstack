# Roteiro para as mentorias do Cookmaster

Sequência de mentorias desenvolvidas para serem aplicadas na Turma 25, com o propósito de revisar e reforçar conteúdos nos quais as pessoas estudantes possuem dificuldades, esses conteúdos foram apontados pelas próprias pessoas estudantes no preenchimento [deste forms](https://forms.gle/6EdTi8LecdZVUiyt9), o resultado desse forms pode ser verificado [aqui](https://betrybe.slack.com/archives/C03N2F2FGKA/p1680096291916419?thread_ts=1680016591.667539&cid=C03N2F2FGKA).

Esse projeto vai ser desenvolvido do 0, desde da criação dos diretórios iniciais, até o deploy das aplicações totalmente funcionais e será um projeto Fullstack.

O ideal é que os momentos sejam iniciados e finalizados na mesma mentoria, é possível que dependendo do tempo da mentoria, só seja possível realizar 1 momento por mentoria, mas caso tenha tempo para finalizar mais de 1 momento, fique a vontade para tocar quantos momentos forem cabíveis, desde que iniciem e finalizem em uma mesma mentoria, para não perder a linearidade nem o raciocínio.

Cada momento começa exatamente do final do anterior, é possível encontrar de forma comprimida o código e o que foi desenvolvido em cada momento neste mesmo repositório.

## Primeiro momento - Configurando o projeto

Visto que o projeto vai ser desenvolvido do 0, é bom mostrar para as pessoas estudantes o que nós iremos desenvolver, para isso, podemos usar um rascunho do que será desenvolvido [Excalidraw](https://excalidraw.com/#json=6wcoKP05324pM-kWfEPJc,8l9ZOf9zpwMn1Y8nOyL0XA).

> OE: fale sobre o fluxo de receitas, que iremos fazer um CRUD completo da rota /recipes, fale das tabelas esquematizadas, que iremos criar uma tabela somente para receitas, uma somente para os ingredientes e uma tabela intermediária entre essas 2.

<details>
<summary><strong>Configurações iniciais</strong></summary>

> OE: Abra o VSCode em um diretório vazio que você escolher para utilizar na mentoria, a sugestão é que o nome desse diretório seja Cookmaster

1. Faça a conexão do seu diretório local com o repositório no github onde você irá disponibilizar o código para as PEs:

~~~bash
git remote add triboA git@github.com:tryber/sd-0XX-a-live-lectures.git
git remote add triboB git@github.com:tryber/sd-0XX-b-live-lectures.git
~~~

> OE: É possível que surjam dúvidas sobre essa adição de remotos, tire um tempo para possíveis dúvidas, explique que é possível adicionarmos vários remotos nos nossos projetos, e que o *alias* do `origin` é somente o padrão. Utilize o comando `git remote -v` para exibir os remotos desse projeto.

2. Crie uma branch nova:

~~~bash
gco -b cookmaster-configs-iniciais
~~~

3. Criar os diretórios para iniciar a criação da aplicação:

~~~bash
mkdir backend frontend
~~~

4. Entre no diretório do frontend e inicie uma aplicação `React`:

~~~bash
cd frontend
npx create-react-app .
~~~

> OE: Mostre a aplicação rodando no navegador e depois encerre a aplicação por enquanto utilizando o Ctrl + C

5. Entre no diretório do backend e inicie uma aplicação `Node.js`:

~~~bash
cd ../backend
npm init -y 
~~~

> OE: Mostre o arquivo package.json, mostre que foi criado com somente 1 script e que não possui nenhuma dependência instalada ainda.

6. Instale algumas dependências

> OE: Peça colaboração das PEs para determinar quais dependências serão instaladas

~~~bash
npm i express mysql2 sequelize
~~~

> OE: Mostre novamente o package.json e mostre que as dependências foram instaladas

7. Instale dependências de desenvolvimento

~~~bash
npm i -D typescript @types/express @types/node @types/sequelize ts-node-dev nodemon
~~~

8. Inicie a configuração do eslint:

~~~bash
npx eslint --init
~~~

> OE: Utilize as configurações abaixo:

![eslint configs backend](./images/eslint-configs-backend.png)

9. Adicione novas configurações ao arquivo `.eslintrc.json`

> OE: Utilize as configurações [desse arquivo](./backend/.eslintrc.json)

10. Crie o arquivo `.eslintignore`

~~~bash
touch .eslintignore 
~~~

11. Adicione as seguintes linhas ao `.eslintignore`:

~~~.eslintignore
nyc.config.js
node_modules/
tests/
build/
src/database/migrations
src/database/seeders
src/database/config
src/database/models/index.ts
~~~

> OE: É possível que algumas dúvidas surjam sobre o motivo de estarem sendo adicionados aqui diretórios que ainda não existem e como você sabe que serão esses, diga que é por experiências prévias e que se for necessário, você pode alterar esse arquivo, removendo ou adicionando novos diretórios.

12. Crie o arquivo `.gitignore`:

~~~bash
touch .gitignore
~~~

13. Adicione o diretório `node_modules` ao arquivo `.gitignore`:

~~~.gitignore
node_modules
~~~

14. Faça um commit descritivo

> OE: utilize a extensão `Conventional Commits`, se quiser, ou faça os commits de forma tradicional pelo terminal, ou use a aba `Source Control` do VSCode para fazer os commits.

15. Faça um push:

~~~bash
git push triboA cookmaster-configs-iniciais
git push triboB cookmaster-configs-iniciais
~~~

</details>

<details>
<summary><strong>Iniciando o Backend</strong></summary>

Visto que a base do frontend já foi criada com o comando `npx create-react-app .`, vamos somente criar os arquivos de inicialização do backend.

> OE: Os comandos a seguir estarão considerando que o seu terminal esteja dentro do diretório `backend`

1. Crie o arquivo `tsconfig.json`:

~~~bash
touch tsconfig.json
~~~

2. Adicione as seguintes configurações no arquivo `tsconfig.json`:

~~~json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es6",
    "rootDir": "./src",
    "outDir": "./dist",
    "esModuleInterop": true,
    "strict": true
  }
}
~~~

3. Crie o diretório `src`:

~~~bash
mkdir src
~~~

4. Crie os arquivos `server.ts` e `app.ts`:

~~~bash
touch src/server.ts src/app.ts
~~~

5. Adicione o seguinte código no arquivo `app.ts`:

~~~typescript
// app.ts
import express, { Request, Response } from 'express';

const app = express();

app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.status(200).send('A API tá on!');
});

export default app;
~~~

6. Adicione o seguinte código no arquivo `server.ts`:

~~~typescript
// server.ts
import app from './app';

const PORT = process.env.APP_PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running at PORT: ${PORT}`);
});
~~~

7. Adicione os seguintes scripts no arquivo `package.json`:

~~~json
// ...
  "dev": "nodemon --watch \"./src/**\" ./src/server.ts",
  "tsnd": "tsnd ./src/server.ts",
  "start": "npm run build && node ./dist/index.js",
  "build": "tsc"
// ..
~~~

8. Rode a aplicação usando o script `dev`:

~~~bash
npm run dev
~~~

9. Faça uma requisição para a rota `/`:

~~~http
localhost:3001/
~~~

> OE: Mostre a resposta da requisição e que é exatamente o que nós colocamos pra retornar no arquivo `app.ts`, depois disso pare a aplicação utilizando Ctrl + C.

10. Rode a aplicação usando o script `tsnd`:

~~~bash
npm run tsnd
~~~

> OE: Faça novamente a requisição para a rota `/` e mostre que a resposta foi a mesma, o ponto aqui é mostrar que dá pra usar 2 recursos diferentes para rodar nossas aplicações, mas que o resultado é o mesmo. Fique a vontade caso queira modificar o arquivo `app.ts` e mostrar os servidores recarregando. A partir daqui você escolhe qual dos 2 scripts você irá usar.

11. Faça um commit descritivo

> OE: utilize a extensão `Conventional Commits`, se quiser, ou faça os commits de forma tradicional pelo terminal, ou use a aba `Source Control` do VSCode para fazer os commits.

12. Faça um push:

~~~bash
git push triboA cookmaster-configs-iniciais
git push triboB cookmaster-configs-iniciais
~~~

</details>

---

> OE: Final do primeiro momento. Tire dúvidas e deixe aberto para interação das PEs.
> Se tiver tempo para o começar e terminar o próximo momento, execute-o, se não, encerre a mentoria dando um leve spoiler do que será visto na próxima mentoria.

## Segundo momento - Configurando os containers

<details>
<summary><strong>Iniciando os Containers</strong></summary>

1. Crie uma branch nova:

~~~bash
gco -b cookmaster-docker
~~~

> OE: Os comandos a seguir estarão considerando que o seu terminal esteja dentro do diretório `raiz`

2. Criar o arquivo `docker-compose.yml`:

~~~bash
touch docker-compose.yml
~~~

3. Criar os arquivos `Dockerfile`

~~~bash
touch backend/Dockerfile frontend/Dockerfile 
~~~

4. Abra o arquivo `docker-compose` e adicionar as seguintes configurações:

> OE: adicione as configurações 1 por 1 e comente sobre elas, tirando dúvidas se surgirem;
> Na hora de escrever o `command` escolha o script que você tiver mais familiaridade ou preferência, `dev` ou `tsnd`;

~~~yml
version: '3.9'
services:
  frontend:
    container_name: cookmaster-fe
    build: ./frontend
    ports:
      - 3000:3000
    working_dir: /app-frontend
    volumes: 
      - ./frontend/src:/app-frontend/src
    depends_on:
      backend:
        condition: service_healthy
    # Os `healthcheck` devem garantir que a aplicação
    # está operacional, antes de liberar o container
    healthcheck:
      test: ["CMD", "lsof", "-t", "-i:3000"]  # Caso utilize outra porta interna para o front, altere ela aqui também
      timeout: 10s
      retries: 5
  backend:
    container_name: cookmaster-be
    build: ./backend
    ports:
      - 3001:3001
    working_dir: /app-backend
    # Caso queira que o container esteja atualizado durante o desenvolvimento, sem que você precise ficar fazendo down e up dos containers, descomente as 3 linhas abaixo
    # Escolha o script você vai adicionar aqui de acordo com o que você preferir usar, dev ou tsnd
    command: dev 
    volumes: 
      - ./backend/src:/app-backend/src
    depends_on:
      db:
        condition: service_healthy
    environment:
      - APP_PORT=3001
      - JWT_SECRET=jwt_secret
      # Os dados abaixo se referem ao container `db`
      # Dica: Relembre aqui da comunicação interna entre containers
      - DB_USER=root
      - DB_PASS=123456
      - DB_HOST=db
      - DB_PORT=3306
    healthcheck:
      test: ["CMD", "lsof", "-t", "-i:3001"] # Caso utilize outra porta interna para o back, altere ela aqui também
      timeout: 10s
      retries: 5
  db:
    image: mysql:8.0.21
    container_name: cookmaster-db
    ports:
      - 3002:3306
    environment:
      - MYSQL_ROOT_PASSWORD=123456
    restart: 'always'
    healthcheck:
      test: ["CMD", "mysqladmin" ,"ping", "-h", "localhost"] # Deve aguardar o banco ficar operacional
      timeout: 10s
      retries: 5
    cap_add:
      - SYS_NICE # Deve omitir alertas menores
~~~

5. Abra o arquivo `backend/Dockerfile` e adicione as seguintes configurações:

>OE: adicione as configurações 1 por 1 e comente sobre elas, tirando dúvidas se surgirem

~~~Dockerfile
FROM node:16.14-alpine

WORKDIR /app-backend

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 3001

ENTRYPOINT [ "npm", "run" ]

CMD [ "start" ]
~~~

6. Abra o arquivo `frontend/Dockerfile` e adicione as seguintes configurações:

>OE: adicione as configurações 1 por 1 e comente sobre elas, tirando dúvidas se surgirem

~~~Dockerfile
FROM node:16.14-alpine

WORKDIR /app-frontend

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 3000

ENTRYPOINT [ "npm", "run" ]

CMD [ "start" ]
~~~

7. Rode o comando para subir os containers:

~~~bash
docker-compose up -d
~~~

8. Mostre os logs do container do backend:

~~~bash
docker logs -f cookmaster-be
~~~

9. Mostre os logs do container do frontend:

~~~bash
docker logs -f cookmaster-fe
~~~

10. Mostre os logs do container do banco de dados:

~~~bash
docker logs -f cookmaster-db
~~~

> OE: User Ctrl + C para parar a exibição de qualquer um dos containers

11. Abra no navegador o caminho `localhost:3000` e mostre a aplicação frontend rodando

12. Abra no navegador o caminho `localhost:3001` e mostre a resposta do backend

> OE: É esperado aqui que essa parte gere dúvidas de como isso aconteceu e como o `Docker` subiu as aplicações e porque não é necessário rodar os comandos para subir as aplicações, volte nos Dockerfile's e mostre as linhas dos `ENTRYPOINT`s e `CMD`s, explique que essas duas linhas estão executando os comandos para rodar os scripts que vão subir as aplicações.

13. Faça um commit descritivo

> OE: utilize a extensão `Conventional Commits`, se quiser, ou faça os commits de forma tradicional pelo terminal, ou use a aba `Source Control` do VSCode para fazer os commits.

14. Faça um push:

~~~bash
git push triboA cookmaster-docker
git push triboB cookmaster-docker
~~~

</details>

---

> OE: Final do segundo momento. Tire dúvidas e deixe aberto para interação das PEs.
> Se tiver tempo para o começar e terminar o próximo momento, execute-o, se não, encerre a mentoria dando um leve spoiler do que será visto na próxima mentoria.

## Terceiro momento - Normalizando o banco de dados

Abra o [Excalidraw](https://excalidraw.com/#json=6wcoKP05324pM-kWfEPJc,8l9ZOf9zpwMn1Y8nOyL0XA) que contém o desenho inicial da nossa aplicação e vá para a parte do banco de dados, vamos explicar a lógica por trás dessa normalização.

Toda receita deve ter um `nome`, os `ingredientes` utilizados e o `modo de preparação`, para salvar no nosso banco, é ideal que cada receita tenha também um id único. Como podem ter vários ingredientes e que podem se repetir em mais de uma receita, o ideal é que exista uma tabela só para os ingredientes e uma tabela intermediária entre as receitas e os ingredientes.

<details>
<summary><strong>Estruturando o Banco</strong></summary>

1. Crie uma branch nova:

~~~bash
gco -b cookmaster-banco-de-dados
~~~

> OE: Os comandos a seguir estarão considerando que o seu terminal esteja dentro do diretório `backend`

2. Crie o diretório `database`:

~~~bash
mkdir src/database
~~~

3. Crie o arquivo `cookmaster.sql`:

~~~bash
touch src/database/cookmaster.sql
~~~

> OE: Os próximos passos estarão considerando que você está editando o arquivo `cookmaster.sql`
> Após cada passo, rode as querys

4. Adicione as querys para droppar e criar o banco:

~~~sql
DROP DATABASE IF EXISTS cookmaster;

CREATE DATABASE cookmaster;
~~~

5. Adicione a query para criar a tabela `recipes`:

~~~sql
CREATE TABLE cookmaster.recipes(
  id INTEGER NOT NULL PRIMARY KEY,
  name VARCHAR(25) NOT NULL,
  preparation VARCHAR(500) NOT NULL
);
~~~

6. Adicione a query para popular a tabela `recipes`:

~~~sql
INSERT INTO cookmaster.recipes VALUES
  (1, 'banana caramelizada', 'coloque o açúcar na frigideira até virar caramelo e jogue a banana'),
  (2, 'Frango do Jacquin', '10 min no forno'),
  (3, 'Pudim de leite condensado', 'bata o leite condensado, o creme de leite e os ovos no liquidificador por 5 minutos, enquanto isso, coloque o açúcar na frigideira até virar caramelo, ponha o caramelo em uma forma e despeje a misturam em cima, coloque para gelar'),
  (4, 'Bolo de fubá', 'coloque o fubá, a farinha de trigo e o fermento em pó em um recipiente e misture. Ponha no liquidificador, 3 ovos, o leite, o óleo e o açúcar. Junte as duas misturas e misture. Transfira a massa para uma forma untada. Leve para assar por 30 minutos'),
  (5, 'Arroz doce', 'Misture o arroz com a água fria numa panela grande para cozinhar. Com duas gemas e açúcar, faça uma gemada e misture com o leite condensado. Misture o arroz com a gemada, o leite condensado e o leite de coco e continue mexendo por 5 min'),
  (6, 'Bolo de abacate', 'Amasse o abacate até que vire uma pasta. Em uma batedeira, adicione o açúcar, a manteiga e bata até formar um creme depois adicione os outros ingredientes, adicione o abacate a massa. Despeje a massa em uma forma untada. Leve ao forno por 50 minutos');
~~~

7. Adicione a query para criar a tabela `ingredients`:

~~~sql
CREATE TABLE IF NOT EXISTS cookmaster.ingredients(
  id INTEGER NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);
~~~

8. Adicione a query para popular a tabela `ingredients`:

~~~sql
INSERT INTO cookmaster.ingredients VALUES
  (1, 'Abacate amassado'),
  (2, 'Açúcar'),
  (3, 'Água'),
  (4, 'Arroz'),
  (5, 'Banana'),
  (6, 'Baunilha'),
  (7, 'Canela em pó'),
  (8, 'Creme de leite'),
  (9, 'Farinha de trigo'),
  (10, 'Fermento em pó'),
  (11, 'Frango'),
  (12, 'Fubá'),
  (13, 'Gemas'),
  (14, 'Leite'),
  (15, 'Leite condensado'),
  (16, 'Leite de coco'),
  (17, 'Leite em pó'),
  (18, 'Manteiga'),
  (19, 'Óleo'),
  (20, 'Ovos');
~~~

9. Adicione a query para criar a tabela `recipes_ingredients`:

~~~sql
CREATE TABLE IF NOT EXISTS cookmaster.recipes_ingredients(
  `recipe_id` INT NOT NULL, 
  `ingredient_id` INT NOT NULL,
  FOREIGN KEY (`recipe_id`) REFERENCES cookmaster.recipes (id),
  FOREIGN KEY (`ingredient_id`) REFERENCES cookmaster.ingredients (id),
  PRIMARY KEY (`recipe_id`, `ingredient_id`)
);
~~~

10. Adicione a query para popular a tabela `recipes_ingredients`:

~~~sql
INSERT INTO cookmaster.recipes_ingredients VALUES
  (1, 5),
  (1, 2),
  (2, 11),
  (3, 15),
  (3, 8),
  (3, 20),
  (3, 2),
  (4, 12),
  (4, 9),
  (4, 10),
  (4, 20),
  (4, 14),
  (4, 19),
  (4, 2),
  (5, 4),
  (5, 15),
  (5, 13),
  (5, 2),
  (5, 16),
  (5, 7),
  (5, 3),
  (6, 1),
  (6, 9),
  (6, 18),
  (6, 2),
  (6, 20),
  (6, 6),
  (6, 10),
  (6, 17);
~~~

> OE: Mostre como ficou o banco e cada uma das tabelas

11. Faça um commit descritivo

> OE: utilize a extensão `Conventional Commits`, se quiser, ou faça os commits de forma tradicional pelo terminal, ou use a aba `Source Control` do VSCode para fazer os commits.

12. Faça um push:

~~~bash
git push triboA cookmaster-docker
git push triboB cookmaster-docker
~~~

</details>

---

> OE: Final do terceiro momento. Tire dúvidas e deixe aberto para interação das PEs.
> Se tiver tempo para o começar e terminar o próximo momento, execute-o, se não, encerre a mentoria dando um leve spoiler do que será visto na próxima mentoria.

## Quarto momento - Criando as Múltiplas camadas

Abra o [Excalidraw](https://excalidraw.com/#json=6wcoKP05324pM-kWfEPJc,8l9ZOf9zpwMn1Y8nOyL0XA) que contém o desenho inicial da nossa aplicação e vá para a parte do backend, mostre que iremos criar as camadas MSC e aborde dizendo que iremos usar TDD no desenvolvimento do nosso Backend.

Iremos fazer testes unitários para cada camada antes de desenvolver o código e no final de cada fluxo, iremos fazer testes de integração para esse fluxo.

<details>
<summary><strong>Configuração dos testes</strong></summary>

1. Crie uma branch nova:

~~~bash
gco -b cookmaster-crud-com-sql
~~~

> OE: Os comandos a seguir estarão considerando que o seu terminal esteja dentro do diretório `backend`

2. Instale as dependências que iremos utilizar para os testes:

~~~bash
npm i -D @istanbuljs/nyc-config-typescript chai chai-http mocha nyc sinon sinon-chai chai-as-promised @types/mocha @types/sinon @types/sinon-chai @types/chai-as-promised
~~~

3. Adicione os seguintes scripts no arquivo `package.json`:

~~~json
// ...
  "test": "mocha -r ts-node/register ./tests/{unit,integration}/**/*$NAME*.{test,spec}.ts -t 10000 --exit",
  "test:watch": "mocha -r ts-node/register  ./tests/{unit,integration}/**/*$NAME*.{test,spec}.ts --watch --recursive --exit",
  "coverage": "nyc npm run test",
  "coverage:watch": "nyc npm run test:watch"
// ..
~~~

4. Crie o arquivo `nyc.config.js`:

~~~bash
touch nyc.config.js
~~~

5. Adicione as seguintes configurações ao arquivo `nyc.config.js`:

~~~javascript
module.exports = {
  all: true,
  extends: "@istanbuljs/nyc-config-typescript",
  exclude: [
    'src/tests',
    'src/database/config',
    'src/database/migrations',
    'src/database/seeders',
    'src/database/models'
  ],
  include: ['src/**/*.ts']
};
~~~

6. Crie os diretórios `tests` e `tests/unit`:

~~~bash
mkdir tests tests/unit
~~~

7. Faça um commit descritivo

> OE: utilize a extensão `Conventional Commits`, se quiser, ou faça os commits de forma tradicional pelo terminal, ou use a aba `Source Control` do VSCode para fazer os commits.

8. Faça um push:

~~~bash
git push triboA cookmaster-crud-com-sql
git push triboB cookmaster-crud-com-sql
~~~

</details>

<details>
<summary><strong>Model GET /recipes</strong></summary>

> OE: Os comandos a seguir estarão considerando que o seu terminal esteja dentro do diretório `backend`

1. Crie o diretório `tests/unit/models`:

~~~bash
mkdir tests/unit/models
~~~

2. Crie o arquivo `Recipes.Model.test.ts`:

~~~bash
touch tests/unit/models/Recipes.Model.test.ts
~~~

> OE: Os próximos passos estarão considerando que você está editando o arquivo `Recipes.Model.test.ts`

3. Adicione as seguintes linhas ao arquivo:

~~~typescript
// tests/unit/models/Recipes.Model.test.ts
import * as sinon from 'sinon';
import * as chai from 'chai';
import { describe } from 'mocha';

const { expect } = chai;
~~~

4. Crie um `describe`:

~~~typescript
// tests/unit/models/Recipes.Model.test.ts
//...

describe('Model GET /recipes', () => {
  describe('Success cases', () => {});
  describe('Failure cases', () => {});
});

~~~

5. Dentro do `describe` de `Success cases` adicione o seguinte código:

~~~typescript
// tests/unit/models/Recipes.Model.test.ts
// ...

  describe('Success cases', () => {
    describe('if there are recipes registered', () => {
      before(() => {
        sinon.stub(connection, "execute").resolves(allRecipesDbResponse);
      });

      after(() => {
        sinon.restore();
      });

      it("return an array", async () => {
        const recipes = await recipesModel.getAll();
        expect(recipes).to.be.an('array');
      });

      it("return all recipes", async () => {
        const recipes = await recipesModel.getAll();
        expect(recipes).to.be.deep.equal(allRecipes);
      });
    });
  });
// ...

~~~

6. Dentro do `describe` de `Failure cases` adicione o seguinte código:

~~~typescript
// tests/unit/models/Recipes.Model.test.ts
// ...

  describe('Failure cases', () => {
    describe('if there are no recipes registered', () => {
      before(() => {
        sinon
          .stub(connection, "execute")
          .resolves([]);
      });

      after(() => {
        sinon.restore();
      });

      it("return a undefined", async () => {
        const recipes = await recipesModel.getAll();
        expect(recipes).to.be.undefined;
      });
    });
  });
// ...

~~~

> OE: Chame a atenção das PEs para o fato de ter alguns erros sendo apontados, que algumas coisas não estão referenciadas e que estamos tentando usar, coisas que ainda não existem, isso é normal no TDD.
> Sairemos do arquivo `Recipes.Model.test.ts`

7. Crie o diretório `mocks`:

~~~bash
mkdir tests/mocks
~~~

8. Crie o arquivo `recipes.mock.ts`:

~~~bash
touch tests/mocks/recipes.mock.ts
~~~

9. Abra o arquivo `tests/mocks/recipes.mock.ts` e adicione as seguintes linhas:

~~~typescript
// tests/mocks/recipes.mock.ts
const allRecipesDbResponse = [ 
  [
    {
      id: 1,
      name: 'banana caramelizada',
      preparation: 'coloque o açúcar na frigideira até virar caramelo e jogue a banana',
      ingredients: [
        'Açúcar',
        'Banana'
      ]
    },
    {
      id: 2,
      name: 'Frango do Jacquin',
      preparation: '10 min no forno',
      ingredients: [
        'Frango'
      ]
    },
    {
      id: 3,
      name: 'Pudim de leite condensado',
      preparation: 'bata o leite condensado, o creme de leite e os ovos no liquidificador por 5 minutos, enquanto isso, coloque o açúcar na frigideira até virar caramelo, ponha o caramelo em uma forma e despeje a misturam em cima, coloque para gelar',
      ingredients: [
        'Açúcar',
        'Creme de leite',
        'Leite condensado',
        'Ovos'
      ]
    },
    {
      id: 4,
      name: 'Bolo de fubá',
      preparation: 'coloque o fubá, a farinha de trigo e o fermento em pó em um recipiente e misture. Ponha no liquidificador, 3 ovos, o leite, o óleo e o açúcar. Junte as duas misturas e misture. Transfira a massa para uma forma untada. Leve para assar por 30 minutos',
      ingredients: [
        'Açúcar',
        'Farinha de trigo',
        'Fermento em pó',
        'Fubá',
        'Leite',
        'Óleo',
        'Ovos'
      ]
    },
    {
      id: 5,
      name: 'Arroz doce',
      preparation: 'Misture o arroz com a água fria numa panela grande para cozinhar. Com duas gemas e açúcar, faça uma gemada e misture com o leite condensado. Misture o arroz com a gemada, o leite condensado e o leite de coco e continue mexendo por 5 min',
      ingredients: [
        'Açúcar',
        'Água',
        'Arroz',
        'Canela em pó',
        'Gemas',
        'Leite condensado',
        'Leite de coco'
      ]
    },
    {
      id: 6,
      name: 'Bolo de abacate',
      preparation: 'Amasse o abacate até que vire uma pasta. Em uma batedeira, adicione o açúcar, a manteiga e bata até formar um creme depois adicione os outros ingredientes, adicione o abacate a massa. Despeje a massa em uma forma untada. Leve ao forno por 50 minutos',
      ingredients: [
        'Abacate amassado',
        'Açúcar',
        'Baunilha',
        'Farinha de trigo',
        'Fermento em pó',
        'Leite em pó',
        'Manteiga',
        'Ovos'
      ]
    }
  ]
]

const allRecipes = [
  {
    id: 1,
    name: 'banana caramelizada',
    preparation: 'coloque o açúcar na frigideira até virar caramelo e jogue a banana',
    ingredients: [
      'Açúcar',
      'Banana'
    ]
  },
  {
    id: 2,
    name: 'Frango do Jacquin',
    preparation: '10 min no forno',
    ingredients: [
      'Frango'
    ]
  },
  {
    id: 3,
    name: 'Pudim de leite condensado',
    preparation: 'bata o leite condensado, o creme de leite e os ovos no liquidificador por 5 minutos, enquanto isso, coloque o açúcar na frigideira até virar caramelo, ponha o caramelo em uma forma e despeje a misturam em cima, coloque para gelar',
    ingredients: [
      'Açúcar',
      'Creme de leite',
      'Leite condensado',
      'Ovos'
    ]
  },
  {
    id: 4,
    name: 'Bolo de fubá',
    preparation: 'coloque o fubá, a farinha de trigo e o fermento em pó em um recipiente e misture. Ponha no liquidificador, 3 ovos, o leite, o óleo e o açúcar. Junte as duas misturas e misture. Transfira a massa para uma forma untada. Leve para assar por 30 minutos',
    ingredients: [
      'Açúcar',
      'Farinha de trigo',
      'Fermento em pó',
      'Fubá',
      'Leite',
      'Óleo',
      'Ovos'
    ]
  },
  {
    id: 5,
    name: 'Arroz doce',
    preparation: 'Misture o arroz com a água fria numa panela grande para cozinhar. Com duas gemas e açúcar, faça uma gemada e misture com o leite condensado. Misture o arroz com a gemada, o leite condensado e o leite de coco e continue mexendo por 5 min',
    ingredients: [
      'Açúcar',
      'Água',
      'Arroz',
      'Canela em pó',
      'Gemas',
      'Leite condensado',
      'Leite de coco'
    ]
  },
  {
    id: 6,
    name: 'Bolo de abacate',
    preparation: 'Amasse o abacate até que vire uma pasta. Em uma batedeira, adicione o açúcar, a manteiga e bata até formar um creme depois adicione os outros ingredientes, adicione o abacate a massa. Despeje a massa em uma forma untada. Leve ao forno por 50 minutos',
    ingredients: [
      'Abacate amassado',
      'Açúcar',
      'Baunilha',
      'Farinha de trigo',
      'Fermento em pó',
      'Leite em pó',
      'Manteiga',
      'Ovos'
    ]
  }
]

export { allRecipesDbResponse, allRecipes }

~~~

10. Faça a importação das constantes `allRecipesDbResponse` e `allRecipes` no arquivo `tests/unit/models/Recipes.Model.test.ts`:

~~~typescript
// tests/unit/models/Recipes.Model.test.ts
// ...

import { allRecipesDbResponse, allRecipes } from '../../mocks/recipes.mock';

// ...
~~~

> OE: É esperado que dê o erro `'rootDir' is expected to contain all source files.`, vamos arrumar isso logo abaixo

11. Adicione uma configuração no arquivo `tsconfig.json`:

~~~json
// "compilerOptions": {
   // ...
//  },
"exclude": ["tests", "**/*.test.ts"]
~~~

12. Crie o diretório `src/models`:

~~~bash
mkdir src/models
~~~

13. Crie o arquivo `Recipes.Model.ts`:

~~~bash
touch src/models/Recipes.Model.ts
~~~

14. Abra o arquivo `src/models/Recipes.Model.ts` e adicione as seguintes linhas:

~~~typescript
// src/models/Recipes.Model.ts
export default abstract class RecipesModel { 
  constructor() {} 
}
~~~

15. Importe e instancie a classe `RecipesModel` no arquivo `tests/unit/models/Recipes.Model.test.ts`:

~~~typescript
// tests/unit/models/Recipes.Model.test.ts
// ...
// import { allRecipesDbResponse, allRecipes } from '../../mocks/recipes.mock';
import RecipesModel from '../../../src/models/Recipes.Model';

const recipesModel = new RecipesModel();
// ...
~~~

> OE: É esperado que dê erro falando que `a propriedade 'getAll' não existe no tipo 'RecipesModel'`, mostre isso para as PEs, vamos corrigir isso mais abaixo.

16. Crie o método `getAll` dentro da classe `RecipesModel`:

~~~typescript
// src/models/Recipes.Model.ts
// export default abstract class RecipesModel { 
//   constructor() {} 

  public async getAll() {}
// }
~~~

> OE: Mostre que o erro anterior sumiu, mas ainda temos um erro com o `connection`, ainda não foi declarado, mostre isso para as PEs
> E teremos também um erro de que o tipo `IRecipe` não foi declarado, iremos resolver isso mais tarde.

17. Crie o arquivo `connection.ts`:

~~~bash
touch src/models/connection.ts
~~~

18. Abra o arquivo `src/models/connection.ts` e adicione as seguintes linhas:

~~~typescript
const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '123456',
  port: process.env.MYSQL_PORT || '3002',
  multipleStatements: true,
});

export default connection;
~~~

19. Faça a importação do `connection` no arquivo `tests/unit/models/Recipes.Model.test.ts`

~~~typescript
// tests/unit/models/Recipes.Model.test.ts
// ...
// import RecipesModel from '../../../src/models/Recipes.Model';
import connection from '../../../src/models/connection';

// ...
~~~

> OE: Mostre que não tem mais erros nos arquivos

20. Execute algum script de teste:

~~~bash
npm test
npm run test:watch
npm run coverage
npm run coverage:watch
~~~

> OE: Mostre o terminal após a execução dos testes, é esperado que o it `return a undefined` está passando antes da implementação, mude a assertion para `.not.to.be.undefined` e mostre que o it quebra.

21. Crie o diretório `src/interfaces`:

~~~bash
mkdir src/interfaces
~~~

22. Crie o arquivo `IRecipe.interface.ts`:

~~~bash
touch src/interfaces/IRecipe.interface.ts
~~~

23. Abra o arquivo `src/interfaces/IRecipe.interface.ts` e adicione as seguintes linhas:

~~~typescript
// src/interfaces/IRecipe.interface.ts
export interface IRecipe {
  id?: number;
  name: string;
  ingredients: string[];
  preparation: string;
}
~~~

24. Importe a interface `IRecipe` no arquivo `src/models/Recipes.Model.ts` e tipe o retorno do método `getAll`:

~~~typescript
// src/models/Recipes.Model.ts
import { IRecipe } from "../interfaces/IRecipe.interface";

// ...
  public async getAll(): Promise<IRecipe[] | undefined> {}

// ...
~~~

25. Adicione as seguintes linhas no arquivo `src/models/Recipes.Model.ts` :

~~~typescript
// src/models/Recipes.Model.ts
// ...

  // public async getAll(): Promise<IRecipe[] | undefined> {
    const query = `SELECT r.id, r.name, preparation, JSON_ARRAYAGG(i.name) as ingredients
      FROM cookmaster.recipes as r JOIN cookmaster.recipes_ingredients as rp ON r.id = rp.recipe_id
      JOIN cookmaster.ingredients as i ON i.id = rp.ingredient_id GROUP BY r.id ORDER BY r.id;`

    const [recipes] = await connection.execute(query);

    return recipes;
  // }
// ...
~~~

> OE: Rode novamente os testes e mostre eles passando.

26. Faça um commit descritivo

> OE: utilize a extensão `Conventional Commits`, se quiser, ou faça os commits de forma tradicional pelo terminal, ou use a aba `Source Control` do VSCode para fazer os commits.

27. Faça um push:

~~~bash
git push triboA cookmaster-crud-com-sql
git push triboB cookmaster-crud-com-sql
~~~

</details>

<details>
<summary><strong>Service GET /recipes</strong></summary>

> OE: Os comandos a seguir estarão considerando que o seu terminal esteja dentro do diretório `backend`

1. Crie o diretório `tests/unit/services`:

~~~bash
mkdir tests/unit/services
~~~

2. Crie o arquivo `Recipes.Service.test.ts`:

~~~bash
touch tests/unit/services/Recipes.Service.test.ts
~~~

> OE: Os próximos passos estarão considerando que você está editando o arquivo `Recipes.Service.test.ts`

3. Adicione as seguintes linhas ao arquivo:

~~~typescript
// tests/unit/services/Recipes.Service.test.ts
import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { describe } from 'mocha';
import RecipesModel from '../../../src/models/Recipes.Model';
import { allRecipes } from '../../mocks/recipes.mock';
import { IRecipe } from '../../../src/interfaces/IRecipe.interface';

const recipesModel = new RecipesModel();

chai.use(chaiAsPromised);

const { expect } = chai;
~~~

> OE: Diga que já está aproveitando algumas coisas do teste do Model

4. Crie um `describe`:

~~~typescript
// tests/unit/services/Recipes.Service.test.ts
//...

describe('Service GET /recipes', () => {
  describe('Success cases', () => {});
  describe('Failure cases', () => {});
});

~~~

5. Dentro do `describe` de `Success cases` adicione o seguinte código:

~~~typescript
// tests/unit/services/Recipes.Service.test.ts
// ...

  describe('Success cases', () => {
    describe('if there are recipes registered', () => {
      before(() => {
        sinon.stub(recipesModel, "getAll").resolves(allRecipes as IRecipe[]);
      });

      after(() => {
        sinon.restore();
      });

      it("return an array", async () => {
        const recipes = await recipesService.getAll();
        expect(recipes).to.be.an('array');
      });

      it("return all recipes", async () => {
        const recipes = await recipesService.getAll();
        expect(recipes).to.be.deep.equal(allRecipes);
      });
    });
  });
// ...

~~~

6. Dentro do `describe` de `Failure cases` adicione o seguinte código:

~~~typescript
// tests/unit/services/Recipes.Service.test.ts
// ...

  describe('Failure cases', () => {
    describe('if there are no recipes registered', () => {
      before(() => {
        sinon
          .stub(recipesModel, "getAll")
          .resolves(undefined);
      });

      after(() => {
        sinon.restore();
      });

      it("return a undefined", async () => {
        return expect(recipesService.getAll()).to.be.rejectedWith('NoRecipesFound');
      });
    });
  });
// ...

~~~

> OE: Chame a atenção das PEs para o fato de que novamente temos alguns de que estamos tentando usar coisas que ainda não existem.

7. Crie o diretório `src/services`:

~~~bash
mkdir src/services
~~~

8. Crie o arquivo `Recipes.Service.ts`:

~~~bash
touch src/services/Recipes.Service.ts
~~~

9. Abra o arquivo `src/services/Recipes.Service.ts` e adicione as seguintes linhas:

~~~typescript
// src/services/Recipes.Service.ts
export default abstract class RecipesService { 
  constructor() {} 
}
~~~

10. Importe e instancie a classe `RecipesService` no arquivo `tests/unit/services/Recipes.Service.test.ts`:

~~~typescript
// tests/unit/services/Recipes.Service.test.ts
// ...
// import RecipesModel from '../../../src/models/Recipes.Model';
import RecipesService from '../../../src/services/Recipes.Service';
// ...

// const recipesModel = new RecipesModel();
const recipesService = new RecipesService();
// ...
~~~

> OE: É esperado que dê erro falando que `a propriedade 'getAll' não existe no tipo 'RecipesService'`, mostre isso para as PEs, vamos corrigir isso mais abaixo.

11. Crie o método `getAll` dentro da classe `RecipesService`:

~~~typescript
// src/services/Recipes.Service.ts
// export default abstract class RecipesService { 
//   constructor() {} 

  public async getAll() {}
// }
~~~

> OE: Mostre que não tem mais erros nos arquivos

12. Execute algum script de teste:

~~~bash
npm test
npm run test:watch
npm run coverage
npm run coverage:watch
~~~

> OE: Chame a atenção para o fato dos testes não estarem passando

13. Importe a interface `IRecipe` no arquivo `src/services/Recipes.Service.ts` e tipe o retorno do método `getAll`:

~~~typescript
// src/services/Recipes.Service.ts
import { IRecipe } from "../interfaces/IRecipe.interface";

// ...
  public async getAll(): Promise<IRecipe[]> {}

// ...
~~~

14. Adicione as seguintes linhas no arquivo `src/services/Recipes.Service.ts` :

~~~typescript
// src/services/Recipes.Service.ts
// import { IRecipe } from "../interfaces/IRecipe.interface";
import RecipesModel from "../models/Recipes.Model";

// export default class RecipesService {
  constructor(private _model = new RecipesModel()) {}

  // public async getAll(): Promise<IRecipe[]> {
    const recipes = await this._model.getAll();

    if (!recipes) throw new Error('NoRecipesFound');
    
    return recipes;
//   }
// }
~~~

> OE: Rode novamente os testes e mostre eles passando.

15. Faça um commit descritivo

> OE: utilize a extensão `Conventional Commits`, se quiser, ou faça os commits de forma tradicional pelo terminal, ou use a aba `Source Control` do VSCode para fazer os commits.

16. Faça um push:

~~~bash
git push triboA cookmaster-crud-com-sql
git push triboB cookmaster-crud-com-sql
~~~

</details>

<details>
<summary><strong>Controller GET /recipes</strong></summary>

> OE: Os comandos a seguir estarão considerando que o seu terminal esteja dentro do diretório `backend`

1. Crie o diretório `tests/unit/controllers`:

~~~bash
mkdir tests/unit/controllers
~~~

2. Crie o arquivo `Recipes.Controller.test.ts`:

~~~bash
touch tests/unit/controllers/Recipes.Controller.test.ts
~~~

> OE: Os próximos passos estarão considerando que você está editando o arquivo `Recipes.Controller.test.ts`

3. Adicione as seguintes linhas ao arquivo:

~~~typescript
// tests/unit/controllers/Recipes.Controller.test.ts
import * as sinon from 'sinon';
import * as chai from 'chai';
import { describe } from 'mocha';
import RecipesModel from '../../../src/models/Recipes.Model';
import RecipesService from '../../../src/services/Recipes.Service';
import { allRecipes } from '../../mocks/recipes.mock';
import { IRecipe } from '../../../src/interfaces/IRecipe.interface';
import chaiAsPromised from 'chai-as-promised';
import sinonChai from 'sinon-chai';

const recipesModel = new RecipesModel();
const recipesService = new RecipesService(recipesModel);

chai.use(chaiAsPromised);
chai.use(sinonChai);

const { expect } = chai;
~~~

> OE: Diga que já está aproveitando algumas coisas do teste do Model

4. Crie um `describe`:

~~~typescript
// tests/unit/controllers/Recipes.Controller.test.ts
//...

describe('Controller GET /recipes', () => {
  describe('Success cases', () => {});
  describe('Failure cases', () => {});
});

~~~

5. Dentro do `describe` de `Success cases` adicione o seguinte código:

~~~typescript
// tests/unit/controllers/Recipes.Controller.test.ts
// ...
  import { Request, Response } from 'express';

// ...
// describe('Controller GET /recipes', () => {
  const request = {} as Request;
  const response = {} as Response;
  response.status = sinon.stub().returns(response);
  response.json = sinon.stub().returns(response);

  describe('Success cases', () => {
    before(() => {
      sinon.stub(recipesService, "getAll").resolves(allRecipes);
    });

    after(() => {
      sinon.restore();
    });

    it("return status 200", async () => {
      await recipesController.getAll(request, response);
      expect(response.status).to.have.been.calledWith(200);
    });

    it("return all recipes", async () => {
      await recipesController.getAll(request, response);
      expect(response.json).to.have.been.calledWith(allRecipes);
    });
  });
// ...

~~~

6. Dentro do `describe` de `Failure cases` adicione o seguinte código:

~~~typescript
// tests/unit/services/Recipes.Service.test.ts
// ...

  describe('Failure cases', () => {
    const request = {} as Request;
    const response = {} as Response;
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns(response);

    before(() => {
      sinon
        .stub(recipesService, "getAll")
        .onCall(0)
        .throws(new Error('NoRecipesFound'))
        .onCall(1)
        .throws(new Error('Any error'));
    });

    after(() => {
      sinon.restore();
    });

    describe('if there are no recipes registered', () => {
      it("return status 404", async () => {
        await recipesController.getAll(request, response);
        expect(response.status).to.have.been.calledWith(404);
      });

      it("return message 'No recipes found'", async () => {
        await recipesController.getAll(request, response);
        expect(response.json).to.have.been.calledWith({
          message: "No recipes found",
        });
      });
    });

    describe('if there is an error on the server', () => {
      it("return status 500", async () => {
        await recipesController.getAll(request, response);
        expect(response.status).to.have.been.calledWith(500);
      });

      it("return message 'Internal Server Error'", async () => {
        await recipesController.getAll(request, response);
        expect(response.json).to.have.been.calledWith({
          message: "Internal Server Error",
        });
      });
    });
  });
// ...

~~~

> OE: Chame a atenção das PEs para o fato de ter alguns erros sendo apontados, que algumas coisas não estão referenciadas e que estamos coisas que ainda não existem, isso é normal no TDD.
> Sairemos do arquivo `Recipes.Controller.test.ts`

---

7. Crie o diretório `controllers`:

~~~bash
mkdir src/controllers
~~~

8. Crie o arquivo `Recipes.Controller.ts`:

~~~bash
touch src/controllers/Recipes.Controller.ts
~~~

9. Abra o arquivo `src/controllers/Recipes.Controller.ts` e adicione as seguintes linhas:

~~~typescript
// src/controllers/Recipes.Controller.ts
export default class RecipesController { 
  constructor() {} 
}
~~~

10. Importe e instancie a classe `Controller` no arquivo `tests/unit/controllers/Recipes.Controller.test.ts`:

~~~typescript
// ...
// import RecipesService from '../../../src/services/Recipes.Service';
import RecipesController from '../../src/controllers/Recipes.Controller';

// ...
const recipesService = new RecipesService(recipesModel);
const recipesController = new RecipesController(recipesService);
// ...
~~~

> OE: É esperado que dê erro falando que a classe esperava 0 argumentos e recebeu 1, mostre isso para as PEs, vamos corrigir isso mais abaixo.
> É esperado que dê erro falando que `a propriedade 'getAll' não existe no tipo 'RecipesController'`, mostre isso para as PEs, vamos corrigir isso mais abaixo.

11. Crie o método `getAll` dentro da classe `RecipesController`:

~~~typescript
// src/services/Recipes.Controller.ts

import { Request, Response } from "express";

// export default abstract class RecipesController { 
//   constructor() {} 

  public async getAll(req: Request, res: Response) {}
// }
~~~

12. Execute algum script de teste:

~~~bash
npm test
npm run test:watch
npm run coverage
npm run coverage:watch
~~~

> OE: Chame a atenção para o fato dos testes não estarem passando

13. Importe a interface `IRecipe` no arquivo `src/services/Recipes.Controller.ts` e tipe o retorno do método `getAll`:

~~~typescript
// src/services/Recipes.Controller.ts
import { IRecipe } from "../interfaces/IRecipe.interface";

// ...
  public async getAll(req: Request, res: Response): Promise<Response<IRecipe[]>> {}

// ...
~~~

14. Adicione as seguintes linhas no arquivo `src/controller/Recipes.Controller.ts` :

~~~typescript
// src/controller/Recipes.Controller.ts
// import { IRecipe } from "../interfaces/IRecipe.interface";
import RecipeService from "../services/Recipes.Service"

// export default class RecipesService {
  constructor(private _service = new RecipeService()) {}

  // public async getAll(): Promise<IRecipe[]> {

    try {
      const recipes = this._service.getAll()

      return res.status(200).json(recipes);
    } catch (err) {
      if (err instanceof Error && err.message === 'NoRecipesFound') {
        return res.status(404).json({ message: 'No recipes found' });
      }
      return res.status(500).json({ message: 'Internal Server Error' });
    }
//   }
// }
~~~

> OE: Rode novamente os testes e mostre eles passando.

15. Faça um commit descritivo

> OE: utilize a extensão `Conventional Commits`, se quiser, ou faça os commits de forma tradicional pelo terminal, ou use a aba `Source Control` do VSCode para fazer os commits.

16. Faça um push:

~~~bash
git push triboA cookmaster-crud-com-sql
git push triboB cookmaster-crud-com-sql
~~~

</details>

---

> OE: Final do quarto momento. Tire dúvidas e deixe aberto para interação das PEs.
> Se tiver tempo para o começar e terminar o próximo momento, execute-o, se não, encerre a mentoria dando um leve spoiler do que será visto na próxima mentoria.

~~~typescript

~~~

<details>
<summary><strong></strong></summary>
</details>

~~~bash

~~~
