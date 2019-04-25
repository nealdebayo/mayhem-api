'use strict';
const petitionService = require('../services/petition.service');

module.exports = {
  getAllPetitions: function(req, res, next) {
    petitionService.getPetitions()
      .then(petitions => {
        const response = {
          count: petitions.length,
          petitions: petitions
        };
        res.status(200).json(response);
        next();
      }).catch(err => {
        console.error(err);
        res.status(500).json({error: err});
        next();
      });
  },
  getAPetition: function(req, res, next) {
    petitionService.getPetition(req.params.petitionId).then(petition => {
      if (petition) {
        res.status(200).json({
          message: 'Here are the petition details',
          petitionDetails: petition
        });
        next();
      } else {
        res.status(404).json({message: 'The resource you requested is not available'});
        next();
      }
    }).catch(err => {
      console.error(err);
      res.status(500).json({error: err});
      next();
    });
  },
  addNewPetition: function(req, res, next) {
    // TODO: pass in defendant/defendantID in some fashion
    petitionService.addPetition(req.body, req.user)
      .then(petition => {
        res.status(201).json({
          message: 'New petition successfully created',
          createdPetition: petition
        });
        next();
      }).catch(err => {
        console.error(err);
        res.status(500).json({error: err});
        next();
      });
  },
  changeAPetition: function(req, res, next) {
    petitionService.changePetition(req.params.petitionId, req.body)
      .then(petition => {
        res.status(200).json({
          message: 'petition has been updated',
          updatedPetition: petition
        });
        next();
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({error: err});
        next();
      });
  },
  removeAPetition: function(req, res, next) {
    petitionService.removePetition(req.params.petitionId)
      .then(item => {
        res.status(200).json({
          message: 'Petition deleted'
        });
        next();
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({error: err});
        next();
      });
  },
  setVerdict: function(req, res, next) {
    petitionService.setVerdict(req.params.petitionId, req.params.verdictvalue, req.user)
      .then(petition => {
        res.status(200).json({
          message: 'Petition verdict set',
          updatedPetition: petition
        });
        next();
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({error: err});
        next();
      });
  }
};
