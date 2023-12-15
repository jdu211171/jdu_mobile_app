"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var FontAwesome_1 = require("@expo/vector-icons/FontAwesome");
var expo_router_1 = require("expo-router");
var react_native_1 = require("react-native");
var Colors_1 = require("../../constants/Colors");
var ctx_1 = require("../../contexts/ctx");
/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props) {
    return <FontAwesome_1.default size={28} style={{ marginBottom: -3 }} {...props}/>;
}
function TabLayout() {
    var colorScheme = (0, react_native_1.useColorScheme)();
    var sessionContext = (0, ctx_1.useSession)();
    if (sessionContext === null || sessionContext === void 0 ? void 0 : sessionContext.isLoading) {
        return <react_native_1.Text>Loading...</react_native_1.Text>;
    }
    if (!(sessionContext === null || sessionContext === void 0 ? void 0 : sessionContext.session)) {
        return <expo_router_1.Redirect href="/sign-in"/>;
    }
    return (<expo_router_1.Tabs screenOptions={{
            tabBarActiveTintColor: Colors_1.default[colorScheme !== null && colorScheme !== void 0 ? colorScheme : 'light'].tint,
        }}>
      <expo_router_1.Tabs.Screen name="index" options={{
            title: 'Messages',
            tabBarIcon: function (_a) {
                var color = _a.color;
                return <TabBarIcon name="code" color={color}/>;
            },
            headerRight: function () { return (<expo_router_1.Link href="/modal" asChild>
              <react_native_1.Pressable>
                {function (_a) {
                    var pressed = _a.pressed;
                    return (<FontAwesome_1.default name="info-circle" size={25} color={Colors_1.default[colorScheme !== null && colorScheme !== void 0 ? colorScheme : 'light'].text} style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}/>);
                }}
              </react_native_1.Pressable>
            </expo_router_1.Link>); },
        }}/>
      <expo_router_1.Tabs.Screen name="two" options={{
            title: 'Saved Messages',
            tabBarIcon: function (_a) {
                var color = _a.color;
                return <TabBarIcon name="code" color={color}/>;
            },
        }}/>
      <expo_router_1.Tabs.Screen name="links" options={{
            title: 'Links',
            tabBarIcon: function (_a) {
                var color = _a.color;
                return <TabBarIcon name="code" color={color}/>;
            },
        }}/>
      <expo_router_1.Tabs.Screen name="settings" options={{
            title: 'Settings Page',
            tabBarIcon: function (_a) {
                var color = _a.color;
                return <TabBarIcon name="code" color={color}/>;
            },
        }}/>
    </expo_router_1.Tabs>);
}
exports.default = TabLayout;
