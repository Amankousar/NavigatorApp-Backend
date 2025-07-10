const { Sequelize } = require('sequelize');
const config = require('../config').development;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: 'postgres',
    port: config.port,
    logging: false,
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.App = require('./app')(sequelize, Sequelize);
db.UserAppPermission = require('./userapppermission')(sequelize, Sequelize);

db.User.belongsToMany(db.App, {
  through: db.UserAppPermission,
  foreignKey: 'user_id',
});
db.App.belongsToMany(db.User, {
  through: db.UserAppPermission,
  foreignKey: 'app_id',
});

module.exports = db;
