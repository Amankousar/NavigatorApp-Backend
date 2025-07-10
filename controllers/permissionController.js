const { User, App } = require('../models');

exports.getUserPermissions = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findByPk(userId, {
    include: { model: App },
  });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user.Apps);
};

exports.grantAccess = async (req, res) => {
  const { user_id, app_id } = req.body;
  try {
    const user = await User.findByPk(user_id);
    const app = await App.findByPk(app_id);
    if (!user || !app) return res.status(400).json({ error: 'Invalid user or app' });
    await user.addApp(app);
    res.json({ message: 'Access granted' });
  } catch (error) {
    res.status(500).json({ error: 'Grant failed' });
  }
};

exports.revokeAccess = async (req, res) => {
  const { user_id, app_id } = req.body;
  try {
    const user = await User.findByPk(user_id);
    const app = await App.findByPk(app_id);
    if (!user || !app) return res.status(400).json({ error: 'Invalid user or app' });
    await user.removeApp(app);
    res.json({ message: 'Access revoked' });
  } catch (error) {
    res.status(500).json({ error: 'Revoke failed' });
  }
};
