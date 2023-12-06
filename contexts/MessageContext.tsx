// MessageContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MessageObjectCollection, { MessageObjectParams } from '../components/MessageObjectCollection';
import NetInfo from '@react-native-community/netinfo';
import MessageObject, {priorityType} from "../components/MessageObject";
import {state} from "sucrase/dist/types/parser/traverser/base";

export interface FetchDataOptions {
  method: string;
  headers?: Record<string, string>;
  body?: Record<string, any>; // Add body for POST or PUT requests
  // Add more options as needed
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
  updateMessageContent: (id: number, updatedParams: Partial<MessageObjectParams>) => void;
  loadMessagesFromAsyncStorage: (key: string) => Promise<string | null | undefined>;
  saveMessagesToAsyncStorage: (key: string, allMessages: any[], savedMessages: any[]) => Promise<void>;
  fetchMessagesFromAPI: <T>(url: string, options: FetchDataOptions) => Promise<T>;
}

const MessageContext = createContext<MessageContextProps | undefined>(undefined);

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allMessages, setAllMessages] = useState<MessageObjectCollection>(new MessageObjectCollection([], true));
  const [savedMessages, setSavedMessages] = useState<MessageObjectCollection>(new MessageObjectCollection([], true));



  const currentNetworkStatus = (): Promise<boolean | null> => {
    return NetInfo.fetch().then(state => state.isConnected);
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
      const priorityStatus:priorityType = ((priority == 1)?'high':(priority == 2)?'medium':'low')

      messagesArray.push(new MessageObject({
        id,
        title,
        description,
        priority: priorityStatus,
        message_type_id: messagetype_id,
        updated_date,
      }))
    })
    // console.log('msg arr',messagesArray)
    setAllMessages(new MessageObjectCollection(messagesArray,false));
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

  const updateMessageContent = (id: number, updatedParams: Partial<MessageObjectParams>) => {
    setAllMessages((prev) => {
      const message = prev.getMessageById(id);
      if (message) {
        Object.assign(message, updatedParams);
      }
      return new MessageObjectCollection([...prev.getAllMessages()]);
    });
  };

  const loadMessagesFromAsyncStorage = async (key: string) => {
    try {
      const result = await AsyncStorage.getItem(key);
      return result ? JSON.parse(result) : false;
    } catch (error) {
      console.error('Error loading messages from AsyncStorage:', error);
    }
  };

  const saveMessagesToAsyncStorage = async (key: string, allMessages: any[], savedMessages: any[]) => {
    try {
      const serializedValue = JSON.stringify({ allMessages, savedMessages });
      await AsyncStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Error saving messages to AsyncStorage:', error);
    }
  };

  async function fetchMessagesFromAPI<T>(url: string, options: FetchDataOptions): Promise<T> {
    try {
      const requestOptions: RequestInit = {
        method: options.method,
        headers: {
          'Content-Type': 'application/json', // Adjust headers as needed
          ...(options.headers || {}),
        },
      };

      // Only include the body for non-GET and non-HEAD requests
      if (options.method !== 'GET' && options.method !== 'HEAD') {
        requestOptions.body = options.body ? JSON.stringify(options.body) : undefined;
      }

      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: T = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Re-throw the error to handle it in the calling code
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
            setAllMessageFromApi
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
