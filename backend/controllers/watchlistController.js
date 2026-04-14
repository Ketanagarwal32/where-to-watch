const Watchlist = require('../models/Watchlist');

const addToWatchlist = async (req, res) => {
  try {
    const existing = await Watchlist.findOne({
      userId: req.user.id,
      movieId: String(req.body.movieId)
    });

    if (existing) {
      return res.status(200).json({ message: 'Already in watchlist' });
    }

    const item = new Watchlist({
      userId: req.user.id,
      movieId: String(req.body.movieId),
      title: req.body.title,
      posterPath: req.body.posterPath,
      ottProviders: req.body.ottProviders,
      mediaType: req.body.mediaType
    });

    const saved = await item.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

const getWatchlist = async (req, res) => {
  try {
    const list = await Watchlist.find({ userId: req.user.id });
    res.json(list);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

const removeFromWatchlist = async (req, res) => {
  try {
    await Watchlist.findOneAndDelete({
      userId: req.user.id,
      movieId: String(req.params.movieId)
    });
    res.json({ message: 'Removed from watchlist' });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

module.exports = { addToWatchlist, getWatchlist, removeFromWatchlist };