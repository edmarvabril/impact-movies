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
    <View className="flex-1 bg-white p-4 rounded-lg">
      <ScrollView>
        <TouchableOpacity onPress={() => handleGenreSelect(null)}>
          <Text className="text-black text-lg">ALL</Text>
        </TouchableOpacity>
        {genresData?.genres.map((genre: Genre) => (
          <TouchableOpacity
            key={genre.id}
            onPress={() => handleGenreSelect(genre.id)}
          >
            <Text className="text-black text-lg">{genre.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default GenreModal;
