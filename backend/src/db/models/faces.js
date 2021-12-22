const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const faces = sequelize.define(
    'faces',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

age: {
        type: DataTypes.TEXT,

      },

gender: {
        type: DataTypes.TEXT,

      },

expression: {
        type: DataTypes.TEXT,

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

  faces.associate = (db) => {

    db.faces.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.faces.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return faces;
};

