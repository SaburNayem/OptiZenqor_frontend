import { createContext, useEffect, useMemo, useState } from "react";
import { apiRequest, getAccessToken } from "../../../services/apiClient";
import { mapProduct } from "../../products/services/productService";

export const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [lastUpdatedId, setLastUpdatedId] = useState(null);

  async function loadFavorites() {
    if (!getAccessToken()) {
      setFavorites([]);
      return;
    }

    try {
      const result = await apiRequest("/favorites");
      setFavorites(result.map((item) => mapProduct(item.product)));
    } catch {
      setFavorites([]);
    }
  }

  useEffect(() => {
    loadFavorites();
  }, []);

  async function toggleFavorite(product) {
    const exists = favorites.some((item) => item.id === product.id);

    if (exists) {
      await apiRequest(`/favorites/${product.id}`, { method: "DELETE" });
    } else {
      await apiRequest(`/favorites/${product.id}`, { method: "POST" });
    }

    setLastUpdatedId(product.id);
    await loadFavorites();
  }

  const value = useMemo(
    () => ({
      favorites,
      favoriteIds: favorites.map((item) => item.id),
      favoritesCount: favorites.length,
      lastUpdatedId,
      isFavorite: (productId) => favorites.some((item) => item.id === productId),
      toggleFavorite,
      clearFavorites: async () => {
        await Promise.all(favorites.map((item) => apiRequest(`/favorites/${item.id}`, { method: "DELETE" })));
        await loadFavorites();
      },
      reloadFavorites: loadFavorites,
    }),
    [favorites, lastUpdatedId],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}
