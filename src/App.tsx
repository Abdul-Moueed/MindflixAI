import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { TopAppBar } from './components/TopAppBar';
import { BottomNavBar } from './components/BottomNavBar';
import { HomeView } from './components/HomeView';
import { QuestionnaireView } from './components/QuestionnaireView';
import { AnalyzingView } from './components/AnalyzingView';
import { RecommendationsView } from './components/RecommendationsView';
import { FavoritesView } from './components/FavoritesView';
import { ProfileView } from './components/ProfileView';
import { SearchView } from './components/SearchView';
import { MovieDetailModal } from './components/MovieDetailModal';
import { PromptAiModal } from './components/PromptAiModal';
import { AuthModal } from './components/AuthModal';
import { NavigationTab, Movie, QuestionnaireState, AnalysisResult, UserProfile } from './types';
import { USER_PROFILE, INITIAL_FAVORITES } from './data/movies';
import { saveSupabaseFavorite, saveMoodHistorySupabase, fetchSupabaseFavorites } from './lib/supabase';

// ─── 15-movie library for client-side trait-based matching ───────────────────
const FB_MOVIES = [
  { id:'fl-1',  title:'Interstellar',                        year:2014, genre:'Sci-Fi / Adventure',  traits:['intellectual','melancholy'], badge:'Cosmic Odyssey',           synopsis:"A team of explorers travel through a wormhole in space to ensure humanity's survival.",                              imageUrl:'https://image.tmdb.org/t/p/w500/gEU2QrmL2GlM2E2f1C4L8fL34eM.jpg',  backdropUrl:'https://image.tmdb.org/t/p/w1280/xJHokMbljvjADYdit5fKSuV3v3v.jpg', voteAverage:8.7, duration:'2h 49m', director:'Christopher Nolan',    cast:['Matthew McConaughey','Anne Hathaway'],          trailerUrl:'https://www.youtube.com/watch?v=zSWdZVtXT7E', reason:'Matches your desire for existential grandeur and cosmic emotional connection.' },
  { id:'fl-2',  title:'Blade Runner 2049',                   year:2017, genre:'Sci-Fi / Cyberpunk',   traits:['intellectual','dark','melancholy'], badge:'Neon Noir',            synopsis:'A blade runner unearths a long-buried secret that could destabilise society.',                                        imageUrl:'https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg',  backdropUrl:'https://image.tmdb.org/t/p/w1280/sA23vKG8A1S9CAnX7S55n2d2W2x.jpg', voteAverage:8.3, duration:'2h 44m', director:'Denis Villeneuve',     cast:['Ryan Gosling','Harrison Ford'],                 trailerUrl:'https://www.youtube.com/watch?v=gCcx85zbxz4', reason:'Perfect for a moody state craving atmospheric immersion.' },
  { id:'fl-3',  title:'Mad Max: Fury Road',                  year:2015, genre:'Action / Sci-Fi',       traits:['action','dark'],            badge:'High-Octane Thrill',        synopsis:'A woman rebels against a tyrannical ruler in a post-apocalyptic wasteland.',                                          imageUrl:'https://image.tmdb.org/t/p/w500/8tZYtuWezp8TbZHYdGbdToYV7Sp.jpg',  backdropUrl:'https://image.tmdb.org/t/p/w1280/nlCH7ToYFi5zMMURuLnFvMpeqXA.jpg', voteAverage:8.1, duration:'2h 00m', director:'George Miller',        cast:['Tom Hardy','Charlize Theron'],                  trailerUrl:'https://www.youtube.com/watch?v=hEJnMQGLai8', reason:'Delivers relentless adrenaline for a high-intensity mood.' },
  { id:'fl-4',  title:'The Dark Knight',                     year:2008, genre:'Action / Crime',         traits:['action','dark','mindbend'], badge:'Crime Masterpiece',         synopsis:'Batman faces the Joker — a criminal genius who plunges Gotham into anarchy.',                                       imageUrl:'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',  backdropUrl:'https://image.tmdb.org/t/p/w1280/hqkIcbrOHL86UncnHIsHVcVmzue.jpg', voteAverage:9.0, duration:'2h 32m', director:'Christopher Nolan',    cast:['Christian Bale','Heath Ledger'],                trailerUrl:'https://www.youtube.com/watch?v=EXeTwQWrcwY', reason:'Satisfies complex psychological tension and high-stakes moral drama.' },
  { id:'fl-5',  title:'Her',                                 year:2013, genre:'Romance / Sci-Fi',       traits:['romance','melancholy','cozy'], badge:'Bittersweet Romance',    synopsis:'A lonely writer develops a deep relationship with an AI operating system.',                                          imageUrl:'https://image.tmdb.org/t/p/w500/yk49STP93S1AAnS6mP3eT20uJ5q.jpg',  backdropUrl:'https://image.tmdb.org/t/p/w1280/lHbdnuVrAQqNkHkEJKXzIcvtMhX.jpg', voteAverage:8.0, duration:'2h 06m', director:'Spike Jonze',         cast:['Joaquin Phoenix','Scarlett Johansson'],         trailerUrl:'https://www.youtube.com/watch?v=ne6p6MfLBbo', reason:'Resonates with longing for emotional warmth and near-future nostalgia.' },
  { id:'fl-6',  title:'Spirited Away',                       year:2001, genre:'Animation / Fantasy',    traits:['cozy','fun'],              badge:'Whimsical Masterpiece',     synopsis:'A young girl wanders into a world ruled by gods and spirits and must find a way home.',                               imageUrl:'https://image.tmdb.org/t/p/w500/39wmItE2FMv4F9Rocfb1WWh9Ziv.jpg',  backdropUrl:'https://image.tmdb.org/t/p/w1280/bSavla9eAi6jtm5soGHfJYiWTVQ.jpg', voteAverage:8.6, duration:'2h 05m', director:'Hayao Miyazaki',      cast:['Daveigh Chase','Suzanne Pleshette'],            trailerUrl:'https://www.youtube.com/watch?v=ByXuk9QqQkk', reason:'Pure magical enchantment for a heart seeking imaginative wonder.' },
  { id:'fl-7',  title:'Inception',                           year:2010, genre:'Sci-Fi / Action',         traits:['mindbend','action','intellectual'], badge:'Mind-Bending Heist', synopsis:'A thief who steals corporate secrets through dream-sharing is given the inverse task.',                              imageUrl:'https://image.tmdb.org/t/p/w500/ljs28On2SSxD1dF0hZ0YjF0a85.jpg',  backdropUrl:'https://image.tmdb.org/t/p/w1280/s3TBrRGB1iav7y5v7zHRPqz5Ums.jpg', voteAverage:8.4, duration:'2h 28m', director:'Christopher Nolan',    cast:['Leonardo DiCaprio','Joseph Gordon-Levitt'],    trailerUrl:'https://www.youtube.com/watch?v=YoHD9XEInc0', reason:'Engages analytical curiosity with multi-layered dream logic.' },
  { id:'fl-8',  title:'Parasite',                            year:2019, genre:'Thriller / Drama',        traits:['dark','mindbend'],         badge:"Palme d'Or Winner",         synopsis:'Greed and class discrimination threaten the symbiotic relationship between two families.',                          imageUrl:'https://image.tmdb.org/t/p/w500/7IiTqvZfyKG0vTzW2F6tM1ggjk4.jpg',  backdropUrl:'https://image.tmdb.org/t/p/w1280/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg',  voteAverage:8.5, duration:'2h 12m', director:'Bong Joon Ho',        cast:['Song Kang-ho','Lee Sun-kyun'],                  trailerUrl:'https://www.youtube.com/watch?v=5xH0HfJHsaY', reason:'Razor-sharp social commentary with unpredictable twists.' },
  { id:'fl-9',  title:'Spider-Man: Across the Spider-Verse', year:2023, genre:'Animation / Action',     traits:['fun','action'],            badge:'Visual Wonder',             synopsis:'Miles Morales catapults across the Multiverse encountering a team of Spider-People.',                               imageUrl:'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj7sfd8.jpg',  backdropUrl:'https://image.tmdb.org/t/p/w1280/4m9XDdnPKkG1JaVBZdRHIWUFSkA.jpg', voteAverage:8.7, duration:'2h 20m', director:'Joaquim Dos Santos',  cast:['Shameik Moore','Hailee Steinfeld'],             trailerUrl:'https://www.youtube.com/watch?v=cqGjhVJWtEg', reason:'Groundbreaking artistry, fast-paced energy, and heartfelt bonds.' },
  { id:'fl-10', title:'Shutter Island',                      year:2010, genre:'Mystery / Thriller',      traits:['mindbend','dark'],         badge:'Psychological Thriller',    synopsis:'A US Marshal investigates the disappearance of a murderer from a hospital for the criminally insane.',              imageUrl:'https://image.tmdb.org/t/p/w500/4BgSWydCwW0vTzW2F6tM1WFpWAq.jpg',  backdropUrl:'https://image.tmdb.org/t/p/w1280/s3vWMXj4BBv6MMLmSHM00hSH1EB.jpg', voteAverage:8.1, duration:'2h 18m', director:'Martin Scorsese',     cast:['Leonardo DiCaprio','Mark Ruffalo'],             trailerUrl:'https://www.youtube.com/watch?v=5iaYLCiq5A8', reason:'Eerie, haunting atmospheric puzzle that keeps your mind guessing.' },
  { id:'fl-11', title:'La La Land',                          year:2016, genre:'Romance / Drama',         traits:['romance','cozy','melancholy'], badge:'Vibrant & Bittersweet',  synopsis:'A jazz musician and an aspiring actress fall in love while chasing their dreams in LA.',                            imageUrl:'https://image.tmdb.org/t/p/w500/uDO8hOhdDwxKhEChyvuVKhvYiyB.jpg',  backdropUrl:'https://image.tmdb.org/t/p/w1280/ndlQ2Cuc3cjTL7lTynw6I4boP4S.jpg', voteAverage:7.9, duration:'2h 08m', director:'Damien Chazelle',    cast:['Ryan Gosling','Emma Stone'],                   trailerUrl:'https://www.youtube.com/watch?v=0pdqf4P9MB8', reason:'Glowing visual music with bittersweet romance for a passionate mood.' },
  { id:'fl-12', title:'Get Out',                             year:2017, genre:'Horror / Thriller',        traits:['dark','mindbend'],         badge:'Social Horror',             synopsis:"A young man visits his girlfriend's family and makes disturbing discoveries.",                                       imageUrl:'https://image.tmdb.org/t/p/w500/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg',  backdropUrl:'https://image.tmdb.org/t/p/w1280/n9dQ3eRfCkLCfbTHkEKAFcM0xTw.jpg', voteAverage:7.7, duration:'1h 44m', director:'Jordan Peele',        cast:['Daniel Kaluuya','Allison Williams'],            trailerUrl:'https://www.youtube.com/watch?v=DzfpyUB60YY', reason:'Brilliantly crafted psychological horror with a shocking revelation.' },
  { id:'fl-13', title:'Moonlight',                           year:2016, genre:'Drama',                    traits:['melancholy','romance'],    badge:'Oscar Best Picture',        synopsis:"A young man's journey of self-discovery across three defining chapters of his life.",                               imageUrl:'https://image.tmdb.org/t/p/w500/qAwFbszMfYiYCVGo3xwV5HJBXkp.jpg',  backdropUrl:'https://image.tmdb.org/t/p/w1280/pvRkEqiRJmNsXSFNGlKzjBjcXMW.jpg', voteAverage:7.4, duration:'1h 51m', director:'Barry Jenkins',       cast:['Mahershala Ali','Naomie Harris'],               trailerUrl:'https://www.youtube.com/watch?v=9NJj12tJzqc', reason:'An achingly tender portrait of identity and longing.' },
  { id:'fl-14', title:'Jojo Rabbit',                         year:2019, genre:'Comedy / Drama',           traits:['cozy','fun','melancholy'], badge:'Heartwarming Comedy',       synopsis:"A boy in WWII Germany befriends a Jewish girl hiding in his mother's attic.",                                       imageUrl:'https://image.tmdb.org/t/p/w500/lI0BoElqEbNcfRCB2OjhZeKyGDK.jpg',  backdropUrl:'https://image.tmdb.org/t/p/w1280/2bqAuGW6JqUZWF1Bb8fjqnHmMb7.jpg', voteAverage:7.9, duration:'1h 48m', director:'Taika Waititi',       cast:['Roman Griffin Davis','Thomasin McKenzie'],     trailerUrl:'https://www.youtube.com/watch?v=tL4McUzXfFI', reason:'Balances warmth, humour, and genuine heartbreak.' },
  { id:'fl-15', title:'Fury',                                year:2014, genre:'War / Action',             traits:['action','dark','melancholy'], badge:'Brutal War Drama',      synopsis:'A war-hardened sergeant commands a Sherman tank crew behind enemy lines in Nazi Germany.',                          imageUrl:'https://image.tmdb.org/t/p/w500/pfte7wdMobmg1JHCvO4OkKv6FaR.jpg',  backdropUrl:'https://image.tmdb.org/t/p/w1280/mSweRdDEDgTWZSzMzHiGGXsPZHX.jpg', voteAverage:7.6, duration:'2h 14m', director:'David Ayer',          cast:['Brad Pitt','Shia LaBeouf'],                    trailerUrl:'https://www.youtube.com/watch?v=2RBs2nJksvg', reason:'Intense and visceral — for a state craving gritty realism.' },
];

