const express = require('express');
const router = express.Router();
const {
  getUserPermissions,
  grantAccess,
  revokeAccess,
} = require('../controllers/permissionController'); 

router.get('/:userId', getUserPermissions);
router.post('/', grantAccess);
router.delete('/', revokeAccess);

module.exports = router;
