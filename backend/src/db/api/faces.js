
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class FacesDBApi {

  static async create(data, options) {
  const currentUser = (options && options.currentUser) || { id: null };
  const transaction = (options && options.transaction) || undefined;

  const faces = await db.faces.create(
  {
  id: data.id || undefined,

    age: data.age
    ||
    null
,

    gender: data.gender
    ||
    null
,

    expression: data.expression
    ||
    null
,

  importHash: data.importHash || null,
  createdById: currentUser.id,
  updatedById: currentUser.id,
  },
  { transaction },
  );

  return faces;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const faces = await db.faces.findByPk(id, {
      transaction,
    });

    await faces.update(
      {

        age: data.age
        ||
        null
,

        gender: data.gender
        ||
        null
,

        expression: data.expression
        ||
        null
,

        updatedById: currentUser.id,
      },
      {transaction},
    );

    return faces;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const faces = await db.faces.findByPk(id, options);

    await faces.update({
      deletedBy: currentUser.id
    }, {
      transaction,
    });

    await faces.destroy({
      transaction
    });

    return faces;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const faces = await db.faces.findOne(
      { where },
      { transaction },
    );

    if (!faces) {
      return faces;
    }

    const output = faces.get({plain: true});

    return output;
  }

  static async findAll(filter, options) {
    var limit = filter.limit || 0;
    var offset = 0;
    if (filter.page != 1 && filter.page) {
    const currentPage = +filter.page - 1;
    offset = currentPage * limit;
    }
    var orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [

    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.age) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'faces',
            'age',
            filter.age,
          ),
        };
      }

      if (filter.gender) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'faces',
            'gender',
            filter.gender,
          ),
        };
      }

      if (filter.expression) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'faces',
            'expression',
            filter.expression,
          ),
        };
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active:
            filter.active === true ||
            filter.active === 'true',
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = await db.faces.findAndCountAll(
      {
        where,
        include,
        limit: limit ? Number(limit) : undefined,
        offset: offset ? Number(offset) : undefined,
        order: orderBy
          ? [orderBy.split('_')]
          : [['createdAt', 'DESC']],
        transaction,
      },
    );

//    rows = await this._fillWithRelationsAndFilesForRows(
//      rows,
//      options,
//    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike(
            'faces',
            'age',
            query,
          ),
        ],
      };
    }

    const records = await db.faces.findAll({
      attributes: [ 'id', 'age' ],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['age', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.age,
    }));
  }

};

