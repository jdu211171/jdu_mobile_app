// LanguageModal.tsx
import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { useLanguageContext } from '../contexts/LanguageContext';

const LanguageModal: React.FC = () => {
  const { handlePress } = useLanguageContext();

  return (
    <Modal visible={true}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', rowGap: 20 }}>
        <Text>言語を選択してください：</Text>
        <Text>Tilni tanlang:</Text>
        <Text>Select a language:</Text>
        <Text style={styles.language} onPress={() => handlePress('jp')}>日本語</Text>
        <Text style={styles.language} onPress={() => handlePress('uzb')}>O'zbekcha</Text>
        <Text style={styles.language} onPress={() => handlePress('eng')}>English</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  language: {
    width: 100,
    backgroundColor: '#ADD2FF',
    padding: 10,
    borderRadius: 4
  },
});

export default LanguageModal;
