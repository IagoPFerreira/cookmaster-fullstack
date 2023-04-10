import * as sinon from 'sinon';
import * as chai from 'chai';
import { describe } from 'mocha';
import RecipesModel from '../../../src/models/Recipes.Model';
import RecipesService from '../../../src/services/Recipes.Service';
import RecipesController from '../../../src/controllers/Recipes.Controller';
import { allRecipes } from '../../mocks/recipes.mock';
import { IRecipe } from '../../../src/interfaces/IRecipe.interface';
import chaiAsPromised from 'chai-as-promised';
import sinonChai from 'sinon-chai';
import { NextFunction, Request, Response } from 'express';

const recipesModel = new RecipesModel();
const recipesService = new RecipesService(recipesModel);
const recipesController = new RecipesController(recipesService);

chai.use(chaiAsPromised);
chai.use(sinonChai);

const { expect } = chai;

describe('Controller GET /recipes', () => {
  describe('Success cases', () => {
    const request = {} as Request;
    const response = {} as Response;
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns(response);
    const nextFunction = sinon.spy() as NextFunction;

    before(() => {
      sinon.stub(recipesService, "getAll").resolves(allRecipes);
    });

    after(() => {
      sinon.restore();
    });

    it("return status 200", async () => {
      await recipesController.getAll(request, response, nextFunction);
      expect(response.status).to.have.been.calledWith(200);
    });

    it("return all recipes", async () => {
      await recipesController.getAll(request, response, nextFunction);
      expect(response.json).to.have.been.calledWith(allRecipes);
    });
  });

  describe('Failure cases', () => {
    const request = {} as Request;
    const response = {} as Response;
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns(response);
    const nextFunction = sinon.spy() as NextFunction;

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
      it("call the 'next' function with the error 'NoRecipesFound'", async () => {
        await recipesController.getAll(request, response, nextFunction);
        expect(nextFunction).to.have.been.calledWith({ message: "NoRecipesFound" });
      });
    });

    describe('if there is an error on the server', () => {
      it("call the 'next' function with the error 'Internal Server Error'", async () => {
        await recipesController.getAll(request, response, nextFunction);
        expect(nextFunction).to.have.been.calledWith({ message: "Any error" });
      });
    });
  });
});