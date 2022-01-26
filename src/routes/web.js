/** @type {import('express').Router} */
const Route = require('express').Router();

Route.get('/', (req, res, next) => {
  return res.status(200).json({
    message: 'I want to be your favorite hello and hardest goodbye 🤗',
  });
});
module.exports = Route;
