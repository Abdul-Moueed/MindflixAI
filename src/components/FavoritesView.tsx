import React, { useState } from 'react';
import { Movie } from '../types';

interface FavoritesViewProps {
  favorites: Movie[];
  onSelectMovie: (movie: Movie) => void;
  onToggleFavorite: (movie: Movie) => void;
  onOpenPromptAi: () => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  favorites,
  onSelectMovie,
  onToggleFavorite,
  onOpenPromptAi
}) => {
  const [removedToast, setRemovedToast] = useState<string | null>(null);

  const handleRemove = (movie: Movie) => {
    onToggleFavorite(movie);
    setRemovedToast(`Removed "${movie.title}" from your collection`);
    setTimeout(() => {
      setRemovedToast(null);
    }, 3000);
  };

  return (
    <div className="pt-20 pb-32 px-5 max-w-screen-xl mx-auto space-y-8 animate-fade-in relative">
      {/* Toast Alert */}
      {removedToast && (
        <div className="fixed top-20 right-5 z-50 bg-[#1c1b1b] border border-[#e50914] text-white px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-[#e50914] text-sm">info</span>
          <span className="font-montserrat text-xs font-bold">{removedToast}</span>
        </div>
      )}

      {/* Header */}
      <section className="space-y-2">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="font-montserrat text-2xl sm:text-3xl font-extrabold text-white">
              Your Favorite Collection
            </h1>
            <p className="font-inter text-xs sm:text-sm text-[#e9bcb6]/70">
              Synced with cloud database for seamless persistence.
            </p>
          </div>
          <span className="font-montserrat font-bold text-xs text-[#4cd6ff] bg-[#4cd6ff]/10 border border-[#4cd6ff]/20 px-3 py-1 rounded-full">
            {favorites.length} Saved
          </span>
        </div>
      </section>

      {/* Favorites Grid / Empty State */}
      {favorites.length === 0 ? (
        <section className="glass-card p-12 rounded-3xl border border-white/10 text-center space-y-4 max-w-lg mx-auto my-12 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-[#e50914]/20 border border-[#e50914]/40 flex items-center justify-center text-[#e50914] mx-auto">
            <span className="material-symbols-outlined text-3xl">bookmark_border</span>
          </div>

          <div className="space-y-1">
            <h2 className="font-montserrat text-xl font-bold text-white">
              No Favorite Movies Saved Yet
            </h2>
            <p className="font-inter text-xs text-[#e9bcb6]/70 max-w-sm mx-auto leading-relaxed">
              Discover films matching your psychology and click the heart icon on any movie to save it here.
            </p>
          </div>

          <button
            onClick={onOpenPromptAi}
            className="bg-[#e50914] text-white px-6 py-3 rounded-full font-montserrat font-bold text-xs hover:bg-[#ff1e27] active:scale-95 transition-all shadow-xl"
          >
            Start Mood Analysis
          </button>
        </section>
      ) : (
        <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {favorites.map((movie) => (
            <div
              key={movie.id}
              onClick={() => onSelectMovie(movie)}
              className="glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-[#4cd6ff]/40 transition-all group cursor-pointer flex flex-col justify-between shadow-xl p-2.5 relative"
            >
              <div className="aspect-[2/3] rounded-xl overflow-hidden relative bg-black">
                <img
                  src={movie.imageUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(movie);
                  }}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/80 text-[#e50914] border border-[#e50914]/50 flex items-center justify-center hover:scale-110 active:scale-90 transition-all shadow-lg"
                  title="Remove from favorites"
                >
                  <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                    favorite
                  </span>
                </button>
              </div>

              <div className="mt-3 space-y-1">
                <h3 className="font-montserrat font-bold text-sm text-white truncate group-hover:text-[#4cd6ff] transition-colors">
                  {movie.title}
                </h3>
                <p className="font-inter text-xs text-[#e9bcb6]/60">
                  {movie.genre} • {movie.year}
                </p>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Prompt AI Banner */}
      <section
        onClick={onOpenPromptAi}
        className="glass-card rounded-3xl p-6 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4 border-2 border-[#e50914]/30 ai-pulse cursor-pointer hover:border-[#e50914] transition-colors shadow-2xl"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4cd6ff] to-[#7701d0] flex items-center justify-center shadow-lg shrink-0">
            <span className="material-symbols-outlined text-white text-2xl">auto_awesome</span>
          </div>
          <div>
            <h3 className="font-montserrat text-lg font-bold ai-gradient-text">
              Want more recommendations for your current mood?
            </h3>
            <p className="text-[#e9bcb6]/70 text-xs font-inter">
              Prompt MindFlix AI to generate custom movie lists based on your specific vibe.
            </p>
          </div>
        </div>

        <button className="bg-[#e50914] text-white px-6 py-2.5 rounded-full font-montserrat font-bold text-xs uppercase tracking-wider active:scale-95 transition-transform shadow-lg shrink-0">
          Prompt AI
        </button>
      </section>
    </div>
  );
};
