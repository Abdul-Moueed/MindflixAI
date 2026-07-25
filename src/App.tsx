import { useState, useMemo, useCallback, useEffect } from 'react';
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

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isPromptAiOpen, setIsPromptAiOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile>(USER_PROFILE);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [favorites, setFavorites] = useState<Movie[]>(INITIAL_FAVORITES);

  // Load saved favorites from backend on startup
  useEffect(() => {
    async function loadFavorites() {
      const saved = await fetchSupabaseFavorites();
      if (saved && saved.length > 0) {
        setFavorites(saved);
      }
    }
    loadFavorites();
  }, []);

  const favoriteIds = useMemo(() => new Set(favorites.map(f => f.id)), [favorites]);

  const toggleFavorite = useCallback((movie: Movie) => {
    setFavorites(prev => {
      const exists = prev.some(item => item.id === movie.id);
      const isFavNow = !exists;
      saveSupabaseFavorite(movie, isFavNow);
      if (exists) {
        return prev.filter(item => item.id !== movie.id);
      } else {
        return [{ ...movie, isFavorite: true }, ...prev];
      }
    });
  }, []);

  const handleStartAnalysis = async (qState: QuestionnaireState) => {
    setCurrentTab('analyzing');
    
    // Convert 5 psychological answers map to readable summary for Gemini
    const answersSummary = Object.entries(qState.answersMap || {}).reduce((acc, [qId, opt]) => {
      acc[`Question_${qId}`] = `${opt.title} (${opt.subtitle}) - Trait: ${opt.trait}`;
      return acc;
    }, {} as Record<string, string>);

    try {
      const res = await fetch('/api/analyze-mood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: answersSummary,
          intensity: qState.intensity,
          prompt: "Analyze user's 5 psychological responses and guess mood with high precision."
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          const result: AnalysisResult = {
            moodTag: data.moodTag,
            confidence: data.confidence,
            description: data.description,
            topPick: data.topPick,
            curatedMovies: data.curatedMovies
          };
          setAnalysisResult(result);
          saveMoodHistorySupabase(data.moodTag, qState.intensity);
        }
      }
    } catch (err) {
      console.error("Error analyzing mood:", err);
    }
  };

  const handlePromptAiSubmit = async (promptText: string) => {
    setCurrentTab('analyzing');
    
    try {
      const res = await fetch('/api/analyze-mood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptText
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          const result: AnalysisResult = {
            moodTag: data.moodTag,
            confidence: data.confidence,
            description: data.description,
            topPick: data.topPick,
            curatedMovies: data.curatedMovies
          };
          setAnalysisResult(result);
          saveMoodHistorySupabase(data.moodTag, 85);
        }
      }
    } catch (err) {
      console.error("Error with AI prompt:", err);
    }
  };

  const handleAuthSuccess = (authenticatedUser: UserProfile) => {
    setCurrentUser(authenticatedUser);
  };

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] font-inter selection:bg-[#e50914]/30 relative">
      {/* Top Header - Shown everywhere except during questionnaire/analyzing */}
      {currentTab !== 'questionnaire' && currentTab !== 'analyzing' && (
        <TopAppBar
          currentTab={currentTab}
          onNavigate={(tab) => setCurrentTab(tab)}
          user={currentUser}
          onOpenMenu={() => setCurrentTab('search')}
          onOpenAuth={() => setIsAuthModalOpen(true)}
        />
      )}

      {/* Main View Router */}
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
          <AnalyzingView
            onComplete={() => setCurrentTab('recommendations')}
          />
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
            onLogOut={() => {
              setCurrentUser({
                ...USER_PROFILE,
                name: "Guest User",
                email: undefined,
                provider: 'guest'
              });
            }}
            onOpenSettingsItem={(settingName) => alert(`Opening ${settingName}`)}
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

      {/* Navigation Bar */}
      <BottomNavBar
        currentTab={currentTab}
        onNavigate={(tab) => setCurrentTab(tab)}
      />

      {/* Movie Details / Player Modal */}
      <MovieDetailModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
        onToggleFavorite={toggleFavorite}
        isFavorite={selectedMovie ? favoriteIds.has(selectedMovie.id) : false}
      />

      {/* Prompt AI Modal */}
      <PromptAiModal
        isOpen={isPromptAiOpen}
        onClose={() => setIsPromptAiOpen(false)}
        onSubmitPrompt={handlePromptAiSubmit}
      />

      {/* Auth Sign-In / Sign-Up Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}
