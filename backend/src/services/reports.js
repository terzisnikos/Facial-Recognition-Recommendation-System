const db = require('../db/models');
const ReportsDBApi = require('../db/api/reports');

module.exports = class ReportsService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await ReportsDBApi.create(
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
  static async update(data, id, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      let reports = await ReportsDBApi.findBy(
        {id},
        {transaction},
      );

      if (!reports) {
        throw new ValidationError(
          'reportsNotFound',
        );
      }

      await ReportsDBApi.update(
        id,
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
      return reports;

    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };

  static async remove(id, currentUser) {
    const transaction = await db.sequelize.transaction();

    try {
      if (currentUser.role !== 'admin') {
        throw new ValidationError(
          'errors.forbidden.message',
        );
      }

      await ReportsDBApi.remove(
        id,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};

