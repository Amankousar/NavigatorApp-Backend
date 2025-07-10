module.exports = (sequelize, DataTypes) => {
  return sequelize.define('UserAppPermission', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
    app_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'apps', key: 'id' },
    },
  }, {
    tableName: 'user_app_permissions',
    timestamps: false,
  });
};
