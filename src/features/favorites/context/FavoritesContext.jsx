import { createContext, useMemo, useState } from "react";
import { favoriteSeed } from "../../../data/mockStorefront";
import { STORAGE_KEYS } from "../../../constants/storageKeys";
import usePersistentState from "../../../hooks/usePersistentState";

export const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = usePersistentState(STORAGE_KEYS.favorites, favoriteSeed);
  const [lastUpdatedId, setLastUpdatedId] = useState(null);

  function toggleFavorite(product) {
    setFavorites((current) => {
      const exists = current.some((item) => item.id === product.id);
      const nextFavorites = exists
        ? current.filter((item) => item.id !== product.id)
        : [...current, product];
      setLastUpdatedId(product.id);
      return nextFavorites;
    });
  }

  const value = useMemo(
    () => ({
      favorites,
      favoriteIds: favorites.map((item) => item.id),
      favoritesCount: favorites.length,
      lastUpdatedId,
      isFavorite: (productId) => favorites.some((item) => item.id === productId),
      toggleFavorite,
      clearFavorites: () => setFavorites([]),
    }),
    [favorites, lastUpdatedId, setFavorites],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}
