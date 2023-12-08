import React, {useEffect, useState} from "react";
import {RefreshControl, ScrollView} from "react-native";
import Message from "../../components/Message";
import {useMessageContext} from "../../contexts/MessageContext";
import MessageObject from "../../components/MessageObject";

export default function TabTwoScreen() {

  const {pathname, savedMessages} = useMessageContext();
  const [refreshing, setRefreshing] = useState(false);
  const [savedMessagesData, setSavedMessagesData] = useState<MessageObject[]>([]);
    useEffect(() => {
      setSavedMessagesData(savedMessages.messages);
      console.log('saved');
    }, [savedMessages.messages]);

  const onRefresh = () => {
    console.log('refreshed');
  }
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
        savedMessagesData
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
              toBookmarks={savedMessages}/>
          ))
      }
    </ScrollView>
  );
}
