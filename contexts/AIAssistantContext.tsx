import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from 'expo-router';

interface AIAssistantContextData {
  apiKey: string | null;
  setApiKey: (key: string) => void;
  isEnabled: boolean;
  toggleAssistant: () => void;
  currentScreen: string;
  currentContext: string;
  setScreenContext: (screen: string, context?: string) => void;
}

const AIAssistantContext = createContext<AIAssistantContextData | undefined>(undefined);

export const AIAssistantProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const [currentScreen, setCurrentScreen] = useState<string>('Inicial');
  const [currentContext, setCurrentContext] = useState<string>('');
  
  const toggleAssistant = () => {
    setIsEnabled(!isEnabled);
  };
  
  const setScreenContext = (screen: string, context: string = '') => {
    setCurrentScreen(screen);
    setCurrentContext(context);
  };
  
  return (
    <AIAssistantContext.Provider value={{
      apiKey,
      setApiKey,
      isEnabled,
      toggleAssistant,
      currentScreen,
      currentContext,
      setScreenContext,
    }}>
      {children}
    </AIAssistantContext.Provider>
  );
};

export const useAIAssistant = () => {
  const context = useContext(AIAssistantContext);
  
  if (!context) {
    throw new Error('useAIAssistant must be used within an AIAssistantProvider');
  }
  
  return context;
};