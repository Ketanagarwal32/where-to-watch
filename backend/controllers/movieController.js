const tmdbService = require('../services/tmdbService');

const getTrending = async (req, res) => {
  try {
    const data = await tmdbService.getTrending();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trending movies" });
  }
};

const searchMovies = async (req, res) => {
  try {
    const query = req.query.q;
    const data = await tmdbService.searchMovies(query);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error searching movies" });
  }
};

const getMovieDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await tmdbService.getMovieDetails(id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching movie details" });
  }
};

module.exports = { getTrending, searchMovies, getMovieDetails };