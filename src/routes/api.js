const CharacterController = require('../controllers/Api/CharacterController');

/** @type {import('express').Router} */
const Route = require('express').Router();

Route.get('/', (req, res, next) => {
  return res.status(200).json({
    message: 'I want to be your favorite hello and hardest goodbye 🤗',
  });
});

Route.post('/v1/people', CharacterController.fetchCharacters);

module.exports = Route;
