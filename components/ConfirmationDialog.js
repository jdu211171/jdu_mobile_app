"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var ConfirmationDialog = function (_a) {
    var title = _a.title, message = _a.message, visible = _a.visible, onConfirm = _a.onConfirm, onCancel = _a.onCancel;
    var handleConfirm = function () {
        onConfirm();
    };
    var handleCancel = function () {
        onCancel();
    };
    return (<react_native_1.Modal animationType="slide" visible={visible}>
      <react_native_1.View style={styles.modalContainer}>
        <react_native_1.View style={styles.modalContent}>
          <react_native_1.Text style={styles.title}>{title}</react_native_1.Text>
          <react_native_1.Text style={styles.message}>{message}</react_native_1.Text>
          <react_native_1.View style={styles.buttonContainer}>
            <react_native_1.Button title="Confirm" onPress={handleConfirm}/>
            <react_native_1.Button title="Cancel" onPress={handleCancel}/>
          </react_native_1.View>
        </react_native_1.View>
      </react_native_1.View>
    </react_native_1.Modal>);
};
var styles = react_native_1.StyleSheet.create({
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
exports.default = ConfirmationDialog;
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
