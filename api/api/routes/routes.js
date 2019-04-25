'use strict';
const express = require('express');
const router = express.Router();
const petitionController = require('../controllers/petition.controller');
const authController = require('../controllers/authentication.controller');
const profileController = require('../controllers/profile.controller');

var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.JWT_SECRET
});

module.exports = router;

router.get('/petitions', petitionController.getAllPetitions);
router.get('/petitions/:petitionId', petitionController.getAPetition);
router.post('/petitions', auth, petitionController.addNewPetition);
router.patch('/petitions/:petitionId', auth, petitionController.changeAPetition);
router.delete('/petitions/:petitionId', auth, petitionController.removeAPetition);

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/profile', auth, profileController.getProfile);
router.get('/profiles', profileController.getProfiles);

// Add route to set verdict
router.patch('/petitions/:petitionId/verdict/:verdictvalue', auth, petitionController.setVerdict);
