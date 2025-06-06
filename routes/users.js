const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser
} = require('../controllers/usersController');

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.delete('/:id', deleteUser);

module.exports = router;