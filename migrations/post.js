var bcrypt = require('bcrypt');

// https://github.com/kelektiv/node.bcrypt.js

function BpassGen(password){
    bcrypt.hash(password, 15, function(err, hash) {
        return hash;
      });
}

exports.BpassGen = BpassGen;
//============================================================
'use strict';
// var PassGenX = require('../helpers/passwordGeneration');
var sequelize = require('sequelize');
var uuidV1 = require('uuid/v1');
var Accounts = require('../models/index');

var uuidT = uuidV1();

// var password = PassGenX.BpassGen('secretConfig');

module.exports = {
  up: (queryInterface, Sequelize) => {

   // ERROR: Accounts.beforeCreate is not a function
   Accounts.beforeCreate((Accounts, options) => {
      return PassGenX.BpassGen('secretConfig').then(hashedPw => {
        Accounts.password = hashedPw;
      });
    });

   return queryInterface.bulkInsert('Accounts', [
    {
      uid: uuidT,
      userName: 'NaniMae1',
      firstName: 'Nani',
      lastName: 'Mae',
      dateOfBirth: new Date(),
      email: 'yaya@gmail.com',
      backupEmail: 'dsf@gmail.com',
      phoneNumber: null,
      phoneNumberStatus: 1,
      twoFactorEnabled: 1,
      imageURL: null,
      passwordHash: '',
      passwordKey: '',
      securityStamp: '',
      userLimit: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
      Id_dataValidity: 1,
      Id_status: 1,
      Id_accountRole: 1,
      Id_inviteKey: 1,
      Id_privacy: 2
    }
], {});
  },

  down: (queryInterface, Sequelize) => {

  }
};