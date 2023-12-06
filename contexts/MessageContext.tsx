// MessageContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MessageObjectCollection from '../components/MessageObjectCollection';
import NetInfo from '@react-native-community/netinfo';
import MessageObject, {MessageObjectParams} from "../components/MessageObject";
import {usePathname} from "expo-router";

export interface FetchDataOptions {
  method: string;
  headers?: Record<string, string>;
  body?: Record<string, any>;
}

interface MessageContextProps {
  allMessages: MessageObjectCollection;
  setAllMessages: React.Dispatch<React.SetStateAction<MessageObjectCollection>>;
  setAllMessageFromApi:(messages: any)=> void;
  savedMessages: MessageObjectCollection;
  setSavedMessages: React.Dispatch<React.SetStateAction<MessageObjectCollection>>;
  currentNetworkStatus: () => Promise<boolean | null>;
  addMessage: (messageParams: MessageObjectParams) => void;
  setReadStatus: (id: number, status: boolean) => void;
  toggleSavedStatus: (id: number) => void;
  getMessagesByPriority: () => MessageObjectCollection;
  updateMessageContent: (id: number, updatedParams: MessageObjectParams) => void;
  loadMessagesFromAsyncStorage: (key: string) => Promise<string | null | undefined>;
  saveMessagesToAsyncStorage: (key: string, allMessages: any[], savedMessages: any[]) => Promise<void>;
  fetchMessagesFromAPI: <T>(url: string, options: FetchDataOptions) => Promise<T>;
  pathname: string;
}

const MessageContext = createContext<MessageContextProps | undefined>(undefined);

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [allMessages, setAllMessages] = useState<MessageObjectCollection>(new MessageObjectCollection([]));
  const [savedMessages, setSavedMessages] = useState<MessageObjectCollection>(new MessageObjectCollection([]));

  const pathname = usePathname();


  const currentNetworkStatus = async (): Promise<boolean | null> => {
    const state = await NetInfo.fetch();
    return state.isConnected;
  }

  const addMessage = (messageParams: MessageObjectParams) => {
    // Add the message to both collections
    setAllMessages((prev) => {
      prev.addMessage(messageParams);
      return new MessageObjectCollection([...prev.getAllMessages()]);
    });

    if (messageParams.isSaved) {
      setSavedMessages((prev) => {
        prev.addMessage(messageParams);
        return new MessageObjectCollection([...prev.getAllMessages()]);
      });
    }
  };

  const setAllMessageFromApi = (messages: any) => {

    const messagesArray:MessageObject[] = [];
    messages.map((message:any) => {
      const {
        id,
        title,
        description,
        priority,
        messagetype_id,
        updated_date,
      } = message;

      messagesArray.push(new MessageObject({
        id,
        title,
        description,
        priority,
        message_type_id: messagetype_id,
        updated_date,
      }))
    })
    setAllMessages(new MessageObjectCollection(messagesArray));
  }

  const setReadStatus = (id: number, status: boolean) => {
    setAllMessages((prev) => {
      prev.markMessageAsRead(id);
      return new MessageObjectCollection([...prev.getAllMessages()]);
    });
  };

  const toggleSavedStatus = (id: number) => {
    setAllMessages((prev) => {
      prev.markMessageAsSaved(id);
      return new MessageObjectCollection([...prev.getAllMessages()]);
    });

    setSavedMessages((prev) => {
      prev.markMessageAsSaved(id);
      return new MessageObjectCollection([...prev.getAllMessages()]);
    });
  };

  const getMessagesByPriority = () => {
    const sortedMessages = new MessageObjectCollection([...allMessages.getAllMessages()]);
    sortedMessages.sortMessagesByReadStatus();
    return sortedMessages;
  };

  const updateMessageContent = (id: number, updatedParams: MessageObjectParams) => {
    setAllMessages((prev) => {
      const message = prev.getMessageById(id);
      if (message) {
        Object.assign(message, updatedParams);
      }
      return new MessageObjectCollection([...prev.getAllMessages()]);
    });
  };

  /*const messages = await loadMessagesFromAsyncStorage('yourKey');*/
  const loadMessagesFromAsyncStorage = async (key: string) => {
    try {
      const result = await AsyncStorage.getItem(key);
      return result ? JSON.parse(result) : false;
    } catch (error) {
      console.error('Error loading messages from AsyncStorage:', error);
    }
  };

  /*saveMessageToAsyncStorage('yourKey', yourData).then(() => console.log('Data saved'));*/
  async function saveMessagesToAsyncStorage<T>(key: string, data: T): Promise<void> {
    try {
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(key, jsonData);
      console.log('Data saved successfully');
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  }

  /*fetchMessagesFromAPI('https://your-api-url.com').then(data => console.log(data));*/
  async function fetchMessagesFromAPI(apiUrl: string) {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
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
            setSavedMessages,
            currentNetworkStatus,
            addMessage,
            setReadStatus,
            toggleSavedStatus,
            getMessagesByPriority,
            updateMessageContent,
            loadMessagesFromAsyncStorage,
            saveMessagesToAsyncStorage,
            fetchMessagesFromAPI,
            setAllMessageFromApi,
            pathname
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
