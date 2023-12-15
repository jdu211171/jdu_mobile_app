"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var vector_icons_1 = require("@expo/vector-icons");
var Message = function (_a) {
    var messageIconName = _a.messageIconName, messageIconColor = _a.messageIconColor, messageTitle = _a.messageTitle, messageText = _a.messageText, date = _a.date, messageObject = _a.messageObject, save = _a.save;
    var _b = (0, react_1.useState)(messageObject.isSaved), bookmarkState = _b[0], setBookmarkState = _b[1];
    var _c = (0, react_1.useState)(false), modalVisible = _c[0], setModalVisible = _c[1];
    var showModal = function () {
        setModalVisible(true);
    };
    var closeModal = function () {
        setModalVisible(false);
    };
    return (<>
      <react_native_1.Pressable onPress={function () { return console.log('pressed'); }} style={[styles.container, styles.shadow]}>
        <react_native_1.View style={styles.flexing}>n
          <react_native_1.View style={styles.flexing}>
            <vector_icons_1.Ionicons name={'ellipse'} size={8} color={'#0386D0'}/>
            <vector_icons_1.Ionicons name={messageIconName} size={24} color={messageIconColor}/>
            <react_native_1.Text style={styles.title}>
              {messageTitle.length > 25 ? messageTitle.slice(0, 25) + ('...') : messageTitle}
            </react_native_1.Text>
          </react_native_1.View>
          <react_native_1.TouchableOpacity style={{ width: 30, height: 30 }} onPress={function () {
            setBookmarkState(function (prevState) { return !prevState; });
        }}>
            <vector_icons_1.Ionicons name={bookmarkState ? 'bookmark' : 'bookmark-outline'} size={24} color={'#0386D0'}/>
          </react_native_1.TouchableOpacity>
        </react_native_1.View>
        <react_native_1.Text style={styles.message}>{messageText.length > 250 ? messageText.slice(0, 250) + ('...') : messageText}</react_native_1.Text>
        <react_native_1.Text style={styles.time}>{date}</react_native_1.Text>
      </react_native_1.Pressable>
    </>);
};
var styles = react_native_1.StyleSheet.create({
    container: {
        width: '100%',
        margin: 4,
        borderRadius: 4,
        padding: 10,
        rowGap: 8,
        backgroundColor: 'white'
    },
    flexing: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        columnGap: 3,
    },
    shadow: __assign({}, react_native_1.Platform.select({
        ios: {
            shadowColor: 'rgba(0, 0, 0, 0.45)',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.45,
            shadowRadius: 2,
        },
        android: {
            elevation: 2,
        }
    })),
    title: {
        fontSize: 16,
        fontWeight: "bold"
    },
    message: {
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "justify",
    },
    time: {
        color: '#575757',
        fontSize: 10,
    }
});
exports.default = Message;
