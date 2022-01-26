const axios = require('axios');

const Controller = require('../Controller');
const Helpers = require('../../helpers');
const { Comment } = require('../../models');

class MovieController extends Controller {
  constructor() {
    super();
  }

  static API_URL = 'https://swapi.py4e.com/api/films';

  /**
   * @param {import('express').Response} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async getAllMovies(req, res, next) {
    try {
      let { status, data } = await axios.get(`${MovieController.API_URL}`, {
        headers: {
          Accept: 'application/json',
          'Cache-Control': 'no-cache',
        },
      });

      let movies = data;

      /* check status for 200 response */
      if (status === 200) {
        let moviesList = movies.results;
        moviesList = moviesList.sort((dateA, dateB) => {
          return (
            new Date(dateA.release_date).getTime() -
            new Date(dateB.release_date).getTime()
          );
        });

        /* Parse The Movies List */
        moviesList = moviesList.map(async (movie) => {
          return {
            id: Helpers.getResourceID(movie.url),
            title: movie.title,
            director: movie.director,
            planets: movie.planets.map(Helpers.getResourceID),
            species: movie.species.map(Helpers.getResourceID),
            producer: movie.producer,
            vehicles: movie.vehicles.map(Helpers.getResourceID),
            starships: movie.starships.map(Helpers.getResourceID),
            episode_id: movie.episode_id,
            characters: movie.characters.map(Helpers.getResourceID),
            release_date: movie.release_date,
            opening_crawl: movie.opening_crawl,
            totalComments: await MovieController.getCommentCount(movie.url),
          };
        });
        let resultSet = await Promise.all(moviesList);

        return super.sendSuccessResponse(
          res,
          resultSet,
          ` movies retrieved successfully!`,
          200,
        );
      }

      return super.sendSuccessResponse(res, {}, 'Movies retrieved', 200);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @param {import('express').Response} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async getMovieById(req, res, next) {
    try {
      let {
        params: { movieId },
      } = req;

      console.log(movieId);
      let { status, data } = await axios.get(
        `${MovieController.API_URL}/${movieId}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
          },
        },
      );

      let movie = data;
      /* Check For A 200 Response */
      if (status == 200) {
        movie = {
          id: Helpers.getResourceID(movie.url),
          title: movie.title,
          director: movie.director,
          planets: movie.planets.map(Helpers.getResourceID),
          species: movie.species.map(Helpers.getResourceID),
          producer: movie.producer,
          vehicles: movie.vehicles.map(Helpers.getResourceID),
          starships: movie.starships.map(Helpers.getResourceID),
          episode_id: movie.episode_id,
          characters: movie.characters.map(Helpers.getResourceID),
          release_date: movie.release_date,
          opening_crawl: movie.opening_crawl,
          totalComments: await MovieController.getCommentCount(movie.url),
        };

        /* Send Out A Success Response */
        return super.sendSuccessResponse(
          res,
          movie,
          'Movie retrieved successfully!',
          200,
        );
      }

      /* Send An Error Response */
      return super.sendErrorResponse(
        res,
        { movie: 'Failed to retrieve the selected movie!' },
        'The selected movie could not be retrieved! Please, try again later!',
        400,
      );
    } catch (error) {
      return next(error);
    }
  }

  static async getCommentCount(url) {
    try {
      let count = await Comment.count({
        where: { movieId: Helpers.getResourceID(url) },
      });

      return count;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new MovieController();
