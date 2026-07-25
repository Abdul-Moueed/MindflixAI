import React, { useState, useEffect } from 'react';
import { Movie } from '../types';
import { TRENDING_MOVIES, EXCLUSIVE_MOVIES, INSIGHT_MOVIES, INITIAL_FAVORITES } from '../data/movies';
import { searchTMDB } from '../lib/tmdb';

interface SearchViewProps {
  onSelectMovie: (movie: Movie) => void;
  onOpenPromptAi: () => void;
}

export const SearchView: React.FC<SearchViewProps> = ({ onSelectMovie, onOpenPromptAi }) => {
  const [query, setQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const LOCAL_MOVIES: Movie[] = Array.from(
    new Map(
      [...TRENDING_MOVIES, ...EXCLUSIVE_MOVIES, ...INSIGHT_MOVIES, ...INITIAL_FAVORITES].map(m => [m.id, m])
    ).values()
  );

  const genres = ['All', 'Sci-Fi', 'Drama', 'Action', 'Mystery', 'AI Thriller', 'Noir', 'Fantasy'];

  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      const apiResults = await searchTMDB(query);
      setIsSearching(false);
      setSearchResults(apiResults);
    }, 350);

    return () => clearTimeout(timer);
  }, [query]);

  const displayMovies = query.trim()
    ? searchResults
    : LOCAL_MOVIES.filter(m => selectedGenre === 'All' || m.genre.toLowerCase().includes(selectedGenre.toLowerCase()));

  // Highlight matched query substring in text
  const highlightMatch = (text: string, search: string) => {
    if (!search.trim()) return text;
    const regex = new RegExp(`(${search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="bg-[#e50914] text-white px-0.5 rounded font-extrabold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="pt-20 pb-32 px-5 max-w-screen-xl mx-auto space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h2 className="font-montserrat text-2xl sm:text-3xl font-extrabold text-white">
          Discover & Search Cinema
        </h2>
        <p className="font-inter text-xs sm:text-sm text-[#e9bcb6]/70">
          Search live TMDB titles, filter by genre, or query MindFlix AI.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative w-full">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#ffb4aa]">
          search
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type to search live TMDB movies, titles, genres..."
          className="w-full pl-12 pr-12 py-3.5 rounded-full bg-[#1c1b1b] border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#4cd6ff] text-sm transition-colors shadow-lg"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        )}
      </div>

      {/* Genre Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
        {genres.map(g => (
          <button
            key={g}
            onClick={() => {
              setSelectedGenre(g);
              if (query) setQuery('');
            }}
            className={`px-4 py-2 rounded-full text-xs font-montserrat font-bold whitespace-nowrap transition-all ${
              selectedGenre === g && !query
                ? 'bg-[#e50914] text-white shadow-lg'
                : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      {/* AI Search Prompt CTA */}
      <div
        onClick={onOpenPromptAi}
        className="glass-card p-4 rounded-2xl border border-[#4cd6ff]/30 flex items-center justify-between cursor-pointer hover:border-[#4cd6ff] transition-colors shadow-xl"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#7701d0]/30 flex items-center justify-center text-[#4cd6ff]">
            <span className="material-symbols-outlined text-xl">psychology</span>
          </div>
          <div>
            <h4 className="font-montserrat font-bold text-sm text-white">Need custom AI recommendations?</h4>
            <p className="font-inter text-xs text-[#e9bcb6]/70">Prompt MindFlix AI with any mood or scenario</p>
          </div>
        </div>
        <span className="material-symbols-outlined text-[#4cd6ff]">arrow_forward</span>
      </div>

      {/* Results Grid */}
      {isSearching ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#e50914] border-t-transparent animate-spin"></div>
          <p className="font-inter text-xs text-[#e9bcb6]/70">Searching TMDB live database...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-2">
          {displayMovies.map(movie => (
            <div
              key={movie.id}
              onClick={() => onSelectMovie(movie)}
              className="glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-[#4cd6ff]/40 transition-all group cursor-pointer flex flex-col justify-between shadow-lg p-2.5"
            >
              <div className="aspect-[2/3] rounded-xl overflow-hidden relative bg-black">
                <img
                  src={movie.imageUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/70 border border-white/10 font-mono text-[10px] font-bold text-amber-400">
                  ★ {movie.voteAverage || 8.0}
                </div>
              </div>
              <div className="mt-2.5">
                <h5 className="font-montserrat font-bold text-sm text-white truncate group-hover:text-[#4cd6ff] transition-colors">
                  {highlightMatch(movie.title, query)}
                </h5>
                <p className="font-inter text-xs text-[#e9bcb6]/60">
                  {movie.year} • {movie.genre}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isSearching && displayMovies.length === 0 && (
        <div className="text-center py-16 space-y-3">
          <span className="material-symbols-outlined text-5xl text-white/20">search_off</span>
          <p className="font-montserrat text-lg text-white font-bold">No movies matched &quot;{query}&quot;</p>
          <p className="font-inter text-xs text-[#e9bcb6]/60">Try searching for different keywords or open MindFlix Prompt AI</p>
        </div>
      )}
    </div>
  );
};
