import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'; 
import { SafeAreaView } from 'react-native-safe-area-context'; 
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App'; 
import { chapter1 } from '../data/story';

// We type the navigation so ESLint and TypeScript stay happy
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Story'>;

export default function StoryScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentLine = chapter1[currentIndex];
  
  // Initialize the navigation hook
  const navigation = useNavigation<NavigationProp>();

  const handleNext = () => {
    // 1. Check if we hit the end of the chapter
    if (currentLine.triggerEvent === 'START_FREE_TIME') {
      console.warn("AI SOCIAL LINK TRIGGERED! Navigating to chat screen...");
      // Use replace() instead of navigate() so the player can't swipe 'back' into the finished story
      navigation.replace('Chat'); 
      return;
    }

    // 2. Advance to the next line safely
    if (currentIndex < chapter1.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity style={styles.container} activeOpacity={1} onPress={handleNext}>
        
        {/* Background Placeholder */}
        <View style={styles.backgroundPlaceholder}>
          <Text style={styles.debugText}>BG: {currentLine.background}</Text>
        </View>

        {/* Character Portrait Placeholder */}
        {currentLine.speaker !== "" && (
          <View style={styles.portraitPlaceholder}>
            <Text style={styles.debugText}>{currentLine.speaker}</Text>
            <Text style={styles.debugText}>({currentLine.expression})</Text>
          </View>
        )}

        {/* Dialogue Box Layer */}
        <View style={styles.dialogueBox}>
          {currentLine.speaker !== "" && (
            <Text style={styles.speakerName}>{currentLine.speaker}</Text>
          )}
          <Text style={styles.dialogueText}>{currentLine.text}</Text>
        </View>

      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#000' },
  container: { flex: 1, backgroundColor: '#000' },
  backgroundPlaceholder: { 
    ...StyleSheet.absoluteFill,
    backgroundColor: '#1a1a2e', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  portraitPlaceholder: { 
    position: 'absolute', 
    bottom: 160, 
    alignSelf: 'center', 
    width: 250, 
    height: 350, 
    backgroundColor: '#16213e', 
    justifyContent: 'center', 
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#0f3460'
  },
  dialogueBox: { 
    position: 'absolute', 
    bottom: 20, 
    left: 15, 
    right: 15, 
    height: 130, 
    backgroundColor: 'rgba(0,0,0,0.85)', 
    borderColor: '#e94560', 
    borderWidth: 2, 
    borderRadius: 10, 
    padding: 15 
  },
  speakerName: { color: '#e94560', fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  dialogueText: { color: '#FFF', fontSize: 16, lineHeight: 24 },
  debugText: { color: '#fff', opacity: 0.5 }
});