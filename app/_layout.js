"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unstable_settings = exports.ErrorBoundary = void 0;
var native_1 = require("@react-navigation/native");
var expo_router_1 = require("expo-router");
var react_native_1 = require("react-native");
var ctx_1 = require("../contexts/ctx");
var LanguageContext_1 = require("../contexts/LanguageContext");
var MessageContext_1 = require("../contexts/MessageContext");
var expo_router_2 = require("expo-router");
// Catch any errors thrown by the Layout component.
Object.defineProperty(exports, "ErrorBoundary", { enumerable: true, get: function () { return expo_router_2.ErrorBoundary; } });
exports.unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: '(tabs)',
};
// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();
function RootLayout() {
    // const [loaded, error] = useFonts({
    //   SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    //   ...FontAwesome.font,
    // });
    //
    // // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    // useEffect(() => {
    //   if (error) throw error;
    // }, [error]);
    //
    // useEffect(() => {
    //   if (loaded) {
    //     SplashScreen.hideAsync();
    //   }
    // }, [loaded]);
    //
    // if (!loaded) {
    //   return null;
    // }
    return <RootLayoutNav />;
}
exports.default = RootLayout;
function RootLayoutNav() {
    var colorScheme = (0, react_native_1.useColorScheme)();
    return (<native_1.ThemeProvider value={colorScheme === 'dark' ? native_1.DarkTheme : native_1.DefaultTheme}>
      <LanguageContext_1.LanguageProvider>
        <ctx_1.SessionProvider>
          <MessageContext_1.MessageProvider>
            <expo_router_1.Stack>
              <expo_router_1.Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
              <expo_router_1.Stack.Screen name="sign-in" options={{ presentation: "fullScreenModal", headerShown: false }}/>
              <expo_router_1.Stack.Screen name="modal" options={{ presentation: 'modal' }}/>
            </expo_router_1.Stack>
          </MessageContext_1.MessageProvider>
        </ctx_1.SessionProvider>
      </LanguageContext_1.LanguageProvider>
    </native_1.ThemeProvider>);
}
