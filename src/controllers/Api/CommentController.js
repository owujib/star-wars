const Controller = require('../Controller');
const ApiError = require('../../utils/ApiError');
const Helpers = require('../../helpers');
const { Comment } = require('../../models');
const { commenValidation } = require('../../validation/commentValidation');

class CommentController extends Controller {
  constructor() {
    super();
  }

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async create(req, res, next) {
    try {
      const {
        params: { movieId },
        body,
        ip,
      } = req;

      /** validate request body */
      const { error } = commenValidation(body);
      if (error) {
        console.log(error);
        return next(new ApiError(error.details[0].message, 400));
      }

      /* create comment */
      const comment = await Comment.create({
        movieId,
        ipAddress: ip,
        username: body.username,
        content: body.comment,
      });

      return super.sendSuccessResponse(res, comment, 'new comment added', 201);
    } catch (error) {
      return next(error);
    }
  }

  /**
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async getAll(req, res, next) {
    try {
      const {
        query: { page, size },
        params: { movieId },
      } = req;
      const paginateData = Helpers.pagination(page, size);

      /* find all comments */
      let comments = await Comment.findAndCountAll({
        limit: paginateData.limit,
        offset: paginateData.offset,
        where: {
          movieId,
        },
        order: [['id', 'DESC']],
      });

      if (comments.rows.length < 1) {
        return next(new ApiError('No comment found ☹️'));
      }

      /* Parse The Retrieved Comments */
      comments.rows = comments.rows.map((comment) => {
        return {
          id: comment.id,
          ipAddress: comment.ipAddress,
          moviedId: comment.movieId,
          username: comment.username,
          content: comment.content,
          createdAt: comment.createdAt,
        };
      });

      comments = Helpers.pageData(comments, paginateData.page, req.query.size);

      return super.sendSuccessResponse(
        res,
        comments,
        `${comments.content.length} comments has been retrieved successfully!`,
        200,
      );
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new CommentController();
