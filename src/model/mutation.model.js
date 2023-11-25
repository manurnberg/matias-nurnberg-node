const sequelize = require('../connection/db');
const { Sequelize, DataTypes, Model } = require('sequelize');


class Mutation extends Model {}

Mutation.init({
  id:{
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  hasMutation: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  dna: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: ''

  }
}, {
  
  sequelize,
  modelName: 'Mutation',
  timestamps: false,
  createdAt: false,
  updatedAt: false
});

module.exports = Mutation;