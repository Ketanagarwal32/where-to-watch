import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Search as SearchIcon, Filter } from 'lucide-react';
import { Movie, platforms } from '../data/mockData';
import { MovieCard } from '../components/MovieCard';
import { searchMovies } from '../lib/api';

export function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setMovies([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      setLoading(true);
      searchMovies(searchQuery)
        .then((results) => setMovies(results))
        .catch(() => setMovies([]))
        .finally(() => setLoading(false));
    }, 350);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const genres = useMemo(() => {
    const uniqueGenres = [...new Set(movies.map(m => m.genre))];
    return uniqueGenres;
  }, []);

  const filteredMovies = useMemo(() => {
    return movies.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPlatform = selectedPlatform === 'all' || movie.platform === selectedPlatform;
      const matchesGenre = selectedGenre === 'all' || movie.genre === selectedGenre;
      return matchesSearch && matchesPlatform && matchesGenre;
    });
  }, [searchQuery, selectedPlatform, selectedGenre]);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-[1600px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl mb-4">Universal Search</h1>
          <p className="text-xl text-muted-foreground">
            Search movies through your backend API
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-6"
        >
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-secondary/50 backdrop-blur-sm border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Filters:</span>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedPlatform('all')}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  selectedPlatform === 'all'
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground'
                }`}
              >
                All Platforms
              </button>
              {platforms.map(platform => (
                <button
                  key={platform.id}
                  onClick={() => setSelectedPlatform(platform.id)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                    selectedPlatform === platform.id
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span>{platform.icon}</span>
                  <span>{platform.name}</span>
                </button>
              ))}
            </div>

            <div className="w-full h-px bg-border/50" />

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedGenre('all')}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  selectedGenre === 'all'
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground'
                }`}
              >
                All Genres
              </button>
              {genres.map(genre => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    selectedGenre === genre
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <p className="text-muted-foreground">
            {loading
              ? 'Searching...'
              : `${filteredMovies.length} ${filteredMovies.length === 1 ? 'result' : 'results'} found`}
          </p>
        </motion.div>

        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
            {filteredMovies.map((movie, index) => (
              <MovieCard key={movie.id} movie={movie} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <SearchIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-2xl mb-2">No results found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
