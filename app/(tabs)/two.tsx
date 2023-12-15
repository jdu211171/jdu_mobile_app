import React, {useEffect, useState} from "react";
import {RefreshControl, ScrollView} from "react-native";
import {useMessageContext} from "../../contexts/MessageContext";
import {usePathname} from "expo-router";
import Message from "../../components/Message";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TabTwoScreen() {
  const [savedData, setSavedData] = useState<number[]>([]);
  const pathname = usePathname();
  let {
    savedMessages,
    allMessages,
    saveToAsyncStorage,
    setSavedStatus,
    removeSavedStatus,
  } = useMessageContext();

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    // console.log(savedMessages);
    savedMessages = allMessages.getSavedMessages().map(message => message.id);
    setSavedData(savedMessages);
    // console.log(savedMessages);
    console.log('refreshed');
  }

  useEffect(() => {
    savedMessages = allMessages.getSavedMessages().map(message => message.id);
    setSavedData(savedMessages);
    saveToAsyncStorage("all_messages", allMessages.messages);
  }, [savedMessages, allMessages, pathname]);


//   const clearAsyncStorage = async () => {
//     await AsyncStorage.clear();
//     console.log('AsyncStorage successfully cleared');
//   };
//
// // Call the function
//   clearAsyncStorage();

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
      {
        savedData
          .map((id: number) => {
            const messageObject = allMessages.getMessageById(id);
            if (!messageObject) {
              // Handle the case where the message object is not found for the given ID
              return null;
            }

            return (
              <Message
                key={messageObject.id}
                messageIconName="information-circle"
                messageIconColor="#0386D0"
                messageTitle={messageObject.title}
                messageText={messageObject.description}
                date={messageObject.sent_at}
                messageObject={messageObject}
                readStatus={messageObject.isRead}
                savedMessages={savedMessages}
                setSavedStatus={setSavedStatus}
                removeSavedStatus={removeSavedStatus}
                saveToAsyncStorage={saveToAsyncStorage}
              />
            );
          })
      }
    </ScrollView>
  );
}
