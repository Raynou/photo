const { Sequelize  } = require('sequelize');
const sequelize = new Sequelize('moodle', 'admin', 'moodle', {
    host: 'localhost',
    dialect: 'mariadb'
})

exports.sequelize = sequelize