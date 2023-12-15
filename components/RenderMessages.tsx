import {RefreshControl, ScrollView} from "react-native";
import {useMessageContext} from "../contexts/MessageContext";
import React, {useEffect, useState} from "react";
import Message from "./Message";
import MessageObject, {MessageObjectParams} from "./MessageObject";
import {StatusBar} from "expo-status-bar";
import {useSession} from "../contexts/ctx";

export default function RenderMessages() {
  const {
    allMessages,
    savedMessages,
    setSavedStatus,
    removeSavedStatus,
    fetchFromAPI,
    saveToAsyncStorage,
    createMessageObjectCollection,
    loadFromAsyncStorage,
  } = useMessageContext();

  const [refreshing, setRefreshing] = useState(false);
  const [messagesData, setMessagesData] = useState<MessageObject[]>([]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchFromAPI("https://ktd5kacfz5.execute-api.ap-northeast-1.amazonaws.com/default/api/message/", 'GET', null)
      .then((r: any) => {
        allMessages.messages = [];
        allMessages.addMessages(createMessageObjectCollection(r.data.messages));
        setMessagesData(allMessages.messages);
        saveToAsyncStorage("all_messages", allMessages.messages);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      })
      .finally(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const storedMessages = await loadFromAsyncStorage("all_messages");
        if (typeof storedMessages === "string") {
          allMessages.messages = (JSON.parse(storedMessages).map((messageParams: MessageObjectParams) => new MessageObject(messageParams)));
          setMessagesData(allMessages.messages);
        }
      } catch (error) {
        console.error("Error loading messages from AsyncStorage:", error);
      }
    })();
  }, []);
  const session = useSession();
  // AsyncStorage.removeItem("all_messages");
  // AsyncStorage.removeItem("saved_messages");
  // console.log(messagesData);
  // console.log(session?.session);

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
          .map((messageObject) => {
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
      <StatusBar style={"light"} />
    </ScrollView>
  );
}
