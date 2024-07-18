import { View, Text } from "react-native";
import React from "react";
import { Icon } from "@/components/Icon"; // Make sure to import your Icon component

type Props = {};

const EmptyLikedList = (props: Props) => {
  return (
    <View className="flex-1 justify-center items-center mt-40">
      <Icon name="heart-outline" color="#facc15" size={80} />
      <Text className="text-gray-50 text-xl font-bold mt-4">
        No liked movies found
      </Text>
      <Text className="text-gray-400 text-base mt-2 text-center mx-4">
        Start liking movies to fill up this list
      </Text>
    </View>
  );
};

export default EmptyLikedList;
