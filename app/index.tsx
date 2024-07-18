import { View, Text, ImageBackground } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import StyledButton from "@/components/StyledButton";
import { router } from "expo-router";

import Animated, { FadeIn, ZoomIn } from "react-native-reanimated";

type Props = {};

const WelcomeScreen = (props: Props) => {
  const onGetStartedPress = () => {
    router.replace("/(tabs)");
  };

  return (
    <Animated.View className="flex-1 bg-primary-bg" entering={FadeIn}>
      <ImageBackground
        source={require("../assets/images/splash.png")}
        className="flex-1 w-full h-full"
      >
        <SafeAreaView className="flex-1">
          <Animated.View
            entering={ZoomIn.duration(800)}
            className="flex-1 items-center justify-center px-7 absolute inset-x-0 bottom-52"
          >
            <Text className="text-lg text-neutral-100 text-center mb-14">{`Experience the impact of movies.\nExplore. Discover. Enjoy.`}</Text>
            <StyledButton onPress={onGetStartedPress} title="Get Started!" />
          </Animated.View>
        </SafeAreaView>
      </ImageBackground>
    </Animated.View>
  );
};

export default WelcomeScreen;
