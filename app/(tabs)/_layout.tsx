import React from "react";
import {Redirect, Tabs} from 'expo-router';
import {Text, useColorScheme, View} from 'react-native';

import Colors from '../../constants/Colors';
import {useSession} from "../../contexts/ctx";
import Ionicons from "@expo/vector-icons/Ionicons";
import {useLanguageContext} from "../../contexts/LanguageContext";

export default function TabLayout() {
  const sessionContext = useSession();
  const {translations} = useLanguageContext();
  const colorScheme = useColorScheme();

  if (sessionContext?.isLoading) {
    return <Text style={{ flex: 1, justifyContent: 'center', alignContent: 'center'}}>Loading...</Text>;
  }

  if (!sessionContext?.session) {
      return <Redirect href="/sign-in" />;
  }

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          const icons: { [key: string]: React.ComponentProps<typeof Ionicons>['name'] } = {
            'index': 'ios-mail',
            'two': 'bookmark',
            'links': 'link',
            'settings': 'settings',
          };
          // @ts-ignore
          const iconName: React.ComponentProps<typeof Ionicons>['name'] = focused ? icons[route.name] : `${icons[route.name]}-outline`;
          const iconColor = focused ? "#0251B2" : "#fff";
          return focused ? (
            <View
              style={{
                backgroundColor: "#fff",
                padding: 10,
                width: 44,
                height: 44,
                borderRadius: 22,
              }}
            >
              <Ionicons name={iconName} size={size} color={iconColor} />
            </View>
          ) : (<Ionicons name={iconName} size={size} color={iconColor} />);
        },
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarShowLabel: false,
        headerStyle: {
          backgroundColor: "#1A2857",
        },
        headerTitleStyle: {
          color: "#ffffff",
        },
        headerTitleAlign: "center",
        tabBarStyle: {
          backgroundColor: "#1A2857"
        },
      })}>
      <Tabs.Screen
        name="index"
        options={{
          title: translations.xabarlar,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: translations.saqlanganlar,
        }}
      />
      <Tabs.Screen
        name="links"
        options={{
          title: translations.linklar,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: translations.sozlamalar,
        }}
      />
    </Tabs>
  );
}
