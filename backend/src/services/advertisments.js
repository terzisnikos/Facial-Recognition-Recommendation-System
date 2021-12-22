const db = require('../db/models');
const AdvertismentsDBApi = require('../db/api/advertisments');

module.exports = class AdvertismentsService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await AdvertismentsDBApi.create(
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
      let advertisments = await AdvertismentsDBApi.findBy(
        {id},
        {transaction},
      );

      if (!advertisments) {
        throw new ValidationError(
          'advertismentsNotFound',
        );
      }

      await AdvertismentsDBApi.update(
        id,
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
      return advertisments;

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

      await AdvertismentsDBApi.remove(
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

