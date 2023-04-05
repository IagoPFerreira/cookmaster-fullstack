import * as sinon from 'sinon';
import * as chai from 'chai';
import { describe } from 'mocha';

import { allRecipesDbResponse, allRecipes } from '../../mocks/recipes.mock';
import RecipesModel from '../../../src/models/Recipes.Model';
import connection from '../../../src/models/connection';

const recipesModel = new RecipesModel();

const { expect } = chai;

describe('Model GET /recipes', () => {
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
});
