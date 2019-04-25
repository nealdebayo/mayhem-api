'use strict';
const mongoose = require('mongoose');
const db = require('../helpers/db');
const Petition = db.Petition;

module.exports = {
  getPetitions,
  addPetition,
  getPetition,
  changePetition,
  removePetition,
  setVerdict
};

async function getPetitions() {
  return await Petition.find().exec();
}

async function addPetition(petitionParam, creator) {
  const petition = new Petition({
    // TODO: need to add defendantId or something in here
    _id: new mongoose.Types.ObjectId(),
    creator: creator,
    charge: petitionParam.charge,
    punishment: petitionParam.punishment,
    defendant: petitionParam.defendant
  });
  return await petition.save();
}

async function getPetition(petitionId) {
  return await Petition.findById(petitionId).exec();
}

async function changePetition(petitionId, petitionParam) {
  const petition = await Petition.findById(petitionId);

  // validate
  if (!petition) throw 'Petition does not exist';

  // copy petitionParam properties to Petition
  Object.assign(petition, petitionParam);

  return await petition.save();
}

async function removePetition(petitionId) {
  await Petition.findByIdAndRemove(petitionId);
}

// set verdict on existing petition
async function setVerdict(petitionId, verdict, user) {
  const petition = await Petition.findById(petitionId);

  // validate
  if (!petition) throw 'Petition does not exist';

  petition.verdict = verdict === '1';
  petition.praetor = user;

  return await petition.save();
}
