import React from "react";
import { View, Image, Text } from "react-native";

interface HighlightedMovieProps {
  movie: {
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    genres: string[];
  };
}

const HighlightedMovie: React.FC<HighlightedMovieProps> = ({ movie }) => {
  return (
    <View className="items-center mb-4">
      <Image
        source={{ uri: movie.poster_path }}
        className="w-full h-80 object-cover"
      />
      <Text className="text-white text-2xl mt-2">
        {movie.title} [{new Date(movie.release_date).getFullYear()}]
      </Text>
      <Text className="text-yellow-400 text-xl mt-1">
        {(movie.vote_average * 10).toFixed(0)}% Rating
      </Text>
      <View className="flex-row flex-wrap justify-center mt-2">
        {movie.genres.map((genre, index) => (
          <View
            key={index}
            className="bg-gray-800 rounded-full px-3 py-1 mx-1 my-1"
          >
            <Text className="text-white text-sm">{genre}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default HighlightedMovie;
