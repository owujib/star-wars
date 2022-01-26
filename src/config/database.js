require('dotenv').config();
const sequelizeCon = require('./sequelize-config');
/**
 * @author Enang Favour <owujibfavour@gmail.com>
 * @description This file returns the database core configuration.
 * @param {null}
 * @name DatabaseConfig
 * @returns {Object}
 */

module.exports = {
  default: process.env.DB_CONNECTION,

  connections: {
    MySql: sequelizeCon[process.env.NODE_ENV],

    MongoDB: {
      driver: 'mongodb',
      url: process.env.DB_URL,
      options: {
        family: 4,
        autoIndex: false,
        autoCreate: false,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        socketTimeoutMS: 30000,
        keepAlive: true,
      },
    },
  },
};
