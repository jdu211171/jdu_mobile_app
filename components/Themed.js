"use strict";
/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.View = exports.Text = exports.useThemeColor = void 0;
var react_native_1 = require("react-native");
var Colors_1 = require("../constants/Colors");
function useThemeColor(props, colorName) {
    var _a;
    var theme = (_a = (0, react_native_1.useColorScheme)()) !== null && _a !== void 0 ? _a : 'light';
    var colorFromProps = props[theme];
    if (colorFromProps) {
        return colorFromProps;
    }
    else {
        return Colors_1.default[theme][colorName];
    }
}
exports.useThemeColor = useThemeColor;
function Text(props) {
    var style = props.style, lightColor = props.lightColor, darkColor = props.darkColor, otherProps = __rest(props, ["style", "lightColor", "darkColor"]);
    var color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
    return <react_native_1.Text style={[{ color: color }, style]} {...otherProps}/>;
}
exports.Text = Text;
function View(props) {
    var style = props.style, lightColor = props.lightColor, darkColor = props.darkColor, otherProps = __rest(props, ["style", "lightColor", "darkColor"]);
    var backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
    return <react_native_1.View style={[{ backgroundColor: backgroundColor }, style]} {...otherProps}/>;
}
exports.View = View;
