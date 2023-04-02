# Roteiro para as mentorias do Cookmaster

Sequência de mentorias desenvolvidas para serem aplicadas na Turma 25, com o propósito de revisar e reforçar conteúdos nos quais as pessoas estudantes posuem dificuldades, esses conteúdos foram apontados pelas próprias pessoas estudantes no preenchimento [deste forms](https://forms.gle/6EdTi8LecdZVUiyt9), o resultado desse forms pode ser verificado [aqui](https://betrybe.slack.com/archives/C03N2F2FGKA/p1680096291916419?thread_ts=1680016591.667539&cid=C03N2F2FGKA).

Esse projeto vai ser desenvolvido do 0, desde da criação dos diretórios iniciais, até o deploy das aplicações totalmente funcionais e será um projeto Fullstack.

O ideal é que os momentos sejam iniciados e finalizados na mesma mentoria, é possível que dependendo do tempo da mentoria, só seja possível realizar 1 momento por mentoria, mas caso tenha tempo para finalizar mais de 1 momento, fique a vontade para tocar quantos momentos forem cabíveis, desde que iniciem e finalizem em uma mesma mentoria, para não perder a linearidade nem o raciocínio.

Cada momento começa exatamente do final do anterior, é possível encontrar de forma comprimida o código e o que foi desenvolvido em cada momento neste mesmo repositório.

# Primeiro momento - Configurando o projeto

Visto que o projeto vai ser desenvolvido do 0, é bom mostrar para as pessoas estudantes o que nós iremos desenvolver, para isso, podemos usar um rascunho do que será desenvolvido [Excalidraw](https://excalidraw.com/#json=lkiElqkQBpb8UAdIoGBlE,Kq3kWqJxSfpySu8a3eEXuw).

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

# Segundo momento - Configurando os containers

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

~~~typescript

~~~

<details>
<summary><strong></strong></summary>
</details>

~~~bash

~~~
