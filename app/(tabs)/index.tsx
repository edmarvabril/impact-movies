import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  ActivityIndicator,
  Image,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import HighlightedMovie from "@/components/HighlightedMovie";
import { fetchTopRatedMovie, fetchGenres, image500 } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { Icon } from "@/components/Icon";
import { useRouter, useLocalSearchParams } from "expo-router";
import StyledButton from "@/components/StyledButton";

const { width } = Dimensions.get("window");
const numColumns = 2;
const itemWidth = (width - 32) / numColumns;

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  backdrop_path: string;
}

interface Genre {
  id: number;
  name: string;
}

const TopRated: React.FC = () => {
  const router = useRouter();
  const { selectedGenre } = useLocalSearchParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [highlightedMovie, setHighlightedMovie] = useState<Movie | null>(null);
  const [likedMovies, setLikedMovies] = useState<Set<number>>(new Set());

  const { data: genresData, isLoading: isGenresLoading } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
  });

  const fetchMovies = useCallback(
    async (pageNumber: number, genreId?: number) => {
      setLoading(true);
      const data = await fetchTopRatedMovie(pageNumber, genreId);
      if (pageNumber === 1) {
        setMovies(data.results);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
      }
      setLoading(false);
    },
    []
  );

  useEffect(() => {
    const genreId =
      selectedGenre && selectedGenre !== "null"
        ? parseInt(selectedGenre)
        : undefined;
    fetchMovies(page, genreId);
  }, [page, selectedGenre]);

  useEffect(() => {
    if (movies.length > 0) {
      const randomIndex = Math.floor(Math.random() * movies.length);
      setHighlightedMovie(movies[randomIndex]);
      const intervalId = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * movies.length);
        setHighlightedMovie(movies[randomIndex]);
      }, 7000);

      return () => clearInterval(intervalId); // Clear interval on component unmount
    }
  }, [movies]);

  const getGenreNames = (genreIds: number[]) => {
    if (!genresData) return [];
    return genreIds.map(
      (id) =>
        genresData.genres.find((genre: Genre) => genre.id === id)?.name || ""
    );
  };

  const toggleLike = (movieId: number) => {
    setLikedMovies((prevLikedMovies) => {
      const newLikedMovies = new Set(prevLikedMovies);
      if (newLikedMovies.has(movieId)) {
        newLikedMovies.delete(movieId);
      } else {
        newLikedMovies.add(movieId);
      }
      return newLikedMovies;
    });
  };

  const renderFooter = () => {
    return (
      showMore && (
        <StyledButton
          onPress={() => setPage(page + 1)}
          title="Load more!"
          containerStyles="w-1/2 self-center h-10 p-0"
          labelStyles="text-lg"
        />
      )
    );
  };

  const renderHeader = () => {
    if (highlightedMovie && genresData)
      return (
        <HighlightedMovie
          movie={{
            title: highlightedMovie.title,
            poster_path: image500(highlightedMovie.poster_path),
            backdrop_path: image500(highlightedMovie.backdrop_path),
            release_date: highlightedMovie.release_date,
            vote_average: highlightedMovie.vote_average,
            genres: getGenreNames(highlightedMovie.genre_ids),
          }}
        />
      );
  };

  const renderItem = ({ item }: { item: Movie }) => (
    <View className="flex-1 m-2" style={{ maxWidth: itemWidth }}>
      <View className="bg-secondary-bg p-2 rounded-lg">
        <Image
          source={{ uri: image500(item.poster_path) }}
          className="w-full h-64 object-cover rounded-lg"
          resizeMode="cover"
        />
        <View className="mx-1">
          <Text className="text-gray-300 font-semibold mt-2">
            {item.title}{" "}
            <Text className="text-gray-500">
              [{new Date(item.release_date).getFullYear()}]
            </Text>
          </Text>
          <Text numberOfLines={1} className="text-amber-300 text-xs mt-1">
            {(item.vote_average * 10).toFixed(0)}%{" "}
            <Text className="text-gray-500">Rating</Text>
          </Text>
        </View>
      </View>
    </View>
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
          numColumns={numColumns}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          ListFooterComponent={renderFooter}
          ListHeaderComponent={renderHeader}
          onEndReached={() => setShowMore(true)}
          onEndReachedThreshold={0.5}
          contentContainerStyle={{ paddingBottom: 140 }}
        />
      )}
    </View>
  );
};

export default TopRated;
