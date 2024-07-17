import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import StyledButton from "@/components/StyledButton";
import Logo from "@/components/Logo";
import { router } from "expo-router";

type Props = {};

const WelcomeScreen = (props: Props) => {
  const onGetStartedPress = () => {
    router.replace("/(tabs)");
  };

  return (
    <View className="flex-1 bg-primary-bg p-6">
      <SafeAreaView className="flex-1 items-center justify-center">
        <Logo />
        <Text className="text-primary-text">WelcomeScreen</Text>
        <Text className="text-primary-text">adsfhlakdjsfhlakdsjhf</Text>
        <StyledButton
          onPress={onGetStartedPress}
          title="GET STARTED"
          styles="mt-20"
        />
      </SafeAreaView>
    </View>
  );
};

export default WelcomeScreen;
