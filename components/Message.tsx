import React, {useEffect, useState} from 'react';
import {Platform, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import MessageObject from "./MessageObject";
import ModalView from "./ModalView";
import MessageObjectCollection from "./MessageObjectCollection";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useMessageContext} from "../contexts/MessageContext";

interface MessageProps {
  messageIconName: string;
  messageIconColor: string;
  messageTitle: string;
  messageText: string;
  date: string;
  messageObject: MessageObject;
  readStatus: boolean;
}

const Message: React.FC<MessageProps> = ({
                                           messageIconName,
                                           messageIconColor,
                                           messageTitle,
                                           messageText,
                                           date,
                                           messageObject,
                                           readStatus,
                                         }) => {
  const {setSavedStatus, removeSavedStatus, allMessages, savedMessages} = useMessageContext();
  const [bookmarkState, setBookmarkState] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [read, setRead] = useState(readStatus);

  useEffect(() => {
    setBookmarkState(messageObject.isSaved);
    setRead(messageObject.isRead);
  }, [messageObject.isSaved, messageObject.isRead]);

  const showModal = () => {
    setModalVisible(true);
    setRead(true);
    messageObject.setIsRead();
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Pressable onPress={() => {
        showModal();
      }} style={[styles.container, styles.shadow]}>
        <View style={styles.flexing}>
          <View style={styles.flexing}>
            {!read && <Ionicons
              name={'ellipse'}
              size={8}
              color={'#0386D0'}
            />}
            <Ionicons
              // @ts-ignore
              name={messageIconName}
              size={24}
              color={messageIconColor}
            />
            <Text style={[read ? styles.haveRead : styles.notRead, styles.title]}>
              {messageTitle.length > 25 ? messageTitle.slice(0, 25) + ('...') : messageTitle}
            </Text>
          </View>
          <TouchableOpacity style={{width: 30, height: 30}} onPress={() => {
            // !bookmarkState ? setSavedStatus(messageObject.id) : removeSavedStatus(messageObject.id);
            if (!bookmarkState) {
              setSavedStatus(messageObject.id);
            } else {
              removeSavedStatus(messageObject.id);
            }
            setBookmarkState(prevState => !prevState);
          }}>
            <Ionicons
              name={bookmarkState ? 'bookmark' : 'bookmark-outline'}
              size={24}
              color={'#0386D0'}
            />
          </TouchableOpacity>
        </View>
        <Text
          style={[read ? styles.haveRead : styles.notRead, styles.message]}>{messageText.length > 250 ? messageText.slice(0, 250) + ('...') : messageText}</Text>
        <Text style={styles.time}>{date}</Text>
      </Pressable>
      {modalVisible &&
        <ModalView
          key={Date.now()}
          messageIconName={messageIconName}
          messageIconColor={messageIconColor}
          messageTitle={messageTitle}
          messageObject={messageObject}
          messageText={messageText}
          date={date}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          bookmarkState={bookmarkState}
          setBookmarkState={setBookmarkState}
        />}
    </>
  );
};

const styles = StyleSheet.create({
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
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.45)',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.45,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      }
    })
  },
  title: {
    fontSize: 16,
  },
  message: {
    fontSize: 14,
    textAlign: "justify",
  },
  time: {
    color: '#575757',
    fontSize: 10,
  },
  haveRead: {
    fontWeight: "normal",
  },
  notRead: {
    fontWeight: "bold",
  }
});

export default Message;
