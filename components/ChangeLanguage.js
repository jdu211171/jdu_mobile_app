import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Modal, View, Text, Button, StyleSheet} from "react-native";
import Toast from "react-native-root-toast";
import {useLanguageContext} from "../contexts/LanguageContext";
export const ChangeLanguage = () => {
  const [isModalVisible, setModalVisible] = React.useState(true);
  const userLanguage = useLanguageContext();
  
  
  const handlePress = async (userPreferredLanguage) => {
    if (typeof userPreferredLanguage === 'string') {
      try {
        userLanguage.changeLanguage(userPreferredLanguage);
        console.log('language changed');
        setModalVisible(false);
        // Toast.show('アプリを再起動した後、言語を変更すると影響が出る\n' +
        //                     'changing language affects after relaunching app', {
        //   duration: Toast.durations.LONG,
        //   position: Toast.positions.BOTTOM,
        //   shadow: true,
        //   animation: true,
        //   hideOnPress: true,
        //   delay: 0,
        // });
      } catch (e) {
        console.log(e);
      }
    }
  }
  
  return (
      <Modal visible={isModalVisible}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', rowGap: 20}}>
          <Text>Select a language:</Text>
          <Text style={styles.language} onPress={() => handlePress('jp')}>日本語</Text>
          <Text style={styles.language} onPress={() => handlePress('uzb')}>O'zbekcha</Text>
          <Text style={styles.language} onPress={() => handlePress('eng')}>English</Text>
        </View>
      </Modal>
  );
}


const styles = StyleSheet.create({
  language: {
    width: 100,
    backgroundColor: '#ADD2FF',
    padding: 10,
    borderRadius: 4
  },
})