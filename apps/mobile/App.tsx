import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StoryScreen from './src/screens/StoryScreen';
import ChatScreen from './src/screens/ChatScreen';
import PaywallScreen from './src/screens/PaywallScreen';
import PremiumSceneScreen from './src/screens/PremiumSceneScreen';
import HomeScreen from './src/screens/HomeScreen';

const caveBg = require('./assets/images/cave.png');

export type RootStackParamList = {
  Home: undefined;
  Story: undefined;
  Chat: undefined;
  Paywall: undefined;
  PremiumScene: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground source={caveBg} resizeMode="cover" style={styles.background}>
 <NavigationContainer>
  <Stack.Navigator 
    initialRouteName="Home"
    screenOptions={{ 
      headerShown: false,
      // This is the most important line for the background to show through
      contentStyle: { backgroundColor: 'transparent' } 
    }}
  >
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Story" component={StoryScreen} />
    <Stack.Screen name="Chat" component={ChatScreen} />
    <Stack.Screen name="Paywall" component={PaywallScreen} />
    <Stack.Screen name="PremiumScene" component={PremiumSceneScreen} />
  </Stack.Navigator>
</NavigationContainer>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Add these two lines to force the container to fill the browser window
    width: '100vw' as any, 
    height: '100vh' as any,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});