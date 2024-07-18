import { Tabs } from "expo-router";
import React from "react";

import { Icon } from "@/components/Icon";
import { StatusBar } from "expo-status-bar";

export default function TabLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#27272a",
            borderRadius: 50,
            borderTopWidth: 0,
            position: "absolute",
            bottom: 40,
            marginHorizontal: 20,
            paddingBottom: 14,
            paddingTop: 8,
            height: 70,
            shadowColor: "#171717",
            shadowOpacity: 0.8,
            shadowOffset: {
              height: 3,
              width: 0,
            },
            shadowRadius: 5,
          },
          tabBarActiveTintColor: "#fcd34d",
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="explore"
          options={{
            title: "Explore",
            tabBarIcon: ({ color, focused }) => (
              <Icon
                name={focused ? "film" : "film-outline"}
                color={color}
                size={32}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: "Top-Rated",
            tabBarIcon: ({ color, focused }) => (
              <Icon
                name={focused ? "star" : "star-outline"}
                color={color}
                size={32}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="liked"
          options={{
            title: "Liked",
            tabBarIcon: ({ color, focused }) => (
              <Icon
                name={focused ? "heart" : "heart-outline"}
                color={color}
                size={32}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
