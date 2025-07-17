const { User, App } = require('../models');

// GET permissions
exports.getUserPermissions = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findByPk(userId, {
    include: { model: App },
  });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user.Apps);
};

// ✅ POST /permissions → Grant multiple app access
exports.grantAccess = async (req, res) => {
  const { user_id, app_id } = req.body;
  try {
    const user = await User.findByPk(user_id);
    if (!user) return res.status(400).json({ error: 'Invalid user' });

    const appIds = Array.isArray(app_id) ? app_id : [app_id];
    const apps = await App.findAll({ where: { id: appIds } });

    await user.addApps(apps);  // 💡 Sequelize bulk many-to-many

    res.json({ message: 'Access granted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Grant failed' });
  }
};

// ✅ DELETE /permissions → Revoke multiple app access
exports.revokeAccess = async (req, res) => {
  const { user_id, app_id } = req.body;
  try {
    const user = await User.findByPk(user_id);
    if (!user) return res.status(400).json({ error: 'Invalid user' });

    const appIds = Array.isArray(app_id) ? app_id : [app_id];
    const apps = await App.findAll({ where: { id: appIds } });

    await user.removeApps(apps);  // 💡 Sequelize bulk many-to-many

    res.json({ message: 'Access revoked' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Revoke failed' });
  }
};
