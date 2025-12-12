'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
      // Many Tags : Many Notes
      Tag.belongsToMany(models.Note, {
        through: 'NoteTags',
        foreignKey: 'tagId',
        otherKey: 'noteId',
        as: 'notes',
      });
    }
  }

  Tag.init(
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'Tag',
    }
  );

  return Tag;
};
