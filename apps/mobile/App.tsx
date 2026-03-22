import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StoryScreen from './src/screens/StoryScreen';
import ChatScreen from './src/screens/ChatScreen';
import PaywallScreen from './src/screens/PaywallScreen';
import PremiumSceneScreen from './src/screens/PremiumSceneScreen';
import HomeScreen from './src/screens/HomeScreen';
import ChoiceScreen from './src/screens/ChoiceScreen'; 

export type RootStackParamList = {
  Home: undefined;
  Story: undefined;
  Choice: undefined; 
  Chat: { characterId: 'vaina' | 'meri' };
  Paywall: { characterId: 'vaina' | 'meri' }; 
  PremiumScene: { characterId: 'vaina' | 'meri' };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Story" component={StoryScreen} />
        <Stack.Screen name="Choice" component={ChoiceScreen} /> 
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Paywall" component={PaywallScreen} />
        <Stack.Screen name="PremiumScene" component={PremiumSceneScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}