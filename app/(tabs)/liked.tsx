import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { fetchMovieDetails } from "@/utils/api";
import { useLikedMovies } from "@/contexts/LikedMoviesContext";
import EmptyLikedList from "@/components/EmptyLikedList";
import MovieCard from "@/components/MovieCard";

const Liked: React.FC = () => {
  const [likedMovies, setLikedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { likedMovies: likedMovieIds, toggleLike } = useLikedMovies();

  useEffect(() => {
    const loadLikedMovies = async () => {
      try {
        const movieDetailsPromises = Array.from(likedMovieIds).map((id) =>
          fetchMovieDetails(id)
        );
        const likedMoviesDetails = await Promise.all(movieDetailsPromises);
        setLikedMovies(likedMoviesDetails);
      } catch (error) {
        console.error("Error loading liked movies:", error);
      } finally {
        setLoading(false);
      }
    };
    loadLikedMovies();
  }, [likedMovieIds]);

  const renderItem = ({ item }: { item: Movie }) => (
    <MovieCard movie={item} isLiked={true} onLikeToggle={toggleLike} />
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <View className="flex-row justify-between items-center mx-4 my-4">
        <Text className="text-neutral-100 text-3xl font-bold">
          Liked Movies
        </Text>
      </View>
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#facc15" />
        </View>
      ) : (
        <FlatList
          data={likedMovies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{ paddingBottom: 140 }}
          ListEmptyComponent={EmptyLikedList}
        />
      )}
    </SafeAreaView>
  );
};

export default Liked;
