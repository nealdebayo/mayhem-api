'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petitionSchema = mongoose.Schema({
  // TODO : add created date
  _id: mongoose.Schema.Types.ObjectId,
  creator: {type: Schema.Types.ObjectId, ref: 'User'},
  defendant: {type: Schema.Types.ObjectId, ref: 'User'},
  praetor: {type: Schema.Types.ObjectId, ref: 'User'},
  charge: {type: String, required: true},
  punishment: {type: String, required: true},
  verdict: Boolean
},
{timestamps: true});

module.exports = mongoose.model('Petition', petitionSchema);
