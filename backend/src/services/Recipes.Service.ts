import { IRecipe } from "../interfaces/IRecipe.interface";
import RecipesModel from "../models/Recipes.Model";

export default class RecipesService {
  constructor(private _model = new RecipesModel()) {}

  public async getAll(): Promise<IRecipe[]> {
    const recipes = await this._model.getAll();

    if (!recipes) throw new Error('NoRecipesFound');
    
    return recipes;
  }
}