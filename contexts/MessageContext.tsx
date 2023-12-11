// MessageContext.tsx
import React, {createContext, useCallback, useContext, useMemo, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MessageObjectCollection from '../components/MessageObjectCollection';
import NetInfo from '@react-native-community/netinfo';
import MessageObject, {MessageObjectParams} from '../components/MessageObject';
interface MessageContextProps {
  allMessages: MessageObjectCollection;
  savedMessages: MessageObjectCollection;
  setSavedMessages: React.Dispatch<React.SetStateAction<MessageObjectCollection>>;
  currentNetworkStatus: () => Promise<boolean | null>;
  setSavedStatus: (id: number) => void;
  removeSavedStatus: (id: number) => void;
  loadFromAsyncStorage: (key: string) => Promise<string | false | undefined>;
  saveToAsyncStorage: (key: string, data: MessageObject[]) => Promise<void>;
  fetchFromAPI: <T>(url: string) => Promise<T>;
  updateSavedMessages: () => void;
  createMessageObjectCollection: (messages: any) => MessageObject[];
}
const MessageContext = createContext<MessageContextProps | undefined>(undefined);
export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const allMessages: MessageObjectCollection = new MessageObjectCollection([]);
  const [savedMessages, setSavedMessages] = useState(new MessageObjectCollection([]));

  const currentNetworkStatus = useCallback(async (): Promise<boolean | null> => {
    const state = await NetInfo.fetch();
    return state.isConnected;
  }, []);

  const createMessageObjectCollection = useCallback((messages: any) => {
    const messagesArray: MessageObject[] = messages.map((message: any) => {
      const { id, title, description, priority, messagetype_id, updated_date } = message;
      return new MessageObject({
        id,
        title,
        description,
        priority,
        message_type_id: messagetype_id,
        updatedDate: updated_date,
      });
    });
    return messagesArray;
  }, []);

  const setSavedStatus = useCallback((id: number) => {
    const message = allMessages.getMessageById(id);
    message?.setIsSaved();
    savedMessages.addMessage(message as MessageObject);
  }, [savedMessages, allMessages]);

  const removeSavedStatus = useCallback((id: number) => {
    savedMessages.getMessageById(id)?.removeIsSaved();
    savedMessages.removeMessageById(id);
  }, [savedMessages]);

  const updateSavedMessages = useCallback(() => {
    savedMessages.messages = allMessages.getSavedMessages();
  }, [allMessages, savedMessages]);

  const loadFromAsyncStorage = useCallback(async (key: string) => {
    try {
      const result = await AsyncStorage.getItem(key);
      return result ? result : false;
    } catch (error) {
      console.error('Error loading messages from AsyncStorage:', error);
    }
  }, []);

  async function saveToAsyncStorage<T>(key: string, data: T): Promise<void> {
    try {
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(key, jsonData);
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  }

  const fetchFromAPI = useCallback(async (apiUrl: string) => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          console.error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error('Error fetching data:', error);
        return null;
      }
    },[]);

  return (
    <MessageContext.Provider
      value={{
        allMessages,
        savedMessages,
        setSavedMessages,
        currentNetworkStatus,
        setSavedStatus,
        removeSavedStatus,
        updateSavedMessages,
        fetchFromAPI,
        loadFromAsyncStorage,
        saveToAsyncStorage,
        createMessageObjectCollection
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessageContext = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessageContext must be used within a MessageProvider');
  }
  return context;
};
