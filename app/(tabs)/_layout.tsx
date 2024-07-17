import { Tabs } from "expo-router";
import React from "react";

import { Icon } from "@/components/Icon";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#1f2937",
          borderTopWidth: 1,
          height: 84,
          borderTopColor: "#facc15",
        },
        tabBarActiveTintColor: "#22d3ee",
        tabBarInactiveTintColor: "#facc15",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <Icon name={focused ? "film" : "film-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Top-Rated",
          tabBarIcon: ({ color, focused }) => (
            <Icon name={focused ? "star" : "star-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="liked"
        options={{
          title: "Liked",
          tabBarIcon: ({ color, focused }) => (
            <Icon name={focused ? "heart" : "heart-outline"} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
