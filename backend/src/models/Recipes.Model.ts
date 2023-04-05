import { IRecipe } from "../interfaces/IRecipe.interface";
import connection from "./connection"

export default class RecipesModel { 
  constructor() {}

  public async getAll(): Promise<IRecipe[] | undefined> {
    const query = `SELECT r.id, r.name, preparation, JSON_ARRAYAGG(i.name) as ingredients
      FROM cookmaster.recipes as r JOIN cookmaster.recipes_ingredients as rp ON r.id = rp.recipe_id
      JOIN cookmaster.ingredients as i ON i.id = rp.ingredient_id GROUP BY r.id ORDER BY r.id;`

    const [recipes] = await connection.execute(query);

    return recipes;
  }
}