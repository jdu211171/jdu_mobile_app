import {RefreshControl, ScrollView} from "react-native";
import {useMessageContext} from "../contexts/MessageContext";
import React, {useEffect, useState} from "react";
import Message from "./Message";
import MessageObject, {MessageObjectParams} from "./MessageObject";

export default function RenderMessages() {

  const {
    allMessages,
    savedMessages,
    fetchMessagesFromAPI,
    setAllMessageFromApi,
    setAllMessages,
    loadMessagesFromAsyncStorage,
    saveMessagesToAsyncStorage,
    toggleSavedStatus,
    updateSavedMessages
  } = useMessageContext();

  const [refreshing, setRefreshing] = useState(false);
  const [messagesData, setMessagesData] = useState<MessageObject[]>([]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchMessagesFromAPI("https://wfjz3m1ilh.execute-api.eu-north-1.amazonaws.com/default/api/messages")
      .then((r) => {
        // @ts-ignore
        setAllMessages((setAllMessageFromApi(r.data)));
        saveMessagesToAsyncStorage("all_messages", allMessages.messages);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      })
      .finally(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const storedMessages = await loadMessagesFromAsyncStorage("all_messages");
        if (typeof storedMessages === "string") {
          setAllMessages(JSON.parse(storedMessages).map((messageParams: MessageObjectParams) => new MessageObject(messageParams)));
          setMessagesData(allMessages.messages);
        }
      } catch (error) {
        console.error("Error loading messages from AsyncStorage:", error);
      }
    })();
  }, []);

  console.log(savedMessages, 'here we are');

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
        messagesData
          .slice()
          .reverse()
          .map((messageObject) => {
            return (
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
                toggleSavedStatus={toggleSavedStatus}
                updateSavedMessages={updateSavedMessages}
              />
            );
          })
      }
    </ScrollView>
  );
}
