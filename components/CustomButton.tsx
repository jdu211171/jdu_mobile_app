import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface AppProps {
  disabled: boolean;
  customFunction: () => void;
  title: string;
}

const CustomButton: React.FC<AppProps> = ({customFunction, title, disabled}) => {

  const handlePress = () => {
    customFunction();
  };

  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabledButton]}
      onPress={handlePress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: '#1A2857',
    borderRadius: 10,
    overflow: 'hidden',
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
});

export default CustomButton;