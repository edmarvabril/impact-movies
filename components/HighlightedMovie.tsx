import React from "react";
import { View, ImageBackground, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { Icon } from "./Icon";

interface HighlightedMovieProps {
  movie: {
    title: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    vote_average: number;
    genres: string[];
  };
}

const HighlightedMovie: React.FC<HighlightedMovieProps> = ({ movie }) => {
  return (
    <Animated.View
      entering={FadeIn.duration(500)}
      exiting={FadeOut.duration(500)}
      className="relative items-center mb-4"
    >
      <ImageBackground
        source={{ uri: movie.backdrop_path }}
        className="w-full h-80"
      >
        <LinearGradient
          colors={["#0f172a", "transparent"]}
          className="absolute top-0 w-full h-1/3"
        />
        <LinearGradient
          colors={["transparent", "#0f172a"]}
          className="absolute bottom-0 w-full h-1/2"
        />
      </ImageBackground>
      <View className="items-center" style={{ marginTop: -70 }}>
        <View className="flex-row mx-2">
          <TouchableOpacity
            className="bg-zinc-800 py-1 px-3 rounded-full h-8 justify-center max-w-xs shadow"
            style={{
              shadowColor: "#171717",
              shadowOpacity: 0.8,
              shadowOffset: {
                height: 3,
                width: 0,
              },
              shadowRadius: 5,
            }}
          >
            <Text
              numberOfLines={1}
              className="text-neutral-300 font-semibold text-lg text-center"
            >
              {movie.title} [{new Date(movie.release_date).getFullYear()}]
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-zinc-800 h-8 w-8 rounded-full ml-2 justify-center items-center">
            <Icon name={"heart-outline"} color="#fcd34d" size={25} />
          </TouchableOpacity>
        </View>

        <Text numberOfLines={1} className="text-amber-300 text-lg mt-1">
          {(movie.vote_average * 10).toFixed(0)}%{" "}
          <Text className="text-gray-400">Rating</Text>
        </Text>
        <View className="flex-row flex-wrap mt-2">
          {movie.genres.map((genre, index) => (
            <View
              key={index}
              className="border border-gray-400 px-2 mx-1 rounded-full"
            >
              <Text className="text-gray-400 text-xs">
                {genre.toUpperCase()}
              </Text>
            </View>
          ))}
        </View>
      </View>
      <View className="border w-5/6 mt-6 rounded border-gray-400" />
    </Animated.View>
  );
};

export default HighlightedMovie;
