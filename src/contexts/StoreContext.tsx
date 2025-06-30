import React, { createContext, useContext, useRef } from 'react';
import RootStore from '../stores/RootStore';

const StoreContext = createContext<RootStore | null>(null);

interface StoreProviderProps {
  children: React.ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const rootStore = useRef(new RootStore()).current;
  return (
    <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
  );
};

export const useStore = (): RootStore => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return store;
};

export default StoreContext;
