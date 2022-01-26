/** @type {import('express').Router} */
const Route = require('express').Router();

Route.get('/', (req, res, next) => {
  return res.render('index.ejs');
});

module.exports = Route;
