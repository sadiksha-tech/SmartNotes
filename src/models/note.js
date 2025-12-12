"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    static associate(models) {
      // Many Notes -> One User
      Note.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      });

      // Many Notes -> Many Tags
      Note.belongsToMany(models.Tag, {
        through: "NoteTags",
        foreignKey: "noteId",
        otherKey: "tagId",
        as: "tags",
      });
    }
  }

  Note.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Note",
      tableName: "Notes",
      timestamps: true,
    }
  );

  return Note;
};
