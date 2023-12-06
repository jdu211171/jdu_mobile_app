import React, { useState } from 'react';
import {Modal, View, Text, Button, Pressable} from 'react-native';

export default function UniversalModal({ container, contents }) {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                        {contents}
                        <Button title="Close" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>
            <Pressable onPress={() => setModalVisible(true)}>
                {container}
            </Pressable>
        </View>
    );
}