"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var expo_router_1 = require("expo-router");
var react_native_1 = require("react-native");
var Themed_1 = require("../components/Themed");
function NotFoundScreen() {
    return (<>
      <expo_router_1.Stack.Screen options={{ title: 'Oops!' }}/>
      <Themed_1.View style={styles.container}>
        <Themed_1.Text style={styles.title}>This screen doesn't exist.</Themed_1.Text>

        <expo_router_1.Link href="/" style={styles.link}>
          <Themed_1.Text style={styles.linkText}>Go to home screen!</Themed_1.Text>
        </expo_router_1.Link>
      </Themed_1.View>
    </>);
}
exports.default = NotFoundScreen;
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
    linkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
});
