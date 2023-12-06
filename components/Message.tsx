import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, Pressable, Modal } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import {MessageObjectParams} from "./MessageObject";

interface MessageProps {
  messageIconName: string;
  messageIconColor: string;
  messageTitle: string;
  messageText: string;
  date: string;
  messageObject: MessageObjectParams;
  save: (id: string, type: string) => void;
}

const Message: React.FC<MessageProps> = ({
                                           messageIconName,
                                           messageIconColor,
                                           messageTitle,
                                           messageText,
                                           date,
                                           messageObject,
                                           save
                                         }) => {
  const [bookmarkState, setBookmarkState] = useState(messageObject.isSaved);
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Pressable onPress={() => console.log('pressed')} style={[styles.container, styles.shadow]}>
        <View style={styles.flexing}>n
          <View style={styles.flexing}>
            <Ionicons
              name={'ellipse'}
              size={8}
              color={'#0386D0'}
            />
            <Ionicons
              name={messageIconName}
              size={24}
              color={messageIconColor}
            />
            <Text style={styles.title}>
              {messageTitle.length > 25 ? messageTitle.slice(0, 25) + ('...') : messageTitle}
            </Text>
          </View>
          <TouchableOpacity style={{ width: 30, height: 30 }} onPress={() => {
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
          style={styles.message}>{messageText.length > 250 ? messageText.slice(0, 250) + ('...') : messageText}</Text>
        <Text style={styles.time}>{date}</Text>
      </Pressable>
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
        shadowOffset: { width: 0, height: 0 },
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

})

export default Message;
