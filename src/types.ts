import { QuestionOption } from './data/questions';

export type NavigationTab = 
  | 'home' 
  | 'questionnaire' 
  | 'analyzing' 
  | 'recommendations' 
  | 'favorites' 
  | 'profile'
  | 'search';

export interface Movie {
  id: string;
  tmdbId?: number;
  title: string;
  year: number;
  genre: string;
  synopsis: string;
  imageUrl: string;
  backdropUrl?: string;
  matchPercentage?: number;
  badge?: string;
  tagline?: string;
  rating?: string;
  voteAverage?: number;
  voteCount?: number;
  popularity?: number;
  duration?: string;
  director?: string;
  cast?: string[];
  language?: string;
  releaseDate?: string;
  isFavorite?: boolean;
  category?: 'trending' | 'exclusive' | 'curated' | 'insight';
  trailerUrl?: string;
  aiExplanation?: string;
  similarMovies?: Movie[];
}

export type AnswersMap = Record<number, QuestionOption>;

export interface QuestionnaireState {
  answersMap: AnswersMap;
  intensity: number;
}

export interface AnalysisResult {
  moodTag: string;
  confidence: number;
  description: string;
  topPick: Movie;
  curatedMovies: Movie[];
  genres?: string[];
  keywords?: string[];
}

export interface MoodHistoryItem {
  day: string;
  value: number; // 0 - 100
  color: string;
  moodName: string;
}

export interface UserProfile {
  id?: string;
  name: string;
  email?: string;
  title: string;
  analyzedFilms: number;
  favoriteCount?: number;
  eqAlignment: number;
  avatarUrl: string;
  plan: string;
  provider?: 'google' | 'email' | 'guest';
  joinedDate?: string;
  moodHistory?: MoodHistoryItem[];
}

export interface AuthModalState {
  isOpen: boolean;
  initialMode: 'login' | 'signup';
}
