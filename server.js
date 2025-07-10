const express = require('express');
const cors = require('cors');
const db = require('./models');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const appRoutes = require('./routes/appRoutes');
const permissionRoutes = require('./routes/permissionRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/apps', appRoutes);
app.use('/permissions', permissionRoutes);

const PORT = process.env.PORT || 3000;
db.sequelize.sync()
  .then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('DB Sync Error:', err);
  });
