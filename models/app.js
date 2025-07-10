module.exports = (sequelize, DataTypes) => {
  const App = sequelize.define('App', {
    app: {
      type: DataTypes.STRING,
      unique: true,
    },
    description: DataTypes.STRING,
    logo_url: DataTypes.STRING,  
  }, {
    tableName: 'apps',
    timestamps: false
  });

  return App;
};
