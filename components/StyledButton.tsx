import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

type Props = {
  title: string;
  containerStyles?: string;
  labelStyles?: string;
  onPress: () => void;
};

const StyledButton = ({
  title,
  containerStyles,
  labelStyles,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`bg-amber-300 w-full h-12 rounded-3xl p-3 justify-center items-center ${containerStyles}`}
    >
      <Text className={`text-xl font-semibold text-sky-950 ${labelStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default StyledButton;
