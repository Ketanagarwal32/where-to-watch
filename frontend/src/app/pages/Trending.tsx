import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Movie } from '../data/mockData';
import { MovieCard } from '../components/MovieCard';
import { fetchTrendingMovies } from '../lib/api';

export function Trending() {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrendingMovies()
      .then((movies) => setTrendingMovies(movies))
      .catch(() => setTrendingMovies([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[60vh] overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${trendingMovies[0]?.image})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />

        <div className="relative h-full max-w-[1600px] mx-auto px-6 flex flex-col justify-end pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="max-w-2xl"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 backdrop-blur-md border border-accent/30 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm text-foreground">Trending Now</span>
            </motion.div>
            <h1 className="text-6xl mb-4 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Discover What's Hot
            </h1>
            <p className="text-xl text-foreground/70 mb-6">
              The most-watched movies and series, fetched live from your backend.
            </p>
          </motion.div>
        </div>
      </motion.div>

      <div className="max-w-[1600px] mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-3xl mb-2">Trending Across All Platforms</h2>
          <p className="text-muted-foreground">
            {loading ? 'Loading...' : `${trendingMovies.length} titles currently trending`}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
          {trendingMovies.map((movie, index) => (
            <MovieCard key={movie.id} movie={movie} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
