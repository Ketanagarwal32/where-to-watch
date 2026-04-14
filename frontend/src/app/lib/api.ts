import { Movie } from '../data/mockData';

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

type RequestOptions = RequestInit & { token?: string };

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { token, headers, ...rest } = options;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(headers || {})
    }
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Request failed');
  }

  return response.json();
}

function genreFromIds(genreIds?: number[]): string {
  const map: Record<number, string> = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Sci-Fi',
    53: 'Thriller',
    10752: 'War',
    37: 'Western'
  };

  if (!genreIds?.length) return 'Drama';
  return map[genreIds[0]] || 'Drama';
}

export function mapTmdbMovieToMovie(movie: any): Movie {
  return {
    id: String(movie.id),
    title: movie.title || movie.name || 'Untitled',
    platform: 'netflix',
    year: Number((movie.release_date || '').slice(0, 4)) || new Date().getFullYear(),
    genre: genreFromIds(movie.genre_ids),
    rating: Number(movie.vote_average?.toFixed?.(1)) || 0,
    image: movie.poster_path ? `${TMDB_IMAGE_BASE}${movie.poster_path}` : '',
    description: movie.overview || 'No description available.',
    trending: true
  };
}

export async function fetchTrendingMovies(): Promise<Movie[]> {
  const data = await request<{ results: any[] }>('/api/movies/trending');
  return (data.results || []).map(mapTmdbMovieToMovie);
}

export async function searchMovies(query: string): Promise<Movie[]> {
  if (!query.trim()) return [];
  const data = await request<{ results: any[] }>(`/api/movies/search?q=${encodeURIComponent(query)}`);
  return (data.results || []).map(mapTmdbMovieToMovie);
}

export async function loginUser(email: string, password: string) {
  return request<{ token: string; user: { id: string; name: string; email: string } }>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
}

export async function registerUser(name: string, email: string, password: string) {
  return request<{ token: string; user: { id: string; name: string; email: string } }>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password })
  });
}

export async function fetchWatchlist(token: string) {
  return request<any[]>('/api/watchlist', { token });
}

export async function addMovieToWatchlist(token: string, movie: Movie) {
  return request('/api/watchlist', {
    method: 'POST',
    token,
    body: JSON.stringify({
      movieId: movie.id,
      title: movie.title,
      posterPath: movie.image,
      mediaType: 'movie',
      ottProviders: movie.platform ? [movie.platform] : []
    })
  });
}

export async function removeMovieFromWatchlist(token: string, movieId: string) {
  return request(`/api/watchlist/${movieId}`, {
    method: 'DELETE',
    token
  });
}
