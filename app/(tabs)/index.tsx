import React, {useEffect, useState} from "react";
import {RefreshControl, ScrollView, StyleSheet} from "react-native";
import {FetchDataOptions, useMessageContext} from "../../contexts/MessageContext";
import api from "../../api";
import {MessageObjectParams} from "../../components/MessageObject";
import Message from "../../components/Message";

export default function Messages() {

  const {
    currentNetworkStatus,
    allMessages,
    setAllMessages,
    setSavedMessages,
    toggleSavedStatus,
    setReadStatus,
    saveMessagesToAsyncStorage,
    addMessage,
    loadMessagesFromAsyncStorage,
    fetchMessagesFromAPI,
    setAllMessageFromApi
  } = useMessageContext();

  const [refreshing, setRefreshing] = useState(false);

  // Example usage for a POST request:
  const getUrl = api.api_endpoint.concat(api.all_messages);
  const getMethod = 'GET';
  const getOptions: FetchDataOptions = {
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


  useEffect(() => {
    if (currentNetworkStatus()) {
      fetchMessagesFromAPI(getUrl, getOptions)
        .then((data: any) => {
          setAllMessageFromApi(data.data);
        })
      console.log('from api')
    } else {
      console.log('from local')
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

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    if (currentNetworkStatus()) {
      // fetchMessagesFromAPI(getUrl, getOptions);
      console.log('network have')
    }
  }, []);

  const sayHello = () => {
    console.log('hello');
  };



  return (
    <ScrollView
      contentContainerStyle={{
        width: '100%',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 8
      }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
})