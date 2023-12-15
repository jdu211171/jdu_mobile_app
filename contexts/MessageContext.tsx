// MessageContext.tsx
import React, {createContext, useCallback, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MessageObjectCollection from '../components/MessageObjectCollection';
import NetInfo from '@react-native-community/netinfo';
import MessageObject from '../components/MessageObject';
import {useSession} from "./ctx";

interface MessageContextProps {
  allMessages: MessageObjectCollection;
  savedMessages: number[];
  currentNetworkStatus: () => Promise<boolean | null>;
  setSavedStatus: (id: number) => void;
  removeSavedStatus: (id: number) => void;
  loadFromAsyncStorage: (key: string) => Promise<string | null>;
  saveToAsyncStorage: (key: string, data: MessageObject[]) => Promise<void>;
  fetchFromAPI: (url: string, method: string, body: Record<string, any> | null) => Promise<void>;
  createMessageObjectCollection: (messages: any) => MessageObject[];
}

const MessageContext = createContext<MessageContextProps | undefined>(undefined);
export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const allMessages: MessageObjectCollection = new MessageObjectCollection([]);
  let savedMessages: number[] = [];
  // const [savedMessages, setSavedMessages] = useState<number[]>([]);
  const session = useSession();
  const currentNetworkStatus = useCallback(async (): Promise<boolean | null> => {
    const state = await NetInfo.fetch();
    return state.isConnected;
  }, []);

  const createMessageObjectCollection = useCallback((messages: any) => {
    const messagesArray: MessageObject[] = messages.map((message: any) => {
      const {id, title, description, priority, messagetype_id, sent_at, is_read, is_saved, group_id} = message;
      return new MessageObject({
        id,
        title,
        description,
        priority,
        message_type_id: messagetype_id,
        sent_at: sent_at,
        isRead: is_read,
        isSaved: is_saved,
        group_id: group_id
      });
    });
    return messagesArray;
  }, []);

  // const setSavedStatus = useCallback((id: number) => {
  //   allMessages.getMessageById(id)?.setIsSaved();
  //   savedMessages.unshift(id);
  // }, [allMessages, savedMessages]);

  const setSavedStatus = (id: number) => {
    savedMessages.unshift(id);
    allMessages.getMessageById(id)?.setIsSaved();
  }

  // const removeSavedStatus = useCallback((id: number) => {
  //   allMessages.getMessageById(id)?.removeIsSaved();
  //   savedMessages.filter(num => num !== id);
  // }, [allMessages, savedMessages]);

  const removeSavedStatus = (id: number) => {
    console.log(savedMessages)
    savedMessages = savedMessages.filter(num => num !== id);
    allMessages.getMessageById(id)?.removeIsSaved();
    console.log(savedMessages);
  }

  const loadFromAsyncStorage = async (key: string) => AsyncStorage.getItem(key);

  const sortUnreadMessages = (messages: MessageObjectCollection) => {
    messages.messages.sort((a, b) => {
      // Convert the boolean values to numbers (false becomes 0, true becomes 1)
      const aValue = a.isRead ? 1 : 0;
      const bValue = b.isRead ? 1 : 0;

      // Compare the numeric values
      return bValue - aValue;
    });
  }

  async function saveToAsyncStorage<T>(key: string, data: T): Promise<void> {
    try {
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(key, jsonData);
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  }

  const fetchFromAPI = async (url: string, method: string, body: Record<string, any> | null = null) => {
    try {
      let initData: RequestInit = {
        method: method,
        // @ts-ignore
        headers: {
          'Content-Type': 'application/json',
          'Authorization': session?.session,
        }
      };

      if (body !== null) {
        initData.body = JSON.stringify(body);
      }

      const response = await fetch(url, initData);

      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
      }
      // console.log(responseData);

      return await response.json();
    } catch (e) {
      console.error('Error fetching data:', e);
      return null;
    }
  };

  return (
    <MessageContext.Provider
      value={{
        allMessages,
        savedMessages,
        currentNetworkStatus,
        setSavedStatus,
        removeSavedStatus,
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
