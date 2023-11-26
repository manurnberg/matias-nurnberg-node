const { Sequelize } = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config.json')[env];

console.log(`Sequelize: - DATABASE:${config.database} - USERNAME:${config.username} - HOST:${config.host}`);
const sequelize = new Sequelize(config.database, config.username, config.password, config);


sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
