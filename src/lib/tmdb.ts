import { Movie } from '../types';
import { TRENDING_MOVIES } from '../data/movies';

export async function fetchTrendingTMDB(): Promise<Movie[]> {
  try {
    const res = await fetch('/api/tmdb/trending');
    if (!res.ok) throw new Error("Failed to fetch TMDB trending");
    const data = await res.json();
    if (data.success && Array.isArray(data.results)) {
      return data.results;
    }
  } catch (err) {
    console.warn("TMDB fetch fallback:", err);
  }
  return TRENDING_MOVIES;
}

export async function searchTMDB(query: string): Promise<Movie[]> {
  if (!query.trim()) return [];
  try {
    const res = await fetch(`/api/tmdb/search?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error("TMDB search failed");
    const data = await res.json();
    if (data.success && Array.isArray(data.results)) {
      return data.results;
    }
  } catch (err) {
    console.warn("TMDB search fallback:", err);
  }
  return TRENDING_MOVIES.filter(m => m.title.toLowerCase().includes(query.toLowerCase()));
}

export async function fetchMovieDetailsTMDB(movieId: string): Promise<Movie | null> {
  try {
    const res = await fetch(`/api/tmdb/movie/${encodeURIComponent(movieId)}`);
    if (!res.ok) throw new Error("TMDB movie details failed");
    const data = await res.json();
    if (data.success && data.movie) {
      return data.movie;
    }
  } catch (err) {
    console.warn("TMDB movie detail fallback:", err);
  }
  return null;
}
