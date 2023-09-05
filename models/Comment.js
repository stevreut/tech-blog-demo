const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
    },
    blogpost_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'blogpost',
          key: 'id',
        },
    },
    creationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    } 
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

module.exports = Comment;
