import { Router } from 'express';
import RecipesController from '../controllers/Recipes.Controller';

const recipesController = new RecipesController();

const router = Router();

router.route('/recipes')
  .get((req, res, next) => recipesController.getAll(req, res, next))

export default router;
