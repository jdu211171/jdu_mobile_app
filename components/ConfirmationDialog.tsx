import React from 'react';
import { View, Modal, StyleSheet, Button, Text } from 'react-native';

interface ConfirmationDialogProps {
  title: string;
  message: string;
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ title, message, visible, onConfirm, onCancel }) => {

  const handleConfirm = () => {
    onConfirm();
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Modal
      animationType="slide"
      visible={visible}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonContainer}>
            <Button title="Confirm" onPress={handleConfirm} />
            <Button title="Cancel" onPress={handleCancel} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    width: '80%',
    borderRadius: 10,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  confirmButton: {
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: '#007bff',
    color: '#fff',
  },
  cancelButton: {
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: '#dc3545',
    color: '#fff',
  },
});

export default ConfirmationDialog;

/*
*
import ConfirmationDialog from '../../components/ConfirmationDialog';
import {Button, Modal, StyleSheet, Text, View} from "react-native";
import React, {useState} from "react";

const App = () => {
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  const handleTriggerConfirmationDialog = () => {
    setShowConfirmationDialog(true);
  };

  const handleConfirm = () => {
    // Refresh your app here
    console.log('App refreshed');
    setShowConfirmationDialog(false);
  };

  const handleCancel = () => {
    setShowConfirmationDialog(false);
  };

  return (
    <View>
      <Button title="Trigger Confirmation Dialog" onPress={handleTriggerConfirmationDialog} />
      <ConfirmationDialog
        title="Confirm Refresh"
        message="Are you sure you want to refresh the app?"
        visible={showConfirmationDialog}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </View>
  );
};

export default App;

* */