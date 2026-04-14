import { motion } from 'motion/react';
import { BookmarkCheck, Film } from 'lucide-react';
import { useWatchlist } from '../context/WatchlistContext';
import { MovieCard } from '../components/MovieCard';

export function Watchlist() {
  const { watchlist } = useWatchlist();

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-[1600px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center">
              <BookmarkCheck className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-5xl">My Watchlist</h1>
              <p className="text-xl text-muted-foreground">
                Your saved movies and series from all platforms
              </p>
            </div>
          </div>
        </motion.div>

        {watchlist.length > 0 ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">
                  {watchlist.length} {watchlist.length === 1 ? 'item' : 'items'} in your watchlist
                </p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors duration-300">
                    Sort by Date
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors duration-300">
                    Group by Platform
                  </button>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
              {watchlist.map((movie, index) => (
                <MovieCard key={movie.id} movie={movie} index={index} />
              ))}
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center py-20"
          >
            <div className="max-w-md mx-auto">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center border-2 border-accent/30"
              >
                <Film className="w-12 h-12 text-accent" />
              </motion.div>

              <h2 className="text-3xl mb-4">Your watchlist is empty</h2>
              <p className="text-muted-foreground mb-8">
                Start adding movies and series you want to watch. Browse trending content or search across all platforms to discover something new.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors duration-300"
                >
                  Browse Trending
                </motion.a>
                <motion.a
                  href="/search"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-lg border border-border hover:bg-secondary transition-all duration-300"
                >
                  Search Content
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
