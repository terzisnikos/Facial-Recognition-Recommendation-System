const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const advertisments = sequelize.define(
    'advertisments',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      IniDate: {
        type: DataTypes.DATE,

      },

      endDate: {
        type: DataTypes.DATE,

      },

      active: {
        type: DataTypes.BOOLEAN,

        allowNull: false,
        defaultValue: false,

      },

      expression: {
        type: DataTypes.ENUM,

        values: [

          "neutral",

          "happy"

        ],

      },

      location: {
        type: DataTypes.TEXT,

      },

      name: {
        type: DataTypes.TEXT,

      },

      age: {
        type: DataTypes.ENUM,

        values: [

          firstDec = "12 – 17",

          secDec = "18 – 24",

          thirdDec = "25 – 34",

          fourthDec = "35 – 44",

          "45 – 54",

          "55 – 64",

          "65+"

        ],

      },

      gender: {
        type: DataTypes.ENUM,

        values: [

          "male",

          "female",

          "unisex"

        ],

      },

      coefficient: {
        type: DataTypes.INTEGER,
      },

      target: {
        type: DataTypes.INTEGER,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  advertisments.associate = (db) => {

    db.advertisments.belongsTo(db.users, {
      as: 'user',
      constraints: false,
    });

    db.advertisments.hasMany(db.file, {
      as: 'ad_image',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: db.advertisments.getTableName(),
        belongsToColumn: 'ad_image',
      },
    });

    db.advertisments.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.advertisments.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return advertisments;
};

