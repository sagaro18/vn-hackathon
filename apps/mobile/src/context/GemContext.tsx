import React, { createContext, useState, useContext } from 'react';
import { Alert, Platform } from 'react-native';

interface GemContextType {
  gems: number;
  spendGems: (amount: number) => boolean;
  buyMoreGems: () => void;
}

const GemContext = createContext<GemContextType | undefined>(undefined);

export function GemProvider({ children }: { children: React.ReactNode }) {
  const [gems, setGems] = useState(0);

  const spendGems = (amount: number) => {
    if (gems >= amount) {
      setGems((prev) => prev - amount);
      return true; 
    }
    return false; 
  };

  const buyMoreGems = () => {
    if (Platform.OS === 'web') {
      const wantsToBuy = window.confirm("App Store: Purchase 100 Gems for $0.99?");
      if (wantsToBuy) {
        setGems((prev) => prev + 100);
        window.alert("Payment Successful! 100 Gems have been added to your account.");
      }
    } else {
      const storeName = Platform.OS === 'ios' ? 'App Store' : 'Google Play';
      
      Alert.alert(
        storeName,
        "Purchase 100 Gems for $0.99?",
        [
          { text: "Cancel", style: "cancel" },
          { 
            text: "Purchase", 
            onPress: () => {
              setGems((prev) => prev + 100);
              Alert.alert("Payment Successful", "100 Gems have been added to your account!");
            }
          }
        ]
      );
    }
  };

  return (
    <GemContext.Provider value={{ gems, spendGems, buyMoreGems }}>
      {children}
    </GemContext.Provider>
  );
}

export const useGems = () => {
  const context = useContext(GemContext);
  if (!context) throw new Error("useGems must be used within a GemProvider");
  return context;
};