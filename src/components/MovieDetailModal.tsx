import React, { useState, useEffect } from 'react';
import { Movie } from '../types';
import { getYouTubeEmbedUrl, isDirectVideoUrl } from '../lib/youtube';

interface MovieDetailModalProps {
  movie: Movie | null;
  onClose: () => void;
  onToggleFavorite: (movie: Movie) => void;
  isFavorite: boolean;
}

export const MovieDetailModal: React.FC<MovieDetailModalProps> = ({
  movie,
  onClose,
  onToggleFavorite,
  isFavorite
}) => {
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(false);
  const [useYouTubeSource, setUseYouTubeSource] = useState(true);

  // Reset trailer state when movie changes
  useEffect(() => {
    setIsPlayingTrailer(false);
    setUseYouTubeSource(true);
  }, [movie]);

  if (!movie) return null;

  const embedUrl = getYouTubeEmbedUrl(movie.trailerUrl, movie.title);
  const isDirectVideo = isDirectVideoUrl(movie.trailerUrl) && !useYouTubeSource;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#1c1b1b] border border-white/10 rounded-3xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black/90 transition-colors border border-white/20 shadow-lg"
          title="Close modal"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* Video / Player / Poster Frame */}
        <div className="relative aspect-video w-full bg-black border-b border-white/10 overflow-hidden">
          {isPlayingTrailer ? (
            isDirectVideo ? (
              <video
                src={movie.trailerUrl}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            ) : (
              <iframe
                src={embedUrl}
                title={`${movie.title} Trailer`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            )
          ) : (
            <>
              <img
                src={movie.imageUrl}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b1b] via-black/40 to-transparent"></div>
              
              {/* Play Trailer overlay button */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4">
                <button
                  onClick={() => setIsPlayingTrailer(true)}
                  className="w-20 h-20 rounded-full ai-glow-button flex items-center justify-center text-white shadow-2xl hover:scale-110 active:scale-95 transition-all group"
                  title="Play Trailer"
                >
                  <span className="material-symbols-outlined text-5xl ml-1 group-hover:scale-105" style={{ fontVariationSettings: "'FILL' 1" }}>
                    play_arrow
                  </span>
                </button>
                <span className="font-montserrat text-xs font-bold text-white/90 bg-black/60 px-4 py-1.5 rounded-full border border-white/15 backdrop-blur-md flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#e50914] text-sm">smart_display</span>
                  Watch Official YouTube Trailer
                </span>
              </div>
            </>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Header Row */}
          <div className="flex justify-between items-start gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                {movie.matchPercentage && (
                  <span className="bg-[#e50914] text-white px-3 py-0.5 rounded-full text-xs font-montserrat font-bold uppercase tracking-wider shadow-md">
                    {movie.matchPercentage}% Match
                  </span>
                )}
                {movie.badge && (
                  <span className="bg-[#7701d0]/40 border border-[#7701d0]/60 text-[#4cd6ff] px-2.5 py-0.5 rounded-full text-xs font-montserrat font-bold uppercase tracking-wider">
                    {movie.badge}
                  </span>
                )}
                <span className="text-[#e9bcb6]/80 text-xs font-semibold uppercase tracking-widest font-inter">
                  {movie.genre} • {movie.year}
                </span>
                {movie.duration && (
                  <span className="text-white/60 text-xs font-mono">
                    {movie.duration}
                  </span>
                )}
              </div>
              <h2 className="font-montserrat text-2xl sm:text-3xl font-extrabold text-white">
                {movie.title}
              </h2>
            </div>

            <button
              onClick={() => onToggleFavorite(movie)}
              className={`p-3 rounded-full border transition-all active:scale-95 ${
                isFavorite
                  ? 'bg-[#e50914]/20 border-[#e50914] text-[#e50914] shadow-lg shadow-[#e50914]/20'
                  : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
              }`}
              title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            >
              <span
                className="material-symbols-outlined text-2xl"
                style={{ fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0" }}
              >
                favorite
              </span>
            </button>
          </div>

          {/* Synopsis */}
          <p className="font-inter text-sm sm:text-base text-[#e5e2e1]/90 leading-relaxed">
            {movie.synopsis}
          </p>

          {/* Credits */}
          {(movie.director || movie.cast) && (
            <div className="pt-3 border-t border-white/10 text-xs text-[#e9bcb6]/75 space-y-1 font-inter">
              {movie.director && (
                <p><span className="text-white font-bold font-montserrat">Director:</span> {movie.director}</p>
              )}
              {movie.cast && movie.cast.length > 0 && (
                <p><span className="text-white font-bold font-montserrat font-semibold">Cast:</span> {movie.cast.join(', ')}</p>
              )}
            </div>
          )}

          {/* Trailer Actions */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setIsPlayingTrailer(!isPlayingTrailer)}
              className="flex-1 py-3 px-6 rounded-full ai-glow-button text-white font-montserrat font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-lg"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                {isPlayingTrailer ? 'pause' : 'smart_display'}
              </span>
              <span>{isPlayingTrailer ? 'Close Trailer Player' : 'Play YouTube Trailer'}</span>
            </button>

            <a
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title + " official trailer")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-montserrat font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <span className="material-symbols-outlined text-red-500 text-sm">open_in_new</span>
              <span>Open in YouTube</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
