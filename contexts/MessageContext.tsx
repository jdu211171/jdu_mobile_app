// MessageContext.tsx
import React, {createContext, useContext, useMemo} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MessageObjectCollection from '../components/MessageObjectCollection';
import NetInfo from '@react-native-community/netinfo';
import MessageObject, {MessageObjectParams} from '../components/MessageObject';
import {usePathname} from 'expo-router';

export interface FetchDataOptions {
  method: string;
  headers?: Record<string, string>;
  body?: Record<string, any>;
}

interface MessageContextProps {
  allMessages: MessageObjectCollection;
  setAllMessages: (messages: MessageObjectParams[]) => void
  setAllMessageFromApi: (messages: any) => MessageObjectParams[];
  savedMessages: MessageObjectCollection;
  setSavedMessages: (messages: MessageObjectParams[]) => void
  currentNetworkStatus: () => Promise<boolean | null>;
  addMessageToAllMessages: (messageParams: MessageObject) => void;
  setReadStatus: (id: number, status: boolean) => void;
  toggleSavedStatus: (id: number) => void;
  getMessagesByPriority: MessageObjectCollection;
  updateMessageContent: (id: number, updatedParams: MessageObjectParams) => void;
  loadMessagesFromAsyncStorage: (key: string) => Promise<string | false | undefined>;
  saveMessagesToAsyncStorage: (key: string, data: MessageObject[]) => Promise<void>;
  fetchMessagesFromAPI: <T>(url: string) => Promise<T>;
  pathname: string;
  updateSavedMessages: () => void;
}

const MessageContext = createContext<MessageContextProps | undefined>(undefined);

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const pathname = usePathname();

  const allMessages: MessageObjectCollection = new MessageObjectCollection([]);
  const setAllMessages = (messages: MessageObjectParams[]) => {
    allMessages.messages = [];
    allMessages.addMessages(messages);
  };
  const addMessageToAllMessages = (messageParams: MessageObject) => {
    allMessages.addMessage(messageParams);
  };
  const addMessagesToAllMessages = (messageParams: MessageObjectParams[]) => {
    allMessages.addMessages(messageParams);
  };

  const savedMessages: MessageObjectCollection = new MessageObjectCollection([]);
  const setSavedMessages = (messages: MessageObjectParams[]) => {
    savedMessages.addMessages(messages);
  };
  const addMessageToSavedMessages = (messageParams: MessageObject) => {
    savedMessages.addMessage(messageParams);
  };
  const addMessagesToSavedMessages = (messageParams: MessageObjectParams[]) => {
    savedMessages.addMessages(messageParams);
  };

  const currentNetworkStatus = async (): Promise<boolean | null> => {
    const state = await NetInfo.fetch();
    return state.isConnected;
  };

  const setAllMessageFromApi = (messages: any) => {
    const messagesArray: MessageObjectParams[] = messages.map((message: any) => {
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
  };

  const setReadStatus = (id: number, status: boolean) => {
    allMessages.markMessageAsRead(id);
  };

  const toggleSavedStatus = (id: number) => {
    const message = allMessages.getMessageById(id);
    if (message) {
      message.toggleIsSaved();

      if (message.isSaved) {
        savedMessages.addMessage(message);
      } else {
        savedMessages.removeMessageById(id);
      }
    }
  };

  const updateSavedMessages = () => {
    savedMessages.messages = allMessages.getSavedMessages();
  };

  const getMessagesByPriority = useMemo(() => {
    const sortedMessages = new MessageObjectCollection([...allMessages.getAllMessages()]);
    sortedMessages.sortMessagesByReadStatus();
    return sortedMessages;
  }, [allMessages]);


  const updateMessageContent = (id: number, updatedParams: MessageObjectParams) => {
    const message = allMessages.getMessageById(id);
    if (message) {
      Object.assign(message, updatedParams);
    }
  };

  const loadMessagesFromAsyncStorage = async (key: string) => {
    try {
      const result = await AsyncStorage.getItem(key);
      return result ? result : false;
    } catch (error) {
      console.error('Error loading messages from AsyncStorage:', error);
    }
  };

  async function saveMessagesToAsyncStorage<T>(key: string, data: T): Promise<void> {
    try {
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(key, jsonData);
      console.log('Data saved successfully');
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  }

  async function fetchMessagesFromAPI(apiUrl: string) {
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
  }

  return (
    <MessageContext.Provider
      value={{
        allMessages,
        setAllMessages,
        savedMessages,
        setSavedMessages: (messages) => (allMessages.addMessages(messages)),
        currentNetworkStatus,
        addMessageToAllMessages,
        toggleSavedStatus,
        setReadStatus,
        getMessagesByPriority,
        updateMessageContent,
        loadMessagesFromAsyncStorage,
        saveMessagesToAsyncStorage,
        fetchMessagesFromAPI,
        setAllMessageFromApi,
        pathname,
        updateSavedMessages
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
