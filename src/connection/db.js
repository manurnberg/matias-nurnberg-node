const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'test-db',
    'root',
    'secret',
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 33061,
        sync: true

    }
);

module.exports = sequelize;
