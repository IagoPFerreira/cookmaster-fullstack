import * as sinon from 'sinon';
import * as chai from 'chai';
import { describe } from 'mocha';
import RecipesModel from '../../../src/models/Recipes.Model';
import RecipesService from '../../../src/services/Recipes.Service';
import { allRecipes } from '../../mocks/recipes.mock';
import { IRecipe } from '../../../src/interfaces/IRecipe.interface';
import chaiAsPromised from 'chai-as-promised';

const recipesModel = new RecipesModel();
const recipesService = new RecipesService(recipesModel);

chai.use(chaiAsPromised);

const { expect } = chai;

describe('Service GET /recipes', () => {
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

      it("throws a 'NoRecipesFound' Error", async () => {
        return expect(recipesService.getAll()).to.be.rejectedWith('NoRecipesFound');
      });
    });
  });
});