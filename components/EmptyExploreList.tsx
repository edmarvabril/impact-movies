import { View, Text } from "react-native";
import React from "react";
import { Icon } from "@/components/Icon"; // Make sure to import your Icon component

type Props = {};

const EmptyExploreList = (props: Props) => {
  return (
    <View className="flex-1 justify-center items-center mt-40">
      <Icon name="film-outline" color="#facc15" size={80} />
      <Text className="text-gray-50 text-xl font-bold mt-4">
        Nothing to see here yet.
      </Text>
      <Text className="text-gray-400 text-base mt-2 text-center mx-4">
        Search for a movie title.
      </Text>
    </View>
  );
};

export default EmptyExploreList;
