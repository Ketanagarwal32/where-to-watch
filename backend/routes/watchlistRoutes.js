const express = require('express');
const auth = require('../middleware/auth');
const {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist
} = require('../controllers/watchlistController');

const router = express.Router();

router.get('/', auth, getWatchlist);
router.post('/', auth, addToWatchlist);
router.delete('/:movieId', auth, removeFromWatchlist);

module.exports = router;
