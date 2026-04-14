import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Movie } from '../data/mockData';
import { addMovieToWatchlist, fetchWatchlist, removeMovieFromWatchlist } from '../lib/api';
import { useAuth } from './AuthContext';

interface WatchlistContextType {
  watchlist: Movie[];
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: string) => void;
  isInWatchlist: (movieId: string) => boolean;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      setWatchlist([]);
      return;
    }

    fetchWatchlist(token)
      .then((items) => {
        const mapped = items.map((item) => ({
          id: String(item.movieId),
          title: item.title,
          platform: item.ottProviders?.[0] || 'netflix',
          year: new Date(item.createdAt).getFullYear(),
          genre: 'Drama',
          rating: 0,
          image: item.posterPath || '',
          description: 'Saved to your watchlist'
        }));
        setWatchlist(mapped);
      })
      .catch(() => setWatchlist([]));
  }, [token]);

  const addToWatchlist = (movie: Movie) => {
    setWatchlist(prev => {
      if (!prev.find(m => m.id === movie.id)) {
        if (token) {
          addMovieToWatchlist(token, movie).catch(() => null);
        }
        return [...prev, movie];
      }
      return prev;
    });
  };

  const removeFromWatchlist = (movieId: string) => {
    if (token) {
      removeMovieFromWatchlist(token, movieId).catch(() => null);
    }
    setWatchlist(prev => prev.filter(m => m.id !== movieId));
  };

  const isInWatchlist = (movieId: string) => {
    return watchlist.some(m => m.id === movieId);
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error('useWatchlist must be used within WatchlistProvider');
  }
  return context;
}
