module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    isadmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, { tableName: 'users', timestamps: false });

  return User;
};
