import { fetchTopRatedMovie, image500 } from "@/utils/api";
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  Image,
  Text,
  FlatList,
  Button,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const numColumns = 2;
const itemWidth = (width - 32) / numColumns; // Adjusted for padding and margin

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

const TopRated: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [showMore, setShowMore] = useState<boolean>(false);

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  const fetchMovies = useCallback(async (pageNumber: number) => {
    setLoading(true);
    const data = await fetchTopRatedMovie(pageNumber);
    setMovies((prevMovies) => [...prevMovies, ...data.results]);
    setLoading(false);
  }, []);

  const loadMoreMovies = () => {
    setPage((prevPage) => prevPage + 1);
    setShowMore(false);
  };

  const renderFooter = () => {
    return (
      showMore && (
        <View className="py-4">
          <Button title="SHOW MORE" onPress={loadMoreMovies} color="#facc15" />
        </View>
      )
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
        {/* <Text className="text-primary-text mt-2">{item.title}</Text> */}
        <Text className="text-primary-text mt-1">
          {new Date(item.release_date).getFullYear()}
        </Text>
        <Text className="text-primary-text mt-1">
          Rating: {(item.vote_average * 10).toFixed(0)}%
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-primary-bg p-4">
      <Text className="text-primary-text text-3xl font-bold">Top-Rated</Text>
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
          onEndReached={() => setShowMore(true)}
          onEndReachedThreshold={0.5}
        />
      )}
    </SafeAreaView>
  );
};

export default TopRated;
