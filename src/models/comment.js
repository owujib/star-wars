'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Comment.init({
    email: DataTypes.STRING,
    movieId: DataTypes.STRING,
    username: DataTypes.STRING,
    content: DataTypes.STRING,
    ipAddress: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};