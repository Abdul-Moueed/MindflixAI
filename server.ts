import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// In-Memory Database Store for Supabase sync & persistence
let localFavoritesStore: any[] = [
  {
    id: "fav-1",
    title: "Interstellar",
    year: 2014,
    genre: "Sci-Fi / Odyssey",
    badge: "Cosmic Odyssey",
    synopsis: "When Earth becomes uninhabitable, a team of ex-NASA pilots travels through a wormhole near Saturn in search of a new home.",
    imageUrl: "https://image.tmdb.org/t/p/w500/gEU2QrmL2GlM2E2f1C4L8fL34eM.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/xJHokMbljvjADYdit5fKSuV3v3v.jpg",
    rating: "PG-13",
    voteAverage: 8.7,
    duration: "2h 49m",
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    isFavorite: true,
    aiExplanation: "Matches your deep desire for awe, existential grandeur, and emotional connection across time and space."
  },
  {
    id: "fav-2",
    title: "Blade Runner 2049",
    year: 2017,
    genre: "Cyberpunk Sci-Fi",
    badge: "Visual Masterpiece",
    synopsis: "Officer K, a new blade runner, unearths a long-buried secret that has the potential to plunge society into chaos.",
    imageUrl: "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/sA23vKG8A1S9CAnX7S55n2d2W2x.jpg",
    rating: "R",
    voteAverage: 8.3,
    duration: "2h 44m",
    director: "Denis Villeneuve",
    cast: ["Ryan Gosling", "Harrison Ford", "Ana de Armas"],
    isFavorite: true,
    aiExplanation: "Perfect for a moody, neon-lit contemplative mood craving atmospheric immersion and philosophical depth."
  }
];

let localMoodHistoryStore: any[] = [
  { day: "Mon", value: 40, color: "bg-on-surface-variant/40", moodName: "Peaceful & Calm" },
  { day: "Tue", value: 65, color: "bg-[#4cd6ff]/40", moodName: "Curious & Focused" },
  { day: "Wed", value: 90, color: "bg-[#e50914]/40", moodName: "Deeply Reflective" },
  { day: "Thu", value: 55, color: "bg-[#7701d0]/40", moodName: "Melancholic" },
  { day: "Fri", value: 80, color: "bg-[#4cd6ff]/40", moodName: "Awe-Inspired" },
  { day: "Sat", value: 70, color: "bg-[#e50914]/40", moodName: "Cozy & Warm" },
  { day: "Sun", value: 30, color: "bg-on-surface-variant/20", moodName: "Serene & Idle" }
];

// Gemini Client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not set. API calls will use default intelligent response generator.");
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
};

