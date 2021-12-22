
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class ReportsDBApi {

  static async create(data, options) {
  const currentUser = (options && options.currentUser) || { id: null };
  const transaction = (options && options.transaction) || undefined;

  const reports = await db.reports.create(
  {
  id: data.id || undefined,

    title: data.title
    ||
    null
,

    description: data.description
    ||
    null
,

    priority: data.priority
    ||
    null
,

    date: data.date
    ||
    null
,

    category: data.category
    ||
    null
,

  importHash: data.importHash || null,
  createdById: currentUser.id,
  updatedById: currentUser.id,
  },
  { transaction },
  );

    await reports.setAuthor(data.author || null, {
    transaction,
    });

    await FileDBApi.replaceRelationFiles(
    {
    belongsTo: db.reports.getTableName(),
    belongsToColumn: 'images',
    belongsToId: reports.id,
    },
    data.images,
    options,
    );

  return reports;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const reports = await db.reports.findByPk(id, {
      transaction,
    });

    await reports.update(
      {

        title: data.title
        ||
        null
,

        description: data.description
        ||
        null
,

        priority: data.priority
        ||
        null
,

        date: data.date
        ||
        null
,

        category: data.category
        ||
        null
,

        updatedById: currentUser.id,
      },
      {transaction},
    );

    await reports.setAuthor(data.author || null, {
      transaction,
    });

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.reports.getTableName(),
        belongsToColumn: 'images',
        belongsToId: reports.id,
      },
      data.images,
      options,
    );

    return reports;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const reports = await db.reports.findByPk(id, options);

    await reports.update({
      deletedBy: currentUser.id
    }, {
      transaction,
    });

    await reports.destroy({
      transaction
    });

    return reports;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const reports = await db.reports.findOne(
      { where },
      { transaction },
    );

    if (!reports) {
      return reports;
    }

    const output = reports.get({plain: true});

    output.author = await reports.getAuthor({
      transaction
    });

    output.images = await reports.getImages({
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
        as: 'author',
      },

      {
        model: db.file,
        as: 'images',
      },

    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.title) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'reports',
            'title',
            filter.title,
          ),
        };
      }

      if (filter.description) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'reports',
            'description',
            filter.description,
          ),
        };
      }

      if (filter.priority) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'reports',
            'priority',
            filter.priority,
          ),
        };
      }

      if (filter.category) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'reports',
            'category',
            filter.category,
          ),
        };
      }

      if (filter.dateRange) {
        const [start, end] = filter.dateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            date: {
              ...where.date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            date: {
              ...where.date,
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

      if (filter.author) {
        var listItems = filter.author.split('|').map(item => {
          return  Utils.uuid(item)
        });

        where = {
          ...where,
          authorId: {[Op.or]: listItems}
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

    let { rows, count } = await db.reports.findAndCountAll(
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
            'reports',
            'title',
            query,
          ),
        ],
      };
    }

    const records = await db.reports.findAll({
      attributes: [ 'id', 'title' ],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['title', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.title,
    }));
  }

};

