'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.event, {
        as: "user",
        foreignKey : {
          name: "idUser"
        }
      })
    }
  }
  user.init({
    companyName: DataTypes.STRING,
    statusUser: {
      type: DataTypes.STRING,
      defaultValue: "user"
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
    timestamps: true
  });
  return user;
};