// High quality movie catalog for rich fallbacks
// Rich movie catalog covering all emotional traits & genres
const DYNAMIC_MOVIE_LIBRARY = [
  {
    id: "m-interstellar",
    title: "Interstellar",
    year: 2014,
    genre: "Sci-Fi / Adventure",
    traits: ["intellectual", "sci-fi", "melancholy"],
    badge: "Cosmic Odyssey",
    synopsis: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    imageUrl: "https://image.tmdb.org/t/p/w500/gEU2QrmL2GlM2E2f1C4L8fL34eM.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/xJHokMbljvjADYdit5fKSuV3v3v.jpg",
    voteAverage: 8.7,
    duration: "2h 49m",
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway"],
    trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    explanation: "Matches your deep desire for awe, existential grandeur, and emotional connection across space and time."
  },
  {
    id: "m-bladerunner",
    title: "Blade Runner 2049",
    year: 2017,
    genre: "Sci-Fi / Cyberpunk",
    traits: ["sci-fi", "melancholy", "dark"],
    badge: "Neon Noir",
    synopsis: "A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard.",
    imageUrl: "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/sA23vKG8A1S9CAnX7S55n2d2W2x.jpg",
    voteAverage: 8.3,
    duration: "2h 44m",
    director: "Denis Villeneuve",
    cast: ["Ryan Gosling", "Harrison Ford"],
    trailerUrl: "https://www.youtube.com/watch?v=gCcx85zbxz4",
    explanation: "Perfect for a moody, neon-lit contemplative state craving atmospheric immersion and philosophical depth."
  },
  {
    id: "m-madmax",
    title: "Mad Max: Fury Road",
    year: 2015,
    genre: "Action / Sci-Fi",
    traits: ["action", "thrill", "dark"],
    badge: "High-Octane Thrill",
    synopsis: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners.",
    imageUrl: "https://image.tmdb.org/t/p/w500/8tZYtuWezp8TbZHYdGbdToYV7Sp.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/nlCH7ToYFi5zMMURuLnFvMpeqXA.jpg",
    voteAverage: 8.1,
    duration: "2h 00m",
    director: "George Miller",
    cast: ["Tom Hardy", "Charlize Theron"],
    trailerUrl: "https://www.youtube.com/watch?v=hEJnMQGLai8",
    explanation: "Delivers relentless, visceral adrenaline and breathtaking visual choreography for a high-intensity mood."
  },
  {
    id: "m-darkknight",
    title: "The Dark Knight",
    year: 2008,
    genre: "Action / Crime",
    traits: ["action", "dark", "thrill"],
    badge: "Masterpiece Crime Thriller",
    synopsis: "When the menace known as the Joker wreaks havoc and chaos on Gotham, Batman must accept one of the greatest psychological tests.",
    imageUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/nMK2819TyGZfqB19j2vY3v3v.jpg",
    voteAverage: 8.5,
    duration: "2h 32m",
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger"],
    trailerUrl: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
    explanation: "Satisfies your demand for complex psychological tension, moral dilemmas, and gripping high-stakes drama."
  },
  {
    id: "m-her",
    title: "Her",
    year: 2013,
    genre: "Romance / Sci-Fi",
    traits: ["romance", "melancholy", "cozy"],
    badge: "Bittersweet Romance",
    synopsis: "A lonely writer develops an unlikely relationship with an AI operating system designed to meet his every need.",
    imageUrl: "https://image.tmdb.org/t/p/w500/yk49STP93S1AAnS6mP3eT20uJ5q.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/gL2Y68Q8W1d8o72X2c0v1M1I0m0.jpg",
    voteAverage: 8.0,
    duration: "2h 06m",
    director: "Spike Jonze",
    cast: ["Joaquin Phoenix", "Scarlett Johansson"],
    trailerUrl: "https://www.youtube.com/watch?v=ne6p6MfLBbo",
    explanation: "Resonates with your longing for emotional warmth, introspection, and soft near-future nostalgia."
  },
  {
    id: "m-spiritedaway",
    title: "Spirited Away",
    year: 2001,
    genre: "Animation / Fantasy",
    traits: ["cozy", "fun", "whimsical"],
    badge: "Whimsical Masterpiece",
    synopsis: "During her family's move to the suburbs, a 10-year-old girl wanders into a world ruled by gods, witches, and spirits.",
    imageUrl: "https://image.tmdb.org/t/p/w500/39wmItE2FMv4F9Rocfb1WWh9Ziv.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/Ab8JuJhF1z6d76Wv3v.jpg",
    voteAverage: 8.5,
    duration: "2h 05m",
    director: "Hayao Miyazaki",
    cast: ["Rumi Hiiragi", "Miyu Irino"],
    trailerUrl: "https://www.youtube.com/watch?v=ByXuk9QqQkk",
    explanation: "Provides pure magical enchantment and cozy comfort for a heart seeking imaginative wonder."
  },
  {
    id: "m-inception",
    title: "Inception",
    year: 2010,
    genre: "Sci-Fi / Action",
    traits: ["mindbend", "action", "intellectual"],
    badge: "Mind-Bending Heist",
    synopsis: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    imageUrl: "https://image.tmdb.org/t/p/w500/ljs28On2SSxD1dF0hZ0YjF0a85.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/s3TBrRGB1iav7y5v.jpg",
    voteAverage: 8.4,
    duration: "2h 28m",
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt"],
    trailerUrl: "https://www.youtube.com/watch?v=YoHD9XEInc0",
    explanation: "Engages your analytical curiosity with multi-layered dream logic and sleek action."
  },
  {
    id: "m-parasite",
    title: "Parasite",
    year: 2019,
    genre: "Thriller / Drama",
    traits: ["dark", "mindbend", "intellectual"],
    badge: "Palme d'Or Winner",
    synopsis: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    imageUrl: "https://image.tmdb.org/t/p/w500/7IiTqvZfyKG0vTzW2F6tM1.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/hiSl10v7pW2x.jpg",
    voteAverage: 8.5,
    duration: "2h 12m",
    director: "Bong Joon Ho",
    cast: ["Song Kang-ho", "Lee Sun-kyun"],
    trailerUrl: "https://www.youtube.com/watch?v=5xH0HfJHsaY",
    explanation: "Delivers razor-sharp social commentary and unpredictable twists for a thrill-seeking mind."
  },
  {
    id: "m-spiderverse",
    title: "Spider-Man: Across the Spider-Verse",
    year: 2023,
    genre: "Animation / Action",
    traits: ["fun", "action", "cozy"],
    badge: "Visual Wonder",
    synopsis: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
    imageUrl: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj7sfd8.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/4XM8L3v.jpg",
    voteAverage: 8.4,
    duration: "2h 20m",
    director: "Joaquim Dos Santos",
    cast: ["Shameik Moore", "Hailee Steinfeld"],
    trailerUrl: "https://www.youtube.com/watch?v=cqGjhVJWtEg",
    explanation: "Immerses you in groundbreaking artistic creativity, fast-paced energy, and heartfelt character bonds."
  },
  {
    id: "m-shutterisland",
    title: "Shutter Island",
    year: 2010,
    genre: "Mystery / Thriller",
    traits: ["mindbend", "dark"],
    badge: "Psychological Thriller",
    synopsis: "In 1954, a U.S. Marshal investigates the disappearance of a murderer who escaped from a hospital for the criminally insane.",
    imageUrl: "https://image.tmdb.org/t/p/w500/4BgSWydCwW0vTzX12.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/s3vW2x.jpg",
    voteAverage: 8.2,
    duration: "2h 18m",
    director: "Martin Scorsese",
    cast: ["Leonardo DiCaprio", "Mark Ruffalo"],
    trailerUrl: "https://www.youtube.com/watch?v=5iaYLCiq5A8",
    explanation: "Creates an eerie, haunting atmospheric puzzle that keeps your mind guessing until the final reveal."
  },
  {
    id: "m-lalaland",
    title: "La La Land",
    year: 2016,
    genre: "Romance / Drama",
    traits: ["romance", "cozy", "melancholy"],
    badge: "Vibrant & Bittersweet",
    synopsis: "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations.",
    imageUrl: "https://image.tmdb.org/t/p/w500/uDO8hOhdDwxKhEChyvuVKhvYiyB.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/v2x1W.jpg",
    voteAverage: 7.9,
    duration: "2h 08m",
    director: "Damien Chazelle",
    cast: ["Ryan Gosling", "Emma Stone"],
    trailerUrl: "https://www.youtube.com/watch?v=0pdqf4P9MB8",
    explanation: "Blends glowing visual music with bittersweet real-life romance for a passionate, soulful mood."
  }
];

const CURATED_CATALOG = DYNAMIC_MOVIE_LIBRARY;

// Smart Dynamic Recommendation Engine (Generates custom picks based on user's exact questionnaire choices)
function generateDynamicRecommendations(answers: any = {}, intensity: number = 80, customPrompt?: string) {
  const text = (JSON.stringify(answers || {}) + " " + (customPrompt || "")).toLowerCase();

  const scores: Record<string, number> = {
    action: 0,
    melancholy: 0,
    cozy: 0,
    mindbend: 0,
    romance: 0,
    dark: 0,
    intellectual: 0,
    fun: 0
  };

  for (const trait in scores) {
    if (text.includes(trait)) scores[trait] += 4;
  }

  if (text.includes("thrill") || text.includes("chase") || text.includes("explosion") || text.includes("speed")) scores.action += 3;
  if (text.includes("sad") || text.includes("rain") || text.includes("nostalgia") || text.includes("lonely")) scores.melancholy += 3;
  if (text.includes("warm") || text.includes("cozy") || text.includes("gentle") || text.includes("soft")) scores.cozy += 3;
  if (text.includes("twist") || text.includes("puzzle") || text.includes("mystery") || text.includes("weird")) scores.mindbend += 3;
  if (text.includes("love") || text.includes("heart") || text.includes("crush") || text.includes("couple")) scores.romance += 3;
  if (text.includes("grim") || text.includes("intense") || text.includes("scary") || text.includes("serial")) scores.dark += 3;
  if (text.includes("space") || text.includes("deep") || text.includes("future") || text.includes("ai")) scores.intellectual += 3;

  for (const k in scores) {
    scores[k] += Math.random() * 2;
  }

  const sortedTraits = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const primaryTrait = sortedTraits[0][0];

  let moodTag = "Contemplative & Atmospheric Resonance";
  if (primaryTrait === "action") moodTag = "High-Octane Adrenaline & Action Focus";
  else if (primaryTrait === "melancholy") moodTag = "Deep Melancholy & Poetic Reflection";
  else if (primaryTrait === "cozy") moodTag = "Warm & Whimsical Emotional Comfort";
  else if (primaryTrait === "mindbend") moodTag = "Mind-Bending Psychological Mystery";
  else if (primaryTrait === "romance") moodTag = "Near-Future Bittersweet Romance";
  else if (primaryTrait === "dark") moodTag = "Dark Psychological Dilemma & Suspense";
  else if (primaryTrait === "intellectual") moodTag = "Cosmic Awe & Existential Odyssey";
  else if (primaryTrait === "fun") moodTag = "Vibrant & Creative Multiverse Energy";

  const matchedMovies = DYNAMIC_MOVIE_LIBRARY.filter(m => m.traits.includes(primaryTrait));
  const topCandidate = matchedMovies.length > 0 ? matchedMovies[0] : DYNAMIC_MOVIE_LIBRARY[Math.floor(Math.random() * DYNAMIC_MOVIE_LIBRARY.length)];

  const remaining = DYNAMIC_MOVIE_LIBRARY.filter(m => m.id !== topCandidate.id);
  const shuffled = [...remaining].sort(() => 0.5 - Math.random());
  const curated = shuffled.slice(0, 3).map((m, idx) => ({
    id: `cur-${idx}-${Date.now()}`,
    title: m.title,
    year: m.year,
    genre: m.genre,
    badge: m.badge,
    synopsis: m.synopsis,
    imageUrl: m.imageUrl,
    backdropUrl: m.backdropUrl,
    voteAverage: m.voteAverage,
    duration: m.duration,
    matchPercentage: Math.max(75, 95 - idx * 3),
    trailerUrl: m.trailerUrl,
    aiExplanation: m.explanation
  }));

  return {
    success: true,
    moodTag,
    confidence: Math.min(99, Math.max(88, Math.floor(intensity * 0.95 + Math.random() * 5))),
    description: `Your responses indicate a ${primaryTrait}-leaning emotional state seeking tailored cinematic resonance.`,
    genres: [topCandidate.genre.split("/")[0].trim()],
    keywords: [primaryTrait, "cinematic", "mood-matched"],
    topPick: {
      id: `top-${Date.now()}`,
      title: topCandidate.title,
      year: topCandidate.year,
      genre: topCandidate.genre,
      matchPercentage: 98,
      synopsis: topCandidate.synopsis,
      tagline: topCandidate.badge,
      imageUrl: topCandidate.imageUrl,
      backdropUrl: topCandidate.backdropUrl,
      voteAverage: topCandidate.voteAverage,
      duration: topCandidate.duration,
      director: topCandidate.director,
      cast: topCandidate.cast,
      trailerUrl: topCandidate.trailerUrl,
      aiExplanation: topCandidate.explanation
    },
    curatedMovies: curated
  };
}

