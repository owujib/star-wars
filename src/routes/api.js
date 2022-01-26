/**
 * @author Enang Favour <owujibfavour@gmail.com>
 * @description File loads all api routes for application.
 * @param {Object}
 * @name APIRoutes
 * @alias Routes
 * @returns {Function}
 */

const CharacterController = require('../controllers/Api/CharacterController');
const CommentController = require('../controllers/Api/CommentController');
const MovieController = require('../controllers/Api/MovieController');

/** @type {import('express').Router} */
const Route = require('express').Router();

Route.get('/', (req, res, next) => {
  return res.status(200).json({
    message: 'I want to be your favorite hello and hardest goodbye 🤗',
  });
});

/** @route character routes */
Route.post('/v1/people', CharacterController.fetchCharacters);
Route.get('/v1/people/:characterId', CharacterController.getCharacter);

/**@route movie routes  */
Route.get('/v1/movies', MovieController.getAllMovies);
Route.get('/v1/movies/:movieId', MovieController.getMovieById);

/**@route comment routes */
Route.post('/v1/comment/create/:movieId', CommentController.create);
Route.get('/v1/comment/:movieId', CommentController.getAll);

module.exports = Route;
