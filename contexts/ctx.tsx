import React from 'react';
import { useStorageState } from './useStorageState';

interface AuthContextValue {
  signIn: () => void;
  signOut: () => void;
  sendCredentials: (email: string, password: string, url: string) => Promise<string>; // Adjust the type based on the actual return type
  session?: string | null;
  isLoading: boolean;
}

const AuthContext = React.createContext<AuthContextValue | null>(null);

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }
  
  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');
  
  const sendCredentials = async (email: string, password: string, url: string) => {
    const data = {
      "email": email,
      "password": password
    };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result.token;
  };
  
  return (
    <AuthContext.Provider
      value={{
        signIn: () => {
          // Perform sign-in logic here
          setSession('xxx');
        },
        signOut: () => {
          setSession(null);
        },
        sendCredentials: (email: string, password: string, url: string) => sendCredentials(email, password, url),
        session,
        isLoading,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