// Helper to fetch TMDB movie details
async function fetchTMDBMovieDetails(title: string, tmdbKey?: string) {
  if (!tmdbKey) return null;
  try {
    const searchRes = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&query=${encodeURIComponent(title)}`);
    if (!searchRes.ok) return null;
    const searchData = await searchRes.json();
    if (!searchData.results || searchData.results.length === 0) return null;

    const movie = searchData.results[0];
    
    // Fetch videos for trailer key
    let trailerUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title + " official trailer")}`;
    try {
      const videoRes = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${tmdbKey}`);
      if (videoRes.ok) {
        const videoData = await videoRes.json();
        const officialTrailer = (videoData.results || []).find(
          (v: any) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser")
        );
        if (officialTrailer && officialTrailer.key) {
          trailerUrl = `https://www.youtube.com/watch?v=${officialTrailer.key}`;
        }
      }
    } catch (e) {
      // ignore
    }

    return {
      tmdbId: movie.id,
      title: movie.title,
      year: new Date(movie.release_date || Date.now()).getFullYear(),
      genre: "Featured Film",
      synopsis: movie.overview || "No overview available.",
      imageUrl: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : undefined,
      backdropUrl: movie.backdrop_path ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` : undefined,
      voteAverage: movie.vote_average ? Math.round(movie.vote_average * 10) / 10 : 8.2,
      voteCount: movie.vote_count || 1200,
      popularity: Math.round(movie.popularity || 85),
      trailerUrl
    };
  } catch (err) {
    return null;
  }
}

// ----------------------------------------------------
// 1. TMDB API Routes
// ----------------------------------------------------
app.get("/api/tmdb/trending", async (req, res) => {
  const tmdbKey = process.env.TMDB_API_KEY;
  if (!tmdbKey) {
    return res.json({
      success: true,
      source: "curated-fallback",
      results: CURATED_CATALOG
    });
  }

  try {
    const tmdbRes = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${tmdbKey}`);
    const tmdbData = await tmdbRes.json();
    const formatted = (tmdbData.results || []).slice(0, 10).map((m: any) => ({
      id: `tmdb-${m.id}`,
      tmdbId: m.id,
      title: m.title || m.original_title,
      year: new Date(m.release_date || Date.now()).getFullYear(),
      genre: "Trending",
      synopsis: m.overview || "No overview available.",
      imageUrl: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : CURATED_CATALOG[0].imageUrl,
      backdropUrl: m.backdrop_path ? `https://image.tmdb.org/t/p/w1280${m.backdrop_path}` : CURATED_CATALOG[0].backdropUrl,
      voteAverage: m.vote_average ? Math.round(m.vote_average * 10) / 10 : 8.1,
      popularity: Math.round(m.popularity || 90),
      duration: "2h 10m",
      rating: m.adult ? "R" : "PG-13",
      trailerUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent((m.title || m.original_title) + " official trailer")}`
    }));

    res.json({ success: true, results: formatted });
  } catch (err: any) {
    res.json({ success: true, results: CURATED_CATALOG });
  }
});

app.get("/api/tmdb/search", async (req, res) => {
  const query = req.query.q as string;
  const tmdbKey = process.env.TMDB_API_KEY;

  if (!query) return res.json({ success: true, results: [] });

  if (!tmdbKey) {
    const matched = CURATED_CATALOG.filter(m => 
      m.title.toLowerCase().includes(query.toLowerCase()) || 
      m.genre.toLowerCase().includes(query.toLowerCase()) ||
      m.synopsis.toLowerCase().includes(query.toLowerCase())
    );
    return res.json({
      success: true,
      source: "curated-search",
      results: matched.length > 0 ? matched : CURATED_CATALOG.slice(0, 3)
    });
  }

  try {
    const tmdbRes = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&query=${encodeURIComponent(query)}`);
    const tmdbData = await tmdbRes.json();
    const formatted = (tmdbData.results || []).slice(0, 10).map((m: any) => ({
      id: `tmdb-${m.id}`,
      tmdbId: m.id,
      title: m.title,
      year: new Date(m.release_date || Date.now()).getFullYear(),
      genre: "Movie",
      synopsis: m.overview || "No synopsis available.",
      imageUrl: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : CURATED_CATALOG[0].imageUrl,
      backdropUrl: m.backdrop_path ? `https://image.tmdb.org/t/p/w1280${m.backdrop_path}` : CURATED_CATALOG[0].backdropUrl,
      voteAverage: m.vote_average ? Math.round(m.vote_average * 10) / 10 : 7.8,
      trailerUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(m.title + " official trailer")}`
    }));

    res.json({ success: true, results: formatted });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ----------------------------------------------------
// 2. Supabase Favorites & History Persistence API Routes
// ----------------------------------------------------
app.get("/api/supabase/favorites", (req, res) => {
  res.json({ success: true, favorites: localFavoritesStore });
});

app.post("/api/supabase/favorites", (req, res) => {
  const { movie } = req.body;
  if (movie) {
    localFavoritesStore = [
      { ...movie, isFavorite: true },
      ...localFavoritesStore.filter(m => m.id !== movie.id)
    ];
  }
  res.json({ success: true, message: "Favorite saved to database", favorites: localFavoritesStore });
});

app.delete("/api/supabase/favorites", (req, res) => {
  const { movie } = req.body;
  if (movie) {
    localFavoritesStore = localFavoritesStore.filter(m => m.id !== movie.id);
  }
  res.json({ success: true, message: "Favorite removed from database", favorites: localFavoritesStore });
});

app.post("/api/supabase/history", (req, res) => {
  const { moodName, score } = req.body;
  localMoodHistoryStore.unshift({
    day: "Today",
    value: score || 85,
    color: "bg-[#e50914]/40",
    moodName: moodName || "Custom Vibe"
  });
  res.json({ success: true, history: localMoodHistoryStore });
});

// ----------------------------------------------------
// 3. Gemini AI Mood Curation Endpoint
// ----------------------------------------------------
app.post("/api/analyze-mood", async (req, res) => {
  try {
    const { answers, intensity, prompt } = req.body;
    const ai = getGeminiClient();
    const tmdbKey = process.env.TMDB_API_KEY;

    if (!ai) {
      // Dynamic fallback response based on user's exact questionnaire choices & mood intensity
      return res.json(generateDynamicRecommendations(answers, intensity, prompt));
    }

    const promptText = `
You are MindFlix AI, an expert AI movie psychologist.

Analyze the user's emotional profile.

User Answers:
${JSON.stringify(answers || {})}

Mood Intensity:
${intensity || 80}

Custom Request:
${prompt || "None"}

Your task:

- Detect the user's emotional state.
- Recommend exactly ONE Top Pick.
- Recommend FIVE additional movies.
- Recommend REAL movies only.
- Do NOT repeatedly recommend Interstellar, Blade Runner 2049, Arrival, Her, or Everything Everywhere All At Once unless they are clearly the best fit.
- Prefer hidden gems, international cinema, classics, indie films, recent releases, and underrated masterpieces.
- Every recommendation must be different and fresh.
- Mix genres naturally.
- Explain why every movie matches the user's emotions in 2–3 sentences.

Return strictly JSON with this schema:
{
  "moodTag": "string",
  "confidence": 95,
  "description": "string",
  "genres": ["string"],
  "keywords": ["string"],
  "topPick": {
    "title": "string",
    "year": 2023,
    "genre": "string",
    "matchPercentage": 98,
    "synopsis": "string",
    "tagline": "string",
    "reason": "string"
  },
  "curatedMovies": [
    {
      "title": "string",
      "year": 2022,
      "genre": "string",
      "badge": "string",
      "reason": "string"
    }
  ]
}`;

    const geminiResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: promptText,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            moodTag: { type: Type.STRING },
            confidence: { type: Type.INTEGER },
            description: { type: Type.STRING },
            genres: { type: Type.ARRAY, items: { type: Type.STRING } },
            keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
            topPick: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                year: { type: Type.INTEGER },
                genre: { type: Type.STRING },
                matchPercentage: { type: Type.INTEGER },
                synopsis: { type: Type.STRING },
                tagline: { type: Type.STRING },
                reason: { type: Type.STRING }
              },
              required: ["title", "year", "genre", "matchPercentage", "synopsis", "tagline", "reason"]
            },
            curatedMovies: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  year: { type: Type.INTEGER },
                  genre: { type: Type.STRING },
                  badge: { type: Type.STRING },
                  reason: { type: Type.STRING }
                },
                required: ["title", "year", "genre", "badge", "reason"]
              }
            }
          },
          required: ["moodTag", "confidence", "description", "topPick", "curatedMovies"]
        }
      }
    });

    const parsedData = JSON.parse(geminiResponse.text || "{}");
    console.log("===== GEMINI RESPONSE =====");
console.log(JSON.stringify(parsedData, null, 2));
console.log("===========================");

    // Enrich Top Pick with real TMDB details if available
    let enrichedTopPick = { ...parsedData.topPick };
    const tmdbTop = await fetchTMDBMovieDetails(parsedData.topPick.title, tmdbKey);
    if (tmdbTop) {
      enrichedTopPick = {
        ...enrichedTopPick,
        ...tmdbTop,
        id: `top-${Date.now()}`,
        matchPercentage: parsedData.topPick.matchPercentage || 98,
        aiExplanation: parsedData.topPick.reason || `This movie matches your current emotional state because it resonates with your ${parsedData.moodTag} mood.`
      };
    } else {
      const fallback = CURATED_CATALOG[0];
      enrichedTopPick = {
        id: `top-${Date.now()}`,
        title: parsedData.topPick.title || fallback.title,
        year: parsedData.topPick.year || fallback.year,
        genre: parsedData.topPick.genre || fallback.genre,
        matchPercentage: parsedData.topPick.matchPercentage || 98,
        synopsis: parsedData.topPick.synopsis || fallback.synopsis,
        tagline: parsedData.topPick.tagline || "Top Pick for your mood",
        imageUrl: fallback.imageUrl,
        backdropUrl: fallback.backdropUrl,
        voteAverage: 8.8,
        duration: "2h 20m",
        trailerUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(parsedData.topPick.title + " official trailer")}`,
        aiExplanation: parsedData.topPick.reason || "This movie matches your current emotional state because of its profound atmospheric storytelling."
      };
    }

    // Enrich Curated Movies
    const enrichedCurated: any[] = [];
    if (Array.isArray(parsedData.curatedMovies)) {
      for (let idx = 0; idx < parsedData.curatedMovies.length; idx++) {
        const item = parsedData.curatedMovies[idx];
        const tmdbItem = await fetchTMDBMovieDetails(item.title, tmdbKey);
       const fallback =
  CURATED_CATALOG[Math.floor(Math.random() * CURATED_CATALOG.length)];

        if (tmdbItem) {
          enrichedCurated.push({
            id: `cur-${idx}-${Date.now()}`,
            ...item,
            ...tmdbItem,
            matchPercentage: Math.max(75, 95 - idx * 3),
            aiExplanation: item.reason || `This movie matches your current emotional state because of its unique tone and resonance with ${parsedData.moodTag}.`
          });
       } else {
    enrichedCurated.push({
        id: `cur-${idx}-${Date.now()}`,
        title: item.title,
        year: item.year,
        genre: item.genre,
        badge: item.badge || "AI Recommendation",
        synopsis: item.reason || "",
        imageUrl: "",
        backdropUrl: "",
        voteAverage: 0,
        matchPercentage: Math.max(75, 95 - idx * 3),
        trailerUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(item.title + " official trailer")}`,
        aiExplanation: item.reason || "Recommended based on your mood."
    });
}
      }
    }

    return res.json({
      success: true,
      moodTag: parsedData.moodTag || "Reflective & Introspective",
      confidence: parsedData.confidence || 95,
      description: parsedData.description || "Your answers indicate a mood seeking atmospheric cinematic resonance.",
      genres: parsedData.genres || ["Drama", "Sci-Fi"],
      keywords: parsedData.keywords || ["reflection", "depth"],
      topPick: enrichedTopPick,
      curatedMovies: enrichedCurated
    });
  } catch (error: any) {
    console.error("Error analyzing mood:", error);
    return res.json(generateDynamicRecommendations(req.body.answers, req.body.intensity, req.body.prompt));
  }
});

// Start Server & Vite Setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`MindFlix AI Server running on http://0.0.0.0:${PORT}`);
  });
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;
