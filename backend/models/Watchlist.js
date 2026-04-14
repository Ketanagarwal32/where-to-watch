const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    movieId: { type: String, required: true },
    title: { type: String, required: true },
    posterPath: { type: String, default: '' },
    ottProviders: { type: [String], default: [] },
    mediaType: { type: String, default: 'movie' }
  },
  { timestamps: true }
);

watchlistSchema.index({ userId: 1, movieId: 1 }, { unique: true });

module.exports = mongoose.model('Watchlist', watchlistSchema);
