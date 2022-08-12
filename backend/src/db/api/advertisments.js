
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class AdvertismentsDBApi {

  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const advertisments = await db.advertisments.create(
      {
        id: data.id || undefined,

        IniDate: data.IniDate
          ||
          null
        ,

        endDate: data.endDate
          ||
          null
        ,

        active: data.active
          ||
          false

        ,

        expression: data.expression
          ||
          null
        ,

        location: data.location
          ||
          null
        ,

        name: data.name
          ||
          null
        ,

        age: data.age
          ||
          null
        ,

        gender: data.gender
          ||
          null
        ,

        coefficient: data.coefficient
          ||
          null
        ,

        terget: data.terget
          ||
          null
        ,

        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await advertisments.setUser(data.user || null, {
      transaction,
    });

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.advertisments.getTableName(),
        belongsToColumn: 'ad_image',
        belongsToId: advertisments.id,
      },
      data.ad_image,
      options,
    );

    return advertisments;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const advertisments = await db.advertisments.findByPk(id, {
      transaction,
    });

    await advertisments.update(
      {

        IniDate: data.IniDate
          ||
          null
        ,

        endDate: data.endDate
          ||
          null
        ,

        active: data.active
          ||
          false

        ,

        expression: data.expression
          ||
          null
        ,

        location: data.location
          ||
          null
        ,

        name: data.name
          ||
          null
        ,

        age: data.age
          ||
          null
        ,

        gender: data.gender
          ||
          null
        ,

        coefficient: data.coefficient
          ||
          null
        ,

        EventTarget: data.terget
        ||
        null
        ,

        updatedById: currentUser.id,
      },
      { transaction },
    );

    await advertisments.setUser(data.user || null, {
      transaction,
    });

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.advertisments.getTableName(),
        belongsToColumn: 'ad_image',
        belongsToId: advertisments.id,
      },
      data.ad_image,
      options,
    );

    return advertisments;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const advertisments = await db.advertisments.findByPk(id, options);

    await advertisments.update({
      deletedBy: currentUser.id
    }, {
      transaction,
    });

    await advertisments.destroy({
      transaction
    });

    return advertisments;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const advertisments = await db.advertisments.findOne(
      { where },
      { transaction },
    );

    if (!advertisments) {
      return advertisments;
    }

    const output = advertisments.get({ plain: true });

    output.user = await advertisments.getUser({
      transaction
    });

    output.ad_image = await advertisments.getAd_image({
      transaction
    });

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

      {
        model: db.users,
        as: 'user',
      },

      {
        model: db.file,
        as: 'ad_image',
      },

    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.location) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'advertisments',
            'location',
            filter.location,
          ),
        };
      }

      if (filter.name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'advertisments',
            'name',
            filter.name,
          ),
        };
      }

      if (filter.IniDateRange) {
        const [start, end] = filter.IniDateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            IniDate: {
              ...where.IniDate,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            IniDate: {
              ...where.IniDate,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.endDateRange) {
        const [start, end] = filter.endDateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            endDate: {
              ...where.endDate,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            endDate: {
              ...where.endDate,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.coefficientRange) {
        const [start, end] = filter.coefficientRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            coefficient: {
              ...where.coefficient,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            coefficient: {
              ...where.coefficient,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.terget) {
        const [start, end] = filter.tergetRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            target: {
              ...where.target,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            target: {
              ...where.target,
              [Op.lte]: end,
            },
          };
        }
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

      if (filter.active) {
        where = {
          ...where,
          active: filter.active,
        };
      }

      if (filter.expression) {
        where = {
          ...where,
          expression: filter.expression,
        };
      }

      if (filter.age) {
        where = {
          ...where,
          age: filter.age,
        };
      }

      if (filter.gender) {
        where = {
          ...where,
          gender: filter.gender,
        };
      }

      if (filter.user) {
        var listItems = filter.user.split('|').map(item => {
          return Utils.uuid(item)
        });

        where = {
          ...where,
          userId: { [Op.or]: listItems }
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

    let { rows, count } = await db.advertisments.findAndCountAll(
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
            'advertisments',
            'user',
            query,
          ),
        ],
      };
    }

    const records = await db.advertisments.findAll({
      attributes: ['id', 'user'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['user', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.user,
    }));
  }

};