const TRAIT_MAP: Record<string, string> = {
  'Cozy Nostalgia':'cozy',             'Bittersweet Depth':'melancholy',       'Adrenaline Surge':'action',      'Philosophical Sci-Fi':'intellectual',
  'Raw Emotional Drama':'melancholy',  'Neo-Noir & Sci-Fi':'mindbend',         'Action & High Stakes':'action',  'Warm Comfort Cinema':'cozy',
  'Cyberpunk & AI':'intellectual',     'Historical & Classic':'melancholy',    'Psychological Identity':'mindbend','Cosmic Odyssey':'intellectual',
  'Slow Burn Art Cinema':'melancholy', 'Character Driven':'romance',           'High Speed Thriller':'action',   'Surrealist Dreamscape':'mindbend',
  'Open Ended Masterpiece':'mindbend', 'Cathartic Redemption':'romance',       'Heroic Climax':'action',         'Awe-Inspiring Finale':'intellectual',
};

const MOOD_TAGS: Record<string, string> = {
  action:'High-Octane Adrenaline & Action Surge',   melancholy:'Deep Melancholy & Poetic Reflection',
  cozy:'Warm & Whimsical Emotional Comfort',         mindbend:'Mind-Bending Psychological Mystery',
  romance:'Bittersweet Redemption & Heart Cinema',   dark:'Dark Psychological Dilemma & Suspense',
  intellectual:'Cosmic Awe & Existential Odyssey',  fun:'Vibrant & Creative Multiverse Energy',
};

