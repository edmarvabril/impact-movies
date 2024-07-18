import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { fetchMovieDetails, image500 } from "@/utils/api";
import { Icon } from "@/components/Icon";
import { useLikedMovies } from "@/contexts/LikedMoviesContext";

interface MovieDetails {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  overview: string;
  genres: { id: number; name: string }[];
}

const MovieDetailsScreen: React.FC = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { likedMovies, toggleLike } = useLikedMovies();

  useEffect(() => {
    const fetchDetails = async () => {
      if (id) {
        try {
          const data = await fetchMovieDetails(parseInt(id as string));
          setMovie(data);
        } catch (error) {
          console.error("Error fetching movie details:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#facc15" />
      </View>
    );
  }

  if (!movie) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-50">Movie details not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-slate-900">
      <Image
        source={{ uri: image500(movie.backdrop_path) }}
        className="w-full h-64 object-cover"
        resizeMode="cover"
      />
      <View className="p-4">
        <View className="flex-row justify-between items-center">
          <Text className="text-white text-2xl font-bold">{movie.title}</Text>
          <TouchableOpacity onPress={() => toggleLike(movie.id)}>
            <Icon
              name={likedMovies.has(movie.id) ? "heart" : "heart-outline"}
              color="#facc15"
              size={24}
            />
          </TouchableOpacity>
        </View>
        <Text className="text-gray-400 mt-2">
          {new Date(movie.release_date).getFullYear()}
        </Text>
        <Text className="text-amber-300 mt-2">
          Rating: {(movie.vote_average * 10).toFixed(0)}%
        </Text>
        <View className="flex-row flex-wrap mt-2">
          {movie.genres.map((genre) => (
            <View
              key={genre.id}
              className="bg-gray-800 rounded-full px-3 py-1 mr-2 mt-2"
            >
              <Text className="text-white text-sm">{genre.name}</Text>
            </View>
          ))}
        </View>
        <Text className="text-gray-300 mt-4">{movie.overview}</Text>
      </View>
    </ScrollView>
  );
};

export default MovieDetailsScreen;
