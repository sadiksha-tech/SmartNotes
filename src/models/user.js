"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // 1 User → Many Notes
      User.hasMany(models.Note, {
        foreignKey: "userId",
        as: "notes",
        onDelete: "CASCADE",   // If user is deleted → delete notes
        onUpdate: "CASCADE",
      });
    }
  }

  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users", // optional but recommended
      timestamps: true,   // createdAt, updatedAt
    }
  );

  return User;
};
