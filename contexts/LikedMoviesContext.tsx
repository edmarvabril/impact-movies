import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface LikedMoviesContextProps {
  likedMovies: Set<number>;
  toggleLike: (movieId: number) => void;
}

const LikedMoviesContext = createContext<LikedMoviesContextProps | undefined>(
  undefined
);

export const LikedMoviesProvider: React.FC = ({ children }) => {
  const [likedMovies, setLikedMovies] = useState<Set<number>>(new Set());

  useEffect(() => {
    const loadLikedMovies = async () => {
      try {
        const likedMoviesJson = await AsyncStorage.getItem("likedMovies");
        if (likedMoviesJson) {
          setLikedMovies(new Set(JSON.parse(likedMoviesJson)));
        }
      } catch (error) {
        console.error("Error loading liked movies:", error);
      }
    };
    loadLikedMovies();
  }, []);

  const saveLikedMovies = async (likedMovies: Set<number>) => {
    try {
      await AsyncStorage.setItem(
        "likedMovies",
        JSON.stringify(Array.from(likedMovies))
      );
    } catch (error) {
      console.error("Error saving liked movies:", error);
    }
  };

  const toggleLike = (movieId: number) => {
    setLikedMovies((prevLikedMovies) => {
      const newLikedMovies = new Set(prevLikedMovies);
      if (newLikedMovies.has(movieId)) {
        newLikedMovies.delete(movieId);
      } else {
        newLikedMovies.add(movieId);
      }
      saveLikedMovies(newLikedMovies);
      return newLikedMovies;
    });
  };

  return (
    <LikedMoviesContext.Provider value={{ likedMovies, toggleLike }}>
      {children}
    </LikedMoviesContext.Provider>
  );
};

export const useLikedMovies = () => {
  const context = useContext(LikedMoviesContext);
  if (!context) {
    throw new Error("useLikedMovies must be used within a LikedMoviesProvider");
  }
  return context;
};
