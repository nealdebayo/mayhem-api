'use strict';
const sinon = require('sinon');
require('sinon-mongoose');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const expect = chai.expect;

chai.use(sinonChai);
const Petition = require('../api/models/petition');
const petitionController = require('../api/controllers/petition.controller');

const expressMocks = require('sinon-express-mock');

describe('petitions API', function() {
  describe('get all petitions', function() {
    it('should return all petitions', function(done) {
      // this is what we're hoping to see as a result
      const expectedResult = {
        petitions: [{
          _id: 'testId',
          charge: 'Test petition charge details',
          punishment: 'Test punishment',
          createdAt: '2018-09-06T14:18:38.691Z',
          updatedAt: '2018-09-06T14:18:38.691Z'
        }],
        count: 1
      };

      // the mock data that we're going to return from the DB
      const dbValue = [
        {
          _id: 'testId',
          punishment: 'Test punishment',
          charge: 'Test petition charge details',
          createdAt: '2018-09-06T14:18:38.691Z',
          updatedAt: '2018-09-06T14:18:38.691Z'
        },
      ];

      // create a mock Petition object so we can inject the database data when we want
      var PetitionMock = sinon.mock(Petition);
      // have the mongoose mock framework return the test data when we call the DB
      PetitionMock.expects('find').chain('exec').resolves(dbValue);

      // mock value for checking the result
      var res = expressMocks.mockRes();
      // not using this here, but we can use this to inject params into the calls
      var req = expressMocks.mockReq();

      // call the controller method and check the result in the callback
      petitionController.getAllPetitions(req, res, function() {
        expect(res.status).to.be.calledWith(200);
        expect(res.json).to.be.calledWith(expectedResult);
        done();
      });
    });
  });
});
