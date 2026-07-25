/**
 * Converts a YouTube URL or video ID into a clean embeddable YouTube URL.
 * Fallback to a YouTube search embed or high quality cinematic trailer.
 */
export function getYouTubeEmbedUrl(trailerUrlOrTitle?: string, movieTitle?: string): string {
  const defaultTrailer = "https://www.youtube.com/embed/zSWdZVtXT7E?autoplay=1&rel=0"; // Interstellar Trailer

  if (!trailerUrlOrTitle && !movieTitle) {
    return defaultTrailer;
  }

  const url = trailerUrlOrTitle || '';

  // Case 1: Already an embed URL
  if (url.includes('youtube.com/embed/')) {
    const cleanUrl = url.split('?')[0];
    return `${cleanUrl}?autoplay=1&rel=0`;
  }

  // Case 2: youtube.com/watch?v=VIDEO_ID
  const watchMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/);
  if (watchMatch && watchMatch[1]) {
    return `https://www.youtube.com/embed/${watchMatch[1]}?autoplay=1&rel=0`;
  }

  // Case 3: Standard video file URL (.mp4, .webm) - keep as is
  if (url.endsWith('.mp4') || url.endsWith('.webm')) {
    return url;
  }

  // Case 4: Search embed by title if provided
  if (movieTitle) {
    const encodedTitle = encodeURIComponent(`${movieTitle} official trailer`);
    return `https://www.youtube.com/embed?listType=search&list=${encodedTitle}&autoplay=1`;
  }

  return defaultTrailer;
}

export function openTrailerUrl(trailerUrl?: string, movieTitle?: string): void {
  let targetUrl = '';

  if (trailerUrl && trailerUrl.includes('youtube.com/watch')) {
    targetUrl = trailerUrl;
  } else if (trailerUrl && trailerUrl.includes('youtu.be/')) {
    const videoId = trailerUrl.split('youtu.be/')[1]?.split('?')[0];
    targetUrl = `https://www.youtube.com/watch?v=${videoId}`;
  } else if (trailerUrl && trailerUrl.includes('youtube.com/embed/')) {
    const videoId = trailerUrl.split('youtube.com/embed/')[1]?.split('?')[0];
    targetUrl = `https://www.youtube.com/watch?v=${videoId}`;
  } else {
    const title = movieTitle || "Movie";
    targetUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(title + " official trailer")}`;
  }

  window.open(targetUrl, '_blank', 'noopener,noreferrer');
}

export function isDirectVideoUrl(url?: string): boolean {
  if (!url) return false;
  return url.endsWith('.mp4') || url.endsWith('.webm') || url.includes('commondatastorage.googleapis.com');
}
