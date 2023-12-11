import React, {useEffect, useState} from "react";
import {RefreshControl, ScrollView} from "react-native";
import {useMessageContext} from "../../contexts/MessageContext";
import {usePathname} from "expo-router";
import Message from "../../components/Message";
import MessageObject, {MessageObjectParams} from "../../components/MessageObject";

export default function TabTwoScreen() {
  const pathname = usePathname();
  const {savedMessages, setSavedMessages, saveToAsyncStorage, loadFromAsyncStorage, setSavedStatus, removeSavedStatus, updateSavedMessages} = useMessageContext();
  const [savedMessagesData, setSavedMessagesData] = useState<MessageObject[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    console.log('refreshed');
  }

  useEffect(() => {
    (async () => {
      try {
        const storedMessages = await loadFromAsyncStorage("saved_messages");
        if (typeof storedMessages === "string") {
          savedMessages.messages = (JSON.parse(storedMessages).map((messageParams: MessageObjectParams) => new MessageObject(messageParams)));
          setSavedMessagesData(savedMessages.messages);
        }
      } catch (error) {
        console.error("Error loading messages from AsyncStorage:", error);
      }
    })();
  }, []);

  useEffect(() => {
    if (pathname === '/two') setSavedMessagesData(savedMessages.messages);
    saveToAsyncStorage("saved_messages", savedMessages.messages);
  }, [pathname]);

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
        savedMessages.messages
          .slice()
          .reverse()
          .map((messageObject) => (
            <Message
              key={messageObject.id}
              messageIconName="information-circle"
              messageIconColor="#0386D0"
              messageTitle={messageObject.title}
              messageText={messageObject.description}
              date={messageObject.updatedDate}
              messageObject={messageObject}
              readStatus={messageObject.isRead}
              toBookmarks={savedMessages}
              setSavedStatus={setSavedStatus}
              removeSavedStatus={removeSavedStatus}
              saveToAsyncStorage={saveToAsyncStorage}
            />
          ))
      }
    </ScrollView>
  );
}
