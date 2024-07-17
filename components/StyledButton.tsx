import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

type Props = {
  title: string;
  styles?: string;
  onPress: () => void;
};

const StyledButton = ({ title, styles, onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-full bg-button-bg h-12 rounded-3xl p-3 justify-center items-center ${styles}`}
    >
      <Text className="text-xl font-bold">{title}</Text>
    </TouchableOpacity>
  );
};

export default StyledButton;
