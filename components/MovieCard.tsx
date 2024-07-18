import React from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { image500 } from "@/utils/api";
import { Icon } from "@/components/Icon";
import { useRouter } from "expo-router";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

interface MovieCardProps {
  movie: Movie;
  isLiked: boolean;
  onLikeToggle: (id: number) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  isLiked,
  onLikeToggle,
}) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      className="flex-1 m-2"
      style={{ maxWidth: (Dimensions.get("window").width - 32) / 2 }}
      onPress={() => router.push(`/movie/details?id=${movie.id}`)}
    >
      <View className="bg-secondary-bg p-2 rounded-lg relative">
        <Image
          source={{ uri: image500(movie.poster_path) }}
          className="w-full h-64 object-cover rounded-lg"
          resizeMode="cover"
        />
        <View className="mx-1">
          <Text className="text-gray-300 font-semibold mt-2">
            {movie.title}{" "}
            <Text className="text-gray-500">
              [{new Date(movie.release_date).getFullYear()}]
            </Text>
          </Text>
          <Text numberOfLines={1} className="text-amber-300 text-xs mt-1">
            {(movie.vote_average * 10).toFixed(0)}%{" "}
            <Text className="text-gray-500">Rating</Text>
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => onLikeToggle(movie.id)}
          className="absolute top-2 right-2"
        >
          <Icon
            name={isLiked ? "heart" : "heart-outline"}
            color={isLiked ? "#ef4444" : "#facc15"}
            size={24}
            style={{
              shadowColor: "#171717",
              shadowOpacity: 0.8,
              shadowOffset: {
                height: 3,
                width: 1,
              },
              shadowRadius: 1,
            }}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default MovieCard;
