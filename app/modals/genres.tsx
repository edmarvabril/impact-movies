import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { fetchGenres } from "@/utils/api";

interface Genre {
  id: number;
  name: string;
}

const GenreModal: React.FC = () => {
  const router = useRouter();
  const { data: genresData, isLoading: isGenresLoading } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
  });

  if (isGenresLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  const handleGenreSelect = (genreId: number | null) => {
    router.replace({
      pathname: "/(tabs)",
      params: {
        selectedGenre: genreId,
      },
    });
  };

  return (
    <View className="flex-1 p-4">
      <ScrollView>
        <TouchableOpacity
          className="items-center rounded-full bg-gray-500 p-1 mb-3"
          onPress={() => handleGenreSelect(null)}
        >
          <Text className="text-gray-50 text-2xl">ALL</Text>
        </TouchableOpacity>
        <View></View>
        {genresData?.genres.map((genre: Genre) => (
          <TouchableOpacity
            className="items-center rounded-full bg-gray-500 p-1 mb-3"
            key={genre.id}
            onPress={() => handleGenreSelect(genre.id)}
          >
            <Text className="text-gray-50 text-2xl">{genre.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default GenreModal;
