'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      event.belongsTo(models.user, {
        as: "user",
        foreignKey: {
          name: "idUser"
        }
      })
    }
  }
  event.init({
    date: DataTypes.DATEONLY,
    location: DataTypes.STRING,
    eventName: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: "Pending"
    },
    comment: DataTypes.STRING,
    idUser: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'event',
    timestamps: true
  });
  return event;
};