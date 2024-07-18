import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from "react-native";
import HighlightedMovie from "@/components/HighlightedMovie";
import { fetchTopRatedMovie, fetchGenres, image500 } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useLocalSearchParams } from "expo-router";
import StyledButton from "@/components/StyledButton";
import { useLikedMovies } from "@/contexts/LikedMoviesContext";
import MovieCard from "@/components/MovieCard";
import { Icon } from "@/components/Icon";

const TopRated: React.FC = () => {
  const router = useRouter();
  const { selectedGenre } = useLocalSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [highlightedMovie, setHighlightedMovie] = useState(null);
  const { likedMovies, toggleLike } = useLikedMovies();

  const { data: genresData, isLoading: isGenresLoading } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
  });

  const genreId =
    selectedGenre && selectedGenre !== "null"
      ? parseInt(selectedGenre)
      : undefined;

  const fetchMovies = useCallback(async (pageNumber, genreId) => {
    setLoading(true);
    try {
      const data = await fetchTopRatedMovie(pageNumber, genreId);
      setMovies((prevMovies) =>
        pageNumber === 1 ? data.results : [...prevMovies, ...data.results]
      );
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setPage(1); // Reset to first page when genre changes
  }, [genreId]);

  useEffect(() => {
    fetchMovies(page, genreId);
  }, [page, genreId, fetchMovies]);

  useEffect(() => {
    if (movies.length > 0) {
      const updateHighlightedMovie = () => {
        const randomIndex = Math.floor(Math.random() * movies.length);
        setHighlightedMovie(movies[randomIndex]);
      };

      updateHighlightedMovie();
      const intervalId = setInterval(updateHighlightedMovie, 7000);
      return () => clearInterval(intervalId);
    }
  }, [movies]);

  const getGenreNames = useCallback(
    (genreIds) => {
      if (!genresData) return [];
      return genreIds.map(
        (id) => genresData.genres.find((genre) => genre.id === id)?.name || ""
      );
    },
    [genresData]
  );

  const renderFooter = () => (
    <StyledButton
      onPress={() => setPage((prevPage) => prevPage + 1)}
      title="Load more!"
      containerStyles="w-1/2 self-center h-10 p-0"
      labelStyles="text-lg"
    />
  );

  const renderHeader = () =>
    highlightedMovie &&
    genresData && (
      <HighlightedMovie
        onLikeToggle={(id) => toggleLike(id)}
        movie={{
          id: highlightedMovie.id,
          title: highlightedMovie.title,
          poster_path: image500(highlightedMovie.poster_path),
          backdrop_path: image500(highlightedMovie.backdrop_path),
          release_date: highlightedMovie.release_date,
          vote_average: highlightedMovie.vote_average,
          genres: getGenreNames(highlightedMovie.genre_ids),
          isLiked: likedMovies.has(highlightedMovie.id),
        }}
      />
    );

  const renderItem = ({ item }) => (
    <MovieCard
      movie={item}
      isLiked={likedMovies.has(item.id)}
      onToggleLike={toggleLike}
      iconType="heart"
    />
  );

  return (
    <View className="flex-1 bg-slate-900">
      <SafeAreaView className="flex-row justify-between items-center mx-4 my-4">
        <Text className="text-neutral-100 text-3xl font-bold mt-3">
          Top-Rated
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/modals/genres")}
          className="bg-gray-800 rounded-full px-3 py-1 mx-1 my-1 flex-row items-center"
        >
          <Text className="text-gray-400 text-sm mr-1">
            {selectedGenre && selectedGenre !== "null"
              ? genresData?.genres.find((g) => g.id === parseInt(selectedGenre))
                  ?.name
              : "ALL"}
          </Text>
          <Icon name="chevron-down" color={"#9ca3af"} size={15} />
        </TouchableOpacity>
      </SafeAreaView>
      {loading && page === 1 ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#facc15" />
        </View>
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          ListFooterComponent={renderFooter}
          ListHeaderComponent={renderHeader}
          onEndReached={() => setPage((prevPage) => prevPage + 1)}
          onEndReachedThreshold={0.5}
          contentContainerStyle={{ paddingBottom: 140 }}
        />
      )}
    </View>
  );
};

export default TopRated;
