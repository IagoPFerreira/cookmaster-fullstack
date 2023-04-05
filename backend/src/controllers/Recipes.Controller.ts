import { Request, Response } from "express";
import { IRecipe } from "../interfaces/IRecipe.interface";
import RecipesService from "../services/Recipes.Service";

export default class RecipesController { 
  constructor(private _service = new RecipesService()) {}

  public async getAll(req: Request, res: Response): Promise<Response<IRecipe[]>> {
    try {
      const recipes = await this._service.getAll()

      return res.status(200).json(recipes);
    } catch (err) {
      if (err instanceof Error && err.message === 'NoRecipesFound') {
        return res.status(404).json({ message: 'No recipes found' });
      }
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}