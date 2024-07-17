import { View, Text } from "react-native";
import React from "react";

type Props = {};

const Logo = (props: Props) => {
  return (
    <View className="flex-row border-4 border-accent-yellow h-20 w-24 rounded justify-center items-center">
      <Text className="text-6xl mr-1 font-bold">i</Text>
      <Text className="text-6xl font-bold">m</Text>
    </View>
  );
};

export default Logo;
