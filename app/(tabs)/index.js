"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var MessageContext_1 = require("../../contexts/MessageContext");
var api_1 = require("../../api");
function Messages() {
    var _a = (0, MessageContext_1.useMessageContext)(), currentNetworkStatus = _a.currentNetworkStatus, allMessages = _a.allMessages, setAllMessages = _a.setAllMessages, setSavedMessages = _a.setSavedMessages, toggleSavedStatus = _a.toggleSavedStatus, setReadStatus = _a.setReadStatus, saveMessagesToAsyncStorage = _a.saveMessagesToAsyncStorage, addMessage = _a.addMessage, loadMessagesFromAsyncStorage = _a.loadMessagesFromAsyncStorage, fetchMessagesFromAPI = _a.fetchMessagesFromAPI, setAllMessageFromApi = _a.setAllMessageFromApi;
    var _b = (0, react_1.useState)(false), refreshing = _b[0], setRefreshing = _b[1];
    // Example usage for a POST request:
    var getUrl = api_1.default.api_endpoint.concat(api_1.default.all_messages);
    var getMethod = 'GET';
    var getOptions = {
        method: getMethod,
        headers: {
        // Add any additional headers needed for the POST request
        },
        body: {
        // Add data to be sent in the request body for the POST request
        },
    };
    //
    // fetchMessagesFromAPI(getUrl, getOptions)
    //   .then((response: any) => {
    //     const responseData = response.data || [];
    //     const messages: MessageObjectParams[] = responseData.map((apiMessage: any) => {
    //       return {
    //         id: apiMessage.id,
    //         title: apiMessage.title,
    //         description: apiMessage.description,
    //         priority: apiMessage.priority,
    //         message_type_id: apiMessage.messagetype_id, // Adjust property name
    //         updated_date: apiMessage.updated_date,
    //         isRead: false,
    //         isReadSent: false,
    //         isSaved: false,
    //         isSavedSent: false,
    //       };
    //     });
    //
    //     const savedMessages = messages.filter((message) => message.isSaved);
    //     saveMessagesToAsyncStorage('all_messages', messages, savedMessages)
    //       .then(() => {
    //         // Load messages from AsyncStorage to update the state
    //         loadMessagesFromAsyncStorage('all_messages');
    //       })
    //   })
    //   .catch((error: Error) => {
    //     console.error('Error in fetch:', error);
    //     // Handle the error as needed
    // });
    (0, react_1.useEffect)(function () {
        if (currentNetworkStatus()) {
            fetchMessagesFromAPI(getUrl, getOptions)
                .then(function (data) {
                setAllMessageFromApi(data.data);
            });
            console.log('from api');
        }
        else {
            console.log('from local');
            // loadMessagesFromAsyncStorage('all_messages').then(r => {
            //   if (typeof r === "object") {
            //     // @ts-ignore
            //     setAllMessages(r.allMessages);
            //     // @ts-ignore
            //     setSavedMessages(r.savedMessages);
            //   }
            // });
        }
    }, []);
    var onRefresh = react_1.default.useCallback(function () {
        setRefreshing(true);
        if (currentNetworkStatus()) {
            // fetchMessagesFromAPI(getUrl, getOptions);
            console.log('network have');
        }
    }, []);
    var sayHello = function () {
        console.log('hello');
    };
    return (<react_native_1.ScrollView contentContainerStyle={{
            width: '100%',
            alignItems: 'center',
            paddingLeft: 5,
            paddingRight: 5,
            paddingTop: 8
        }} refreshControl={<react_native_1.RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
      {/*{*/}
      {/*  allMessages.messages*/}
      {/*    .map((messageObject) => {*/}
      {/*      return (*/}
      {/*        <Message*/}
      {/*          key={messageObject.id/* + Date.now()*!/*/}
      {/*          messageIconName="information-circle"*/}
      {/*          messageIconColor="#0386D0"*/}
      {/*          messageTitle={messageObject.title}*/}
      {/*          messageText={messageObject.description}*/}
      {/*          date={messageObject.updatedDate}*/}
      {/*          save={sayHello}*/}
      {/*          messageObject={messageObject}/>*/}
      {/*      )*/}
      {/*    })*/}
      {/*}*/}
    </react_native_1.ScrollView>);
}
exports.default = Messages;
var styles = react_native_1.StyleSheet.create({
    container: {
        width: 700,
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
    title: {
        fontSize: 16,
    },
    message: {
        fontSize: 14,
    },
    time: {
        color: '#575757',
        fontSize: 10,
    },
});
