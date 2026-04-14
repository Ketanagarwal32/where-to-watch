import { motion } from 'motion/react';
import { Bookmark, BookmarkCheck, Star } from 'lucide-react';
import { Movie, platforms } from '../data/mockData';
import { useWatchlist } from '../context/WatchlistContext';

interface MovieCardProps {
  movie: Movie;
  index?: number;
}

export function MovieCard({ movie, index = 0 }: MovieCardProps) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(movie.id);
  const platform = platforms.find(p => p.id === movie.platform);

  const handleWatchlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative overflow-hidden rounded-lg bg-card border border-border/50 hover:border-accent/50 transition-all duration-500"
    >
      <div className="aspect-[2/3] overflow-hidden relative">
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleWatchlistToggle}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 hover:bg-accent hover:border-accent transition-all duration-300 z-10"
        >
          {inWatchlist ? (
            <BookmarkCheck className="w-5 h-5 text-accent" />
          ) : (
            <Bookmark className="w-5 h-5 text-white" />
          )}
        </motion.button>

        {platform && (
          <div
            className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs backdrop-blur-md border border-white/20"
            style={{ backgroundColor: `${platform.color}40` }}
          >
            <span className="mr-1">{platform.icon}</span>
            <span className="text-white">{platform.name}</span>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-white">{movie.rating}</span>
            <span className="text-white/60">•</span>
            <span className="text-white/80">{movie.year}</span>
            <span className="text-white/60">•</span>
            <span className="text-white/80">{movie.genre}</span>
          </div>
          <h3 className="text-white mb-2">{movie.title}</h3>
          <p className="text-sm text-white/70 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            {movie.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
