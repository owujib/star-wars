const axios = require('axios');

const Controller = require('../Controller');
const Helpers = require('../../helpers');

class CharacterController extends Controller {
  constructor() {
    super();
  }

  static API_URL = 'https://swapi.py4e.com/api/people';

  /**
   *
   * @param {import('express').Request} req server request handler
   * @param {import('express').Response} res server response handler
   * @param {import('express').NextFunction} next server middlerware handler
   * @returns {import('express').Response} returns response from the server response handler
   */
  async fetchCharacters(req, res, next) {
    try {
      const { sort, filter } = req.body;
      let { status, data } = await axios.get(`${CharacterController.API_URL}`, {
        headers: {
          Accept: 'application/json',
          'Cache-Control': 'no-cache',
        },
      });
      let people = data;

      console.log(people);

      if (status === 200) {
        if (filter !== '' || filter !== undefined) {
          people = data.results.filter((result) => {
            return (
              result.gender.toLocaleLowerCase() == filter.toLocaleLowerCase()
            );
          });
        }

        /** sort by url queries */

        people = people.sort((dataA, dataB) => {
          if (sort === 'name') {
            return dataA.name.localeCompare(dataB.name);
          }

          if (sort === 'gender') {
            return dataA.gender.localeCompare(dataB.gender);
          }

          if (sort === 'height') {
            return parseInt(dataA.height) - parseInt(dataB.height);
          }

          return;
        });

        if (people.length > 0) {
          people = people.map((character) => {
            return {
              id: Helpers.getResourceID(character.url),
              name: character.name,
              mass: character.mass,
              gender: character.gender,
              height: Helpers.heightToFeetAndInches(character.height),
              filmsId: character.films.map(Helpers.getResourceID),
              created: character.created,
              eyeColor: character.eye_color,
              homeWorld: character.homeworld,
              hairColor: character.hair_color,
              speciesId: character.species.map(Helpers.getResourceID),
              skinColor: character.skin_color,
              birthYear: character.birth_year,
              vehiclesId: character.vehicles.map(Helpers.getResourceID),
              starshipsId: character.starships.map(Helpers.getResourceID),
            };
          });

          //sort in ASC or DESC order
          if (sort.order.toLocaleLowerCase() == 'desc') {
            people = people.reverse();
          }

          return super.sendSuccessResponse(
            res,
            { people, totalCharacters: people.length },
            `${people.length} characters fetched!`,
            200,
          );
        }
      }

      return super.sendSuccessResponse(res, people, 'Characters fetched', 200);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @param {import('express').Request} req server request handler
   * @param {import('express').Response} res server response handler
   * @param {import('express').NextFunction} next server middlerware handler
   * @returns {import('express').Response} returns response from the server response handler
   */
  async getCharacter(req, res, next) {
    try {
      const { characterId } = req.params;
      let { status, data } = await axios.get(
        `${CharacterController.API_URL}/${characterId}`,
        {
          headers: {
            Accept: 'application/json',
            'Cache-Control': 'no-cache',
          },
        },
      );

      let character = data;

      if (status == 200) {
        return super.sendSuccessResponse(
          res,
          {
            id: Helpers.getResourceID(character.url),
            name: character.name,
            mass: character.mass,
            gender: character.gender,
            height: Helpers.heightToFeetAndInches(character.height),
            filmsId: character.films.map(Helpers.getResourceID),
            created: character.created,
            eyeColor: character.eye_color,
            homeWorld: character.homeworld,
            hairColor: character.hair_color,
            speciesId: character.species.map(Helpers.getResourceID),
            skinColor: character.skin_color,
            birthYear: character.birth_year,
            vehiclesId: character.vehicles.map(Helpers.getResourceID),
            starshipsId: character.starships.map(Helpers.getResourceID),
          },
          'Character retrieved successfully!',
          200,
        );
      }
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new CharacterController();