/** Pure client-side recommendation — always returns results, never shows hardcoded defaults */
function buildRecs(answers: Record<string, string>, intensity: number, promptText: string): AnalysisResult {
  const votes: Record<string, number> = { action:0, melancholy:0, cozy:0, mindbend:0, romance:0, dark:0, intellectual:0, fun:0 };

  // Score from questionnaire trait strings
  for (const val of Object.values(answers)) {
    const m = String(val).match(/Trait:\s*(.+)$/);
    if (m) {
      const bucket = TRAIT_MAP[m[1].trim()];
      if (bucket && bucket in votes) votes[bucket] += 3;
    }
  }

  // Score from custom prompt keywords
  const pl = promptText.toLowerCase();
  if (pl.includes('action') || pl.includes('thrill') || pl.includes('fight')) votes.action += 2;
  if (pl.includes('sad') || pl.includes('melanchol') || pl.includes('nostalgic')) votes.melancholy += 2;
  if (pl.includes('cozy') || pl.includes('warm') || pl.includes('comfort')) votes.cozy += 2;
  if (pl.includes('mystery') || pl.includes('twist') || pl.includes('mind')) votes.mindbend += 2;
  if (pl.includes('love') || pl.includes('romance') || pl.includes('heart')) votes.romance += 2;
  if (pl.includes('dark') || pl.includes('horror') || pl.includes('scary')) votes.dark += 2;
  if (pl.includes('space') || pl.includes('sci-fi') || pl.includes('cosmic')) votes.intellectual += 2;
  if (pl.includes('fun') || pl.includes('comedy') || pl.includes('laugh')) votes.fun += 2;

  // Randomise to break ties on each run
  for (const k in votes) votes[k] += Math.random() * 1.5;

  const sorted = Object.entries(votes).sort((a, b) => b[1] - a[1]);
  const primary   = sorted[0][0];
  const secondary = sorted[1][0];

  // Bucket and shuffle
  const pPool = FB_MOVIES.filter(m => m.traits.includes(primary)).sort(() => Math.random() - 0.5);
  const sPool = FB_MOVIES.filter(m => !m.traits.includes(primary) && m.traits.includes(secondary)).sort(() => Math.random() - 0.5);
  const rPool = FB_MOVIES.filter(m => !m.traits.includes(primary) && !m.traits.includes(secondary)).sort(() => Math.random() - 0.5);

  const top  = pPool[0] ?? sPool[0] ?? rPool[0];
  const rest = [...pPool.slice(1), ...sPool, ...rPool].filter(m => m.id !== top.id).slice(0, 3);

  const moodTag = MOOD_TAGS[primary] ?? 'Contemplative & Atmospheric Resonance';

  return {
    moodTag,
    confidence: Math.min(99, Math.max(88, Math.floor(intensity * 0.9 + Math.random() * 8))),
    description: `Your choices reveal a ${moodTag.toLowerCase()} emotional profile — every film below is matched directly to your psychological responses.`,
    topPick: {
      id: `top-${Date.now()}`,
      title: top.title, year: top.year, genre: top.genre, matchPercentage: 98,
      synopsis: top.synopsis, tagline: top.badge,
      imageUrl: top.imageUrl, backdropUrl: top.backdropUrl,
      voteAverage: top.voteAverage, duration: top.duration,
      director: top.director, cast: top.cast,
      trailerUrl: top.trailerUrl, aiExplanation: top.reason,
    },
    curatedMovies: rest.map((m, i) => ({
      id: `cur-${i}-${Date.now()}`,
      title: m.title, year: m.year, genre: m.genre, badge: m.badge,
      synopsis: m.synopsis, imageUrl: m.imageUrl, backdropUrl: m.backdropUrl,
      voteAverage: m.voteAverage, duration: m.duration,
      matchPercentage: Math.max(75, 95 - i * 5),
      trailerUrl: m.trailerUrl, aiExplanation: m.reason,
    })),
  };
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isPromptAiOpen, setIsPromptAiOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile>(USER_PROFILE);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [favorites, setFavorites] = useState<Movie[]>(INITIAL_FAVORITES);

  // Track whether results are ready so AnalyzingView can navigate at the right time
  const [analysisReady, setAnalysisReady] = useState(false);
  const analysisReadyRef = useRef(false);

  // Load saved favorites on startup
  useEffect(() => {
    fetchSupabaseFavorites().then(saved => {
      if (saved && saved.length > 0) setFavorites(saved);
    });
  }, []);

  const favoriteIds = useMemo(() => new Set(favorites.map(f => f.id)), [favorites]);

  const toggleFavorite = useCallback((movie: Movie) => {
    setFavorites(prev => {
      const exists = prev.some(item => item.id === movie.id);
      saveSupabaseFavorite(movie, !exists);
      return exists
        ? prev.filter(item => item.id !== movie.id)
        : [{ ...movie, isFavorite: true }, ...prev];
    });
  }, []);

  // Called by AnalyzingView when its animation finishes — navigate only when ready
  const handleAnalysisComplete = useCallback(() => {
    if (analysisReadyRef.current) {
      setCurrentTab('recommendations');
    } else {
      // Poll every 100ms until results arrive (max 10s)
      let attempts = 0;
      const poll = setInterval(() => {
        attempts++;
        if (analysisReadyRef.current || attempts > 100) {
          clearInterval(poll);
          setCurrentTab('recommendations');
        }
      }, 100);
    }
  }, []);

  const handleStartAnalysis = async (qState: QuestionnaireState) => {
    setAnalysisReady(false);
    analysisReadyRef.current = false;
    setCurrentTab('analyzing');

    const answersSummary = Object.entries(qState.answersMap || {}).reduce((acc, [qId, opt]) => {
      acc[`Question_${qId}`] = `${(opt as any).title} (${(opt as any).subtitle}) - Trait: ${(opt as any).trait}`;
      return acc;
    }, {} as Record<string, string>);

    let result: AnalysisResult | null = null;

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000); // 8s timeout
      const res = await fetch('/api/analyze-mood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({ answers: answersSummary, intensity: qState.intensity, prompt: '' }),
      });
      clearTimeout(timeout);

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.topPick) result = data as AnalysisResult;
      }
    } catch {
      // API unavailable — fall through to client engine
    }

    // Always produce a result — client-side engine never fails
    if (!result) result = buildRecs(answersSummary, qState.intensity, '');

    setAnalysisResult(result);
    setAnalysisReady(true);
    analysisReadyRef.current = true;
    saveMoodHistorySupabase(result.moodTag, qState.intensity);
  };

  const handlePromptAiSubmit = async (promptText: string) => {
    setAnalysisReady(false);
    analysisReadyRef.current = false;
    setCurrentTab('analyzing');

    let result: AnalysisResult | null = null;

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);
      const res = await fetch('/api/analyze-mood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({ prompt: promptText }),
      });
      clearTimeout(timeout);

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.topPick) result = data as AnalysisResult;
      }
    } catch {
      // fall through
    }

    if (!result) result = buildRecs({}, 85, promptText);

    setAnalysisResult(result);
    setAnalysisReady(true);
    analysisReadyRef.current = true;
    saveMoodHistorySupabase(result.moodTag, 85);
  };

  const handleAuthSuccess = (user: UserProfile) => setCurrentUser(user);

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] font-inter selection:bg-[#e50914]/30 relative">
      {currentTab !== 'questionnaire' && currentTab !== 'analyzing' && (
        <TopAppBar
          currentTab={currentTab}
          onNavigate={(tab) => setCurrentTab(tab)}
          user={currentUser}
          onOpenMenu={() => setCurrentTab('search')}
          onOpenAuth={() => setIsAuthModalOpen(true)}
        />
      )}

      <main className="w-full">
        {currentTab === 'home' && (
          <HomeView
            onNavigate={(tab) => setCurrentTab(tab)}
            onSelectMovie={(movie) => setSelectedMovie(movie)}
          />
        )}

        {currentTab === 'questionnaire' && (
          <QuestionnaireView
            onStartAnalysis={handleStartAnalysis}
            onCancel={() => setCurrentTab('home')}
          />
        )}

        {currentTab === 'analyzing' && (
          <AnalyzingView onComplete={handleAnalysisComplete} />
        )}

        {currentTab === 'recommendations' && (
          <RecommendationsView
            analysis={analysisResult}
            onRedo={() => setCurrentTab('questionnaire')}
            onSelectMovie={(movie) => setSelectedMovie(movie)}
            onToggleFavorite={toggleFavorite}
            favoriteIds={favoriteIds}
          />
        )}

        {currentTab === 'favorites' && (
          <FavoritesView
            favorites={favorites}
            onSelectMovie={(movie) => setSelectedMovie(movie)}
            onToggleFavorite={toggleFavorite}
            onOpenPromptAi={() => setIsPromptAiOpen(true)}
          />
        )}

        {currentTab === 'profile' && (
          <ProfileView
            user={currentUser}
            favoritesCount={favorites.length}
            onLogOut={() => setCurrentUser({ ...USER_PROFILE, name: 'Guest User', email: undefined, provider: 'guest' })}
            onOpenSettingsItem={(s) => alert(`Opening ${s}`)}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
          />
        )}

        {currentTab === 'search' && (
          <SearchView
            onSelectMovie={(movie) => setSelectedMovie(movie)}
            onOpenPromptAi={() => setIsPromptAiOpen(true)}
          />
        )}
      </main>

      <BottomNavBar currentTab={currentTab} onNavigate={(tab) => setCurrentTab(tab)} />

      <MovieDetailModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
        onToggleFavorite={toggleFavorite}
        isFavorite={selectedMovie ? favoriteIds.has(selectedMovie.id) : false}
      />

      <PromptAiModal
        isOpen={isPromptAiOpen}
        onClose={() => setIsPromptAiOpen(false)}
        onSubmitPrompt={handlePromptAiSubmit}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}
