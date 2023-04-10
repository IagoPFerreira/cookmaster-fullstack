import express, { Request, Response } from 'express';
import recipesRouter from './routers/Recipes.Router';

const app = express();

app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.status(200).send('A API tá on fire!');
});

app.use(recipesRouter);

export default app;