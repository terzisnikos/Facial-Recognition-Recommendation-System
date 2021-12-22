const db = require('../db/models');
const FacesDBApi = require('../db/api/faces');

module.exports = class FacesService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await FacesDBApi.create(
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
      let faces = await FacesDBApi.findBy(
        {id},
        {transaction},
      );

      if (!faces) {
        throw new ValidationError(
          'facesNotFound',
        );
      }

      await FacesDBApi.update(
        id,
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
      return faces;

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

      await FacesDBApi.remove(
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

