import { Movie, MoodHistoryItem } from '../types';

export async function fetchSupabaseFavorites(): Promise<Movie[]> {
  try {
    const res = await fetch('/api/supabase/favorites');
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.favorites)) {
        return data.favorites;
      }
    }
  } catch (err) {
    console.warn("Supabase favorites fetch failed, using local state:", err);
  }
  return [];
}

export async function saveSupabaseFavorite(movie: Movie, isFavorite: boolean): Promise<boolean> {
  try {
    const res = await fetch('/api/supabase/favorites', {
      method: isFavorite ? 'POST' : 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ movie })
    });
    const data = await res.json();
    return data.success;
  } catch (err) {
    console.warn("Supabase save favorite failed:", err);
    return false;
  }
}

export async function saveMoodHistorySupabase(moodName: string, score: number): Promise<boolean> {
  try {
    const res = await fetch('/api/supabase/history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ moodName, score, timestamp: new Date().toISOString() })
    });
    const data = await res.json();
    return data.success;
  } catch (err) {
    console.warn("Supabase save history failed:", err);
    return false;
  }
}
