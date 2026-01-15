import { useCallback, useEffect, useState } from 'react';
import { useToast } from './use-toast';

const FAVORITES_KEY = 'favoriteCalculators';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const { toast } = useToast();

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

  const addFavorite = useCallback((name: string, displayName?: string) => {
    if (!favorites.includes(name)) {
      const updated = [...favorites, name];
      saveFavorites(updated);
      toast({
        title: `${displayName || name} added to favorites`,
      });
    }
  }, [favorites, saveFavorites, toast]);

  const removeFavorite = useCallback((name: string, displayName?: string) => {
    if (favorites.includes(name)) {
      const updated = favorites.filter(fav => fav !== name);
      saveFavorites(updated);
      toast({
        title: `${displayName || name} removed from favorites`,
      });
    }
  }, [favorites, saveFavorites, toast]);

  const isFavorite = useCallback((name: string) => favorites.includes(name), [favorites]);

  return { favorites, addFavorite, removeFavorite, isFavorite };
} 