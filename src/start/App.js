/* eslint-disable no-undef */
const Express = require('express');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();
//file imports
const ApiRoutes = require('../routes/api');
const WebRoutes = require('../routes/web');
const { sequelize } = require('../models');
const apiRoutes = require('../routes/api');
const webRoutes = require('../routes/web');

class App {
  constructor() {
    /**@type {Express.Application} */
    this.server = new Express();
    this.middlewares();
    this.routes();
    this.database();
  }

  middlewares() {
    this.server.use(Express.json());
    this.server.use(Express.urlencoded({ extended: true }));
    this.server.set('view engine', 'ejs');
    this.server.set('view', path.join(__dirname, '../views'));
    this.server.use(Express.static(path.join(__dirname, '../public')));
  }

  routes() {
    //api routes
    this.server.use('/api', apiRoutes);

    //web routes
    this.server.use(webRoutes);
  }

  database() {
    sequelize
      .authenticate()
      // eslint-disable-next-line no-console
      .then(() => {
        console.log('Database connection is successful');
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log('Database connection error: ', err));
  }
}

module.exports = new App().server;
