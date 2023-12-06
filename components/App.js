import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: 'row', backgroundColor: '#1A2857', height: '5vh', alignItems: 'center' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems: 'center' }}
          >
            {options.tabBarIcon({ color: isFocused ? 'white' : '#0251B2', size: 25 })}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
                <Tab.Screen name="Xabarlar" component={AllMessages} options={{ tabBarIcon:(props) => <Mail {...props} /> }} />
                <Tab.Screen name="Saqlangan Xabarlar" component={SavedMessages} options={{tabBarIcon:(props) => <Bookmark {...props} />}} />
                <Tab.Screen name="Havolalar" component={AllLinks} options={{tabBarIcon:(props) => <Link2 {...props} />}} />
                <Tab.Screen name="Sozlamalar" component={SettingsScreen} options={{tabBarIcon:(props) => <Settings {...props} />}} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
