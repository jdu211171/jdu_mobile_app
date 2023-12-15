import React from 'react';
import {useStorageState} from './useStorageState';
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = React.createContext<{
  signIn: (token: string) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
  login: (email: string, password: string, url: string) => Promise<any>;
  loadFromAsyncStorage: (key: string) => Promise<string | false>;
  saveToAsyncStorage : (key: string, data: any) => Promise<void>;
} | null>(null);

export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }
  return value;
}

const loadFromAsyncStorage = async (key: string): Promise<string | false> => AsyncStorage.getItem(key).then(r => r ? r : false);

const saveToAsyncStorage = async (key: string, data: object): Promise<void> => await AsyncStorage.setItem(key, JSON.stringify(data));

const login = async (email: string, password: string, url: string) => {
  const data = {
    "email": email,
    "password": password
  };
  return await fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

const logout = async (url: string, authKey: string | null, data: any = null) => {
  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${authKey}`
    }
  };

  if (data !== null) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('token');

  return (
    <AuthContext.Provider
      value={{
        login,
        session,
        isLoading,
        signIn: (token) => {
          setSession(token);
        },
        saveToAsyncStorage,
        loadFromAsyncStorage,
        signOut: () => {
          // logout('https://ktd5kacfz5.execute-api.ap-northeast-1.amazonaws.com/default/api/auth/signOut', session)
          //   .then(() => setSession(null))
          //   .catch(e => console.error(e));
          setSession(null);
        },
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
