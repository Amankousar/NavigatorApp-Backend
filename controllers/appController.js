const { App } = require('../models');

exports.getAllApps = async (req, res) => {
  const apps = await App.findAll();
  res.json(apps);
};
