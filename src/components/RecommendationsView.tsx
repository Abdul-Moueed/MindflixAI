import React from 'react';
import { AnalysisResult, Movie } from '../types';
import { openTrailerUrl } from '../lib/youtube';

interface RecommendationsViewProps {
  analysis: AnalysisResult | null;
  onRedo: () => void;
  onSelectMovie: (movie: Movie) => void;
  onToggleFavorite: (movie: Movie) => void;
  favoriteIds: Set<string>;
}

export const RecommendationsView: React.FC<RecommendationsViewProps> = ({
  analysis,
  onRedo,
  onSelectMovie,
  onToggleFavorite,
  favoriteIds
}) => {
  // If analysis is not ready yet, show a minimal loading state
  if (!analysis || !analysis.topPick) {
    return (
      <div className="fixed inset-0 z-50 bg-[#131313] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-[#7701d0] border-t-transparent rounded-full animate-spin" />
        <p className="text-[#e5e2e1]/60 text-sm">Preparing your recommendations…</p>
      </div>
    );
  }

  const moodTag    = analysis.moodTag;
  const confidence = analysis.confidence;
  const description = analysis.description;
  const topPick    = analysis.topPick;
  const curatedMovies: Movie[] = analysis.curatedMovies ?? [];

  return (
    <div className="pt-20 pb-32 px-5 max-w-screen-xl mx-auto space-y-10 animate-fade-in">
      {/* Mood Header Banner */}
      <section className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 relative overflow-hidden shadow-2xl space-y-4">
        <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-[#7701d0]/20 blur-3xl pointer-events-none"></div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4cd6ff]" style={{ fontVariationSettings: "'FILL' 1" }}>
              psychology
            </span>
            <span className="font-inter text-xs text-[#4cd6ff] tracking-widest uppercase font-extrabold">
              MindFlix Neural Alignment
            </span>
          </div>

          <div className="flex items-center gap-2 bg-[#e50914]/20 border border-[#e50914]/50 px-3 py-1 rounded-full text-xs font-montserrat font-bold text-[#ffb4aa]">
            <span className="material-symbols-outlined text-sm">verified</span>
            <span>{confidence}% Mood Match Confidence</span>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="font-montserrat text-3xl sm:text-4xl font-extrabold text-white">
            Detected Mood: <span className="ai-gradient-text">{moodTag}</span>
          </h1>
          <p className="font-inter text-sm sm:text-base text-[#e9bcb6]/80 max-w-3xl leading-relaxed">
            {description}
          </p>
        </div>
      </section>

      {/* Featured #1 Recommendation */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-montserrat text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-[#e50914]">auto_awesome</span>
            <span>Your #1 AI Match</span>
          </h2>
          <span className="text-xs font-mono text-[#4cd6ff] bg-[#4cd6ff]/10 border border-[#4cd6ff]/20 px-3 py-1 rounded-full">
            Highest Resonance
          </span>
        </div>

        <div 
          onClick={() => onSelectMovie(topPick)}
          className="relative w-full rounded-3xl overflow-hidden glass-card border border-[#e50914]/40 group cursor-pointer transition-all duration-500 hover:scale-[1.01] shadow-2xl flex flex-col md:flex-row"
        >
          {/* Backdrop Image Frame */}
          <div className="relative w-full md:w-1/2 aspect-video md:aspect-auto min-h-[260px] overflow-hidden bg-black">
            <img
              src={topPick.backdropUrl || topPick.imageUrl}
              alt={topPick.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#1a191b]"></div>
            
            <div className="absolute top-4 left-4 z-20 flex gap-2">
              <span className="bg-[#e50914] text-white px-3 py-1 rounded-full text-xs font-montserrat font-bold shadow-lg">
                {topPick.matchPercentage || 98}% MATCH
              </span>
              {topPick.voteAverage && (
                <span className="bg-black/70 backdrop-blur-md text-amber-400 px-3 py-1 rounded-full text-xs font-montserrat font-bold flex items-center gap-1 border border-white/10">
                  ★ {topPick.voteAverage}
                </span>
              )}
            </div>
          </div>

          {/* Details Content Frame */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between bg-[#1a191b] space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-inter text-[#e9bcb6]/70 uppercase tracking-widest">
                <span>{topPick.genre}</span>
                <span>•</span>
                <span>{topPick.year}</span>
                {topPick.duration && (
                  <>
                    <span>•</span>
                    <span className="font-mono">{topPick.duration}</span>
                  </>
                )}
              </div>

              <h3 className="font-montserrat text-2xl sm:text-3xl font-extrabold text-white group-hover:text-[#ffb4aa] transition-colors">
                {topPick.title}
              </h3>

              <p className="font-inter text-xs sm:text-sm text-white/80 line-clamp-3 leading-relaxed">
                {topPick.synopsis}
              </p>
            </div>

            {/* AI Explanation Box */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#7701d0]/20 to-[#e50914]/10 border border-[#7701d0]/40 space-y-1">
              <div className="flex items-center gap-1.5 text-[11px] font-montserrat font-bold text-[#4cd6ff] uppercase tracking-wider">
                <span className="material-symbols-outlined text-sm text-[#e50914]">psychology</span>
                <span>Why This Matches Your Mood</span>
              </div>
              <p className="font-inter text-xs text-white/90 italic leading-relaxed">
                "{topPick.aiExplanation || `This movie matches your current emotional state because of its profound connection with ${moodTag}.`}"
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openTrailerUrl(topPick.trailerUrl, topPick.title);
                }}
                className="bg-[#e50914] hover:bg-[#ff1e27] text-white px-5 py-2.5 rounded-full font-montserrat font-bold text-xs sm:text-sm flex items-center gap-2 active:scale-95 transition-all shadow-lg"
              >
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                  smart_display
                </span>
                <span>Watch Trailer</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectMovie(topPick);
                }}
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-full font-montserrat font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors border border-white/10"
              >
                <span className="material-symbols-outlined text-base">info</span>
                <span>Details</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(topPick);
                }}
                className={`p-2.5 rounded-full border transition-all active:scale-95 ${
                  favoriteIds.has(topPick.id)
                    ? 'bg-[#e50914]/30 border-[#e50914] text-[#e50914]'
                    : 'bg-white/5 border-white/10 text-white hover:bg-white/15'
                }`}
                title={favoriteIds.has(topPick.id) ? "Remove Favorite" : "Add Favorite"}
              >
                <span
                  className="material-symbols-outlined text-xl"
                  style={{ fontVariationSettings: favoriteIds.has(topPick.id) ? "'FILL' 1" : "'FILL' 0" }}
                >
                  favorite
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Movies Grid */}
      <section className="space-y-6">
        <div>
          <h3 className="font-montserrat text-xl sm:text-2xl font-bold text-white">
            Curated Recommendations ({curatedMovies.length})
          </h3>
          <p className="font-inter text-xs sm:text-sm text-[#e9bcb6]/70">
            Tailored specifically for your emotional wavelength with custom AI explanations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {curatedMovies.map((movie) => {
            const isFav = favoriteIds.has(movie.id);
            return (
              <div
                key={movie.id}
                onClick={() => onSelectMovie(movie)}
                className="glass-card rounded-3xl border border-white/10 overflow-hidden flex flex-col justify-between group cursor-pointer hover:border-[#e50914]/50 transition-all duration-300 hover:-translate-y-1 shadow-xl"
              >
                {/* Image Poster */}
                <div className="relative aspect-video w-full overflow-hidden bg-black">
                  <img
                    src={movie.backdropUrl || movie.imageUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-transparent"></div>

                  <div className="absolute top-3 left-3 flex gap-2 z-10">
                    {movie.matchPercentage && (
                      <span className="bg-[#e50914] text-white px-2.5 py-0.5 rounded-full text-[10px] font-montserrat font-bold shadow-md">
                        {movie.matchPercentage}% MATCH
                      </span>
                    )}
                    {movie.badge && (
                      <span className="bg-[#7701d0]/40 border border-[#7701d0]/60 text-[#4cd6ff] px-2.5 py-0.5 rounded-full text-[10px] font-montserrat font-bold">
                        {movie.badge}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(movie);
                    }}
                    className={`absolute top-3 right-3 z-10 p-2 rounded-full border backdrop-blur-md transition-all active:scale-95 ${
                      isFav
                        ? 'bg-[#e50914]/40 border-[#e50914] text-white'
                        : 'bg-black/50 border-white/20 text-white/80 hover:bg-black/70'
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-lg"
                      style={{ fontVariationSettings: isFav ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      favorite
                    </span>
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-inter text-[#e9bcb6]/60">
                      <span>{movie.genre} • {movie.year}</span>
                      {movie.voteAverage && (
                        <span className="text-amber-400 font-bold flex items-center gap-1">
                          ★ {movie.voteAverage}
                        </span>
                      )}
                    </div>

                    <h4 className="font-montserrat font-bold text-lg text-white group-hover:text-[#ffb4aa] transition-colors">
                      {movie.title}
                    </h4>

                    <p className="font-inter text-xs text-[#e5e2e1]/80 line-clamp-2 leading-relaxed">
                      {movie.synopsis}
                    </p>
                  </div>

                  {/* AI Explanation snippet */}
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-[11px] font-inter text-[#4cd6ff] leading-snug">
                    <span className="font-bold font-montserrat text-[#e50914] mr-1">AI Match:</span>
                    "{movie.aiExplanation || `Matches your ${moodTag} state.`}"
                  </div>

                  {/* Card Actions */}
                  <div className="pt-2 flex items-center gap-2 border-t border-white/5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openTrailerUrl(movie.trailerUrl, movie.title);
                      }}
                      className="flex-1 py-2 rounded-xl bg-[#e50914]/20 hover:bg-[#e50914]/30 border border-[#e50914]/40 text-white font-montserrat font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm text-[#e50914]">smart_display</span>
                      <span>Trailer</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectMovie(movie);
                      }}
                      className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 font-montserrat font-bold text-xs transition-colors"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Redo Questionnaire CTA */}
      <section className="flex flex-col items-center justify-center py-10 glass-card rounded-3xl border border-white/10 text-center px-6 space-y-4 shadow-xl">
        <div className="w-12 h-12 rounded-full bg-[#7701d0]/20 border border-[#7701d0]/40 flex items-center justify-center text-[#dcb8ff]">
          <span className="material-symbols-outlined text-3xl">refresh</span>
        </div>

        <div className="space-y-1">
          <h3 className="font-montserrat text-xl sm:text-2xl font-bold text-white">
            Want to test another emotional state?
          </h3>
          <p className="font-inter text-xs sm:text-sm text-[#e9bcb6]/70 max-w-md">
            Our neural engine responds instantly to changing moods. Take the 5-step analysis again anytime.
          </p>
        </div>

        <button
          onClick={onRedo}
          className="bg-[#e50914] hover:bg-[#ff1e27] text-white px-8 py-3.5 rounded-full font-montserrat font-bold text-sm active:scale-95 transition-all shadow-xl shadow-[#e50914]/20 flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-lg">psychology</span>
          <span>Redo Mood Analysis</span>
        </button>
      </section>
    </div>
  );
};
