import React from 'react';
import { Movie, NavigationTab } from '../types';
import { TRENDING_MOVIES, INITIAL_HERO_MOVIE, EXCLUSIVE_MOVIES } from '../data/movies';

interface HomeViewProps {
  onNavigate: (tab: NavigationTab) => void;
  onSelectMovie: (movie: Movie) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onSelectMovie }) => {
  const popularMoods = [
    { emoji: "🏠", label: "Cozy Nostalgia", color: "border-[#ffb4aa]/40 text-[#ffb4aa]" },
    { emoji: "⚡", label: "Adrenaline Surge", color: "border-[#e50914]/40 text-[#e50914]" },
    { emoji: "🌌", label: "Cosmic Odyssey", color: "border-[#4cd6ff]/40 text-[#4cd6ff]" },
    { emoji: "🫠", label: "Bittersweet Depth", color: "border-[#dcb8ff]/40 text-[#dcb8ff]" },
    { emoji: "🤯", label: "Mind Bending", color: "border-[#7701d0]/40 text-[#dcb8ff]" }
  ];

  const features = [
    {
      icon: "psychology",
      title: "5-Step Psychology",
      desc: "Answers map directly to subconscious emotional needs and narrative tempo."
    },
    {
      icon: "auto_awesome",
      title: "Gemini AI Engine",
      desc: "Advanced neural mood detection evaluates emotional nuances with high confidence."
    },
    {
      icon: "movie",
      title: "TMDB Live Catalog",
      desc: "Real-time sync with global movie database for accurate trailers, actors, and ratings."
    },
    {
      icon: "comment",
      title: "Custom AI Explanations",
      desc: "Every recommendation includes a tailored reason explaining why it fits your mood."
    }
  ];

  return (
    <div className="w-full pb-32 animate-fade-in space-y-12">
      {/* Hero Section */}
      <section className="relative w-full h-[620px] sm:h-[700px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{ backgroundImage: `url('${INITIAL_HERO_MOVIE.imageUrl}')` }}
        />
        <div className="absolute inset-0 glass-gradient"></div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 w-full px-5 pb-14 flex flex-col items-center text-center z-10 max-w-screen-xl mx-auto inset-x-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-3 text-xs font-montserrat font-bold text-[#4cd6ff]">
            <span className="material-symbols-outlined text-sm">verified</span>
            <span>NEXT-GEN MOOD RECOMMENDATIONS</span>
          </div>

          <h1 className="font-montserrat text-4xl sm:text-6xl lg:text-7xl font-extrabold mb-3 text-white tracking-tight drop-shadow-2xl">
            Cinematic AI for Your Soul
          </h1>
          <p className="font-inter text-sm sm:text-base text-[#e9bcb6]/80 mb-8 max-w-lg leading-relaxed">
            Answer 5 psychology-inspired questions. Our neural Gemini AI detects your exact mood and curates perfect movies with personalized explanations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-md justify-center">
            <button
              onClick={() => onNavigate('questionnaire')}
              className="pulse-gradient h-14 rounded-full flex items-center justify-center gap-2.5 text-white font-montserrat font-extrabold text-base sm:text-lg active:scale-95 transition-transform shadow-[0_0_30px_rgba(229,9,20,0.4)] hover:brightness-110"
            >
              <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                psychology
              </span>
              Start Mood Analysis
            </button>

            <button
              onClick={() => onSelectMovie(INITIAL_HERO_MOVIE)}
              className="h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-montserrat font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform hover:bg-white/20"
            >
              <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                play_arrow
              </span>
              Watch Hero Trailer
            </button>
          </div>
        </div>
      </section>

      {/* Main Grid Content */}
      <div className="max-w-screen-xl mx-auto space-y-12 px-5">
        
        {/* Popular Mood Shortcuts */}
        <section className="space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="font-montserrat text-xl sm:text-2xl font-bold text-white">
                Explore Popular Moods
              </h2>
              <p className="font-inter text-xs sm:text-sm text-[#e9bcb6]/70">
                Click any emotional vibe to initiate instant AI matching.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {popularMoods.map((m, idx) => (
              <button
                key={idx}
                onClick={() => onNavigate('questionnaire')}
                className={`px-4 py-2.5 rounded-full glass-card border ${m.color} hover:bg-white/10 active:scale-95 transition-all flex items-center gap-2 font-montserrat font-bold text-xs sm:text-sm shadow-md`}
              >
                <span>{m.emoji}</span>
                <span>{m.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Trending Now */}
        <section className="space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="font-montserrat text-xl sm:text-2xl font-bold text-white">
                Trending Movies
              </h2>
              <p className="font-inter text-xs sm:text-sm text-[#e9bcb6]/70">
                High-rating global favorites synchronized with TMDB.
              </p>
            </div>
            <button
              onClick={() => onNavigate('search')}
              className="text-[#ffb4aa] font-inter text-xs uppercase tracking-wider hover:underline font-bold"
            >
              Search All
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {TRENDING_MOVIES.map((movie) => (
              <div
                key={movie.id}
                onClick={() => onSelectMovie(movie)}
                className="glass-card rounded-2xl overflow-hidden border border-white/10 cursor-pointer group hover:border-[#e50914]/50 transition-all duration-300 hover:-translate-y-1 shadow-lg"
              >
                <div className="relative aspect-[2/3] overflow-hidden bg-black">
                  <img
                    src={movie.imageUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <span className="material-symbols-outlined text-[#e50914] text-4xl">play_circle</span>
                  </div>
                </div>
                <div className="p-3.5 space-y-1">
                  <h3 className="font-montserrat font-bold text-sm text-white truncate group-hover:text-[#ffb4aa] transition-colors">
                    {movie.title}
                  </h3>
                  <div className="flex justify-between items-center text-xs font-inter text-[#e9bcb6]/60">
                    <span>{movie.genre} • {movie.year}</span>
                    <span className="text-amber-400 font-bold">★ 8.5</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AI Features Grid */}
        <section className="glass-card p-6 sm:p-10 rounded-3xl border border-white/10 space-y-8 shadow-2xl">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-montserrat font-extrabold text-[#4cd6ff] uppercase tracking-widest bg-[#4cd6ff]/10 px-3 py-1 rounded-full border border-[#4cd6ff]/20">
              Why MindFlix AI
            </span>
            <h2 className="font-montserrat text-2xl sm:text-4xl font-extrabold text-white">
              Precision Psychology Meets Cinema
            </h2>
            <p className="font-inter text-xs sm:text-sm text-[#e9bcb6]/75">
              Stop endless scrolling. Let artificial intelligence understand your exact headspace.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-[#7701d0]/50 transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#7701d0]/20 border border-[#7701d0]/40 flex items-center justify-center text-[#4cd6ff]">
                  <span className="material-symbols-outlined text-2xl">{f.icon}</span>
                </div>
                <h3 className="font-montserrat font-bold text-base text-white">
                  {f.title}
                </h3>
                <p className="font-inter text-xs text-[#e9bcb6]/70 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Statistics Banner */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-6 rounded-2xl glass-card border border-white/10 text-center space-y-1">
            <span className="font-montserrat font-extrabold text-3xl sm:text-4xl text-white">14.2K+</span>
            <p className="font-inter text-xs text-[#e9bcb6]/70">Mood Analyses</p>
          </div>
          <div className="p-6 rounded-2xl glass-card border border-white/10 text-center space-y-1">
            <span className="font-montserrat font-extrabold text-3xl sm:text-4xl text-[#4cd6ff]">98.4%</span>
            <p className="font-inter text-xs text-[#e9bcb6]/70">User Vibe Alignment</p>
          </div>
          <div className="p-6 rounded-2xl glass-card border border-white/10 text-center space-y-1">
            <span className="font-montserrat font-extrabold text-3xl sm:text-4xl text-[#ffb4aa]">10.0K+</span>
            <p className="font-inter text-xs text-[#e9bcb6]/70">TMDB Movie Catalog</p>
          </div>
          <div className="p-6 rounded-2xl glass-card border border-white/10 text-center space-y-1">
            <span className="font-montserrat font-extrabold text-3xl sm:text-4xl text-[#e50914]">Instant</span>
            <p className="font-inter text-xs text-[#e9bcb6]/70">AI Explanations</p>
          </div>
        </section>

        {/* AI Exclusives */}
        <section className="space-y-4">
          <h2 className="font-montserrat text-xl sm:text-2xl font-bold text-white">
            Curated High-Resonance Films
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {EXCLUSIVE_MOVIES.map((movie) => (
              <div
                key={movie.id}
                onClick={() => onSelectMovie(movie)}
                className="relative aspect-video rounded-3xl overflow-hidden glass-card border border-white/10 group cursor-pointer shadow-xl hover:border-[#4cd6ff]/50 transition-all"
              >
                <img
                  src={movie.imageUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-5">
                  <span className="text-[#4cd6ff] text-[10px] font-montserrat font-extrabold uppercase tracking-widest mb-1">
                    {movie.badge || movie.genre}
                  </span>
                  <h3 className="font-montserrat font-bold text-lg text-white group-hover:text-[#ffb4aa] transition-colors">
                    {movie.title}
                  </h3>
                  <p className="font-inter text-xs text-[#e9bcb6]/80 line-clamp-2 mt-0.5">
                    {movie.synopsis}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
