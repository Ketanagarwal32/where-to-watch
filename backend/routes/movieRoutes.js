const express = require('express');
const router = express.Router();
const axios = require('axios');

const API_KEY = process.env.TMDB_API_KEY;

// Trending
router.get('/trending', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trending movies" });
  }
});

// Search
router.get('/search', async (req, res) => {
  try {
    const query = req.query.q;
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error searching movies" });
  }
});

// Movie details
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=watch/providers`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching movie details" });
  }
});

module.exports = router;