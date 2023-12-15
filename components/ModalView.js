"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var vector_icons_1 = require("@expo/vector-icons");
var ModalView = function (_a) {
    var messageIconName = _a.messageIconName, messageIconColor = _a.messageIconColor, messageTitle = _a.messageTitle, messageText = _a.messageText, date = _a.date, showModal = _a.showModal, setShowModal = _a.setShowModal, messageObject = _a.messageObject, save = _a.save, bookmarkState = _a.bookmarkState, setBookmarkState = _a.setBookmarkState;
    var _b = (0, react_1.useState)(bookmarkState), modalBookmarkState = _b[0], setModalBookmarkState = _b[1];
    var handleCloseModal = function () {
        setShowModal(false);
    };
    return (<react_native_1.View>
      <react_native_1.Modal animationType="none" transparent={false} visible={showModal} hardwareAccelerated={true} onRequestClose={handleCloseModal}>
        <react_native_1.View style={styles.tabHeader}>
          <react_native_1.Pressable onPress={handleCloseModal} style={{
            display: 'flex',
            position: 'absolute',
            left: 15,
            paddingTop: react_native_1.Platform.select({ ios: 30 })
        }}>
            <vector_icons_1.Ionicons name={'arrow-back-outline'} size={35} color={'#ffffff'}/>
          </react_native_1.Pressable>
          <react_native_1.Text style={{
            color: "#ffffff",
            textAlign: 'center',
            fontSize: 20,
            fontWeight: "600"
        }}>
            {messageTitle.length > 25 ? messageTitle.slice(0, 18) + ('...') : messageTitle}
          </react_native_1.Text>
        </react_native_1.View>
        <react_native_1.ScrollView>
          <react_native_1.View style={styles.container}>
            <react_native_1.View style={styles.flexing}>
              <react_native_1.View style={[styles.flexingChild, styles.width]}>
                <vector_icons_1.Ionicons name={messageIconName} size={24} color={messageIconColor}/>
                <react_native_1.Text style={styles.title}>{messageTitle}</react_native_1.Text>
              </react_native_1.View>
              <react_native_1.TouchableOpacity onPress={function () {
            save(messageObject.id, 'bookmark');
            setModalBookmarkState(function (prevState) { return !prevState; });
        }}>
                <vector_icons_1.Ionicons name={modalBookmarkState ? 'bookmark' : 'bookmark-outline'} size={24} color={'#0386D0'}/>
              </react_native_1.TouchableOpacity>
            </react_native_1.View>
            <react_native_1.Text style={styles.message}>{messageText}</react_native_1.Text>
            <react_native_1.Text style={styles.time}>{date}</react_native_1.Text>
          </react_native_1.View>
        </react_native_1.ScrollView>
      </react_native_1.Modal>
    </react_native_1.View>);
};
var styles = react_native_1.StyleSheet.create({
    tabHeader: {
        display: "flex",
        flexDirection: "column",
        justifyContent: react_native_1.Platform.select({
            android: 'center',
            ios: 'center'
        }),
        alignItems: 'center',
        width: "100%",
        height: react_native_1.Platform.select({
            android: 56,
            ios: 90,
        }),
        backgroundColor: "#1A2857",
        paddingTop: react_native_1.Platform.select({
            ios: 30,
        })
    },
    container: {
        borderRadius: 4,
        padding: 10,
        rowGap: 8,
        backgroundColor: 'white'
    },
    width: {
        width: '100%',
    },
    flexing: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    flexingChild: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 5
    },
    title: {
        fontSize: 16,
        textAlign: "justify",
        flexShrink: 1,
        columnGap: 3
    },
    message: {
        fontSize: 14,
        textAlign: "justify",
    },
    time: {
        color: '#575757',
        fontSize: 10,
    }
});
exports.default = ModalView;
