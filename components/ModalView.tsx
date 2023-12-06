import React, {useEffect, useRef, useState} from 'react';
import {
  Modal,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView
} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import {MessageObjectParams} from "./MessageObject";

interface ModalViewProps {
  messageIconName: string;
  messageIconColor: string;
  messageTitle: string;
  messageText: string;
  date: string;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  messageObject: MessageObjectParams;
  save: (id: string, type: string) => void;
  bookmarkState: boolean;
  setBookmarkState: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalView: React.FC<ModalViewProps> = ({
                                               messageIconName,
                                               messageIconColor,
                                               messageTitle,
                                               messageText,
                                               date,
                                               showModal,
                                               setShowModal,
                                               messageObject,
                                               save,
                                               bookmarkState,
                                               setBookmarkState
                                             }) => {
  const [modalBookmarkState, setModalBookmarkState] = useState(bookmarkState);
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <View>
      <Modal
        animationType="none"
        transparent={false}
        visible={showModal}
        hardwareAccelerated={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.tabHeader}>
          <Pressable
            onPress={handleCloseModal}
            style={{
              display: 'flex',
              position: 'absolute',
              left: 15,
              paddingTop: Platform.select({ ios: 30 })
            }}
          >
            <Ionicons
              name={'arrow-back-outline'}
              size={35}
              color={'#ffffff'}
            />
          </Pressable>
          <Text style={{
            color: "#ffffff",
            textAlign: 'center',
            fontSize: 20,
            fontWeight: "600"
          }}>
            {messageTitle.length > 25 ? messageTitle.slice(0, 18) + ('...') : messageTitle}
          </Text>
        </View>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.flexing}>
              <View style={[styles.flexingChild, styles.width]}>
                <Ionicons
                  name={messageIconName}
                  size={24}
                  color={messageIconColor}
                />
                <Text style={styles.title}>{messageTitle}</Text>
              </View>
              <TouchableOpacity onPress={() => {
                save(messageObject.id, 'bookmark');
                setModalBookmarkState(prevState => !prevState);
              }}>
                <Ionicons
                  name={modalBookmarkState ? 'bookmark' : 'bookmark-outline'}
                  size={24}
                  color={'#0386D0'}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.message}>{messageText}</Text>
            <Text style={styles.time}>{date}</Text>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  tabHeader: {
    display: "flex",
    flexDirection: "column",
    justifyContent: Platform.select({
      android: 'center',
      ios: 'center'
    }),
    alignItems: 'center',
    width: "100%",
    height: Platform.select({
      android: 56,
      ios: 90,
    }),
    backgroundColor: "#1A2857",
    paddingTop: Platform.select({
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

export default ModalView;
