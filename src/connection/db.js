const { Sequelize } = require('sequelize');
const path = require('path');
//const { sequelize } = require('../model/mutation.model');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config.json')[env];
const db = {};
let sequelize;
if (config.use_env_variable){
    console.log('V1')
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    console.log(`Sequielize: V2 - DATABASE:${config.database} - USERNAME:${config.username} - HOST:${config.host}`);
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.sequelize = sequelize

module.exports = db;

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
    
    
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
  });
// const sequelize = new Sequelize(
//     'test-db',
//     'root',
//     'secret',
//     {
//         host: 'localhost',
//         dialect: 'mysql',
//         port: 33061,
//         sync: true

//     }
// );

module.exports = sequelize;
