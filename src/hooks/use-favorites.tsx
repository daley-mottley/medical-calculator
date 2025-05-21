import { useCallback, useEffect, useState } from 'react';

const FAVORITES_KEY = 'favoriteCalculators';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const saveFavorites = useCallback((fav: string[]) => {
    setFavorites(fav);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(fav));
  }, []);

  const addFavorite = useCallback((name: string) => {
    if (!favorites.includes(name)) {
      const updated = [...favorites, name];
      saveFavorites(updated);
    }
  }, [favorites, saveFavorites]);

  const removeFavorite = useCallback((name: string) => {
    if (favorites.includes(name)) {
      const updated = favorites.filter(fav => fav !== name);
      saveFavorites(updated);
    }
  }, [favorites, saveFavorites]);

  const isFavorite = useCallback((name: string) => favorites.includes(name), [favorites]);

  return { favorites, addFavorite, removeFavorite, isFavorite };
} 