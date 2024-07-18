import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "@/utils/api";
import { Icon } from "@/components/Icon";
import EmptyExploreList from "@/components/EmptyExploreList";
import MovieCard from "@/components/MovieCard";
import { useLikedMovies } from "@/contexts/LikedMoviesContext";

const { width } = Dimensions.get("window");
const numColumns = 2;
const itemWidth = (width - 32) / numColumns;

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

const Explore: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { likedMovies, toggleLike } = useLikedMovies();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["searchMovies", searchTerm],
    queryFn: () => searchMovies({ query: searchTerm }),
    enabled: false,
  });

  const handleSearch = () => {
    setSearchTerm(query);
    refetch();
  };

  const onClearQuery = () => {
    setQuery("");
    handleSearch();
  };

  const renderItem = ({ item }: { item: Movie }) => (
    <MovieCard
      movie={item}
      isLiked={likedMovies.has(item.id)}
      onLikeToggle={toggleLike}
    />
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <View className="flex-row items-center mx-4 my-4">
        <View className="flex-1 mx-2">
          <View className="bg-gray-800 flex-row items-center rounded-full px-3 py-1">
            <Icon name="search" color="white" size={24} />
            <TextInput
              className="text-white flex-1 ml-2"
              placeholder="Explore movies..."
              placeholderTextColor="#9ca3af"
              value={query}
              onChangeText={setQuery}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={onClearQuery}>
                <Icon name="close" color="white" size={24} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#facc15" />
        </View>
      ) : (
        <FlatList
          data={data?.results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          numColumns={numColumns}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{ paddingBottom: 140 }}
          ListEmptyComponent={EmptyExploreList}
        />
      )}
    </SafeAreaView>
  );
};

export default Explore;
