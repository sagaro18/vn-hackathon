import React, { useState } from 'react';
// Added ImageBackground and Image to the imports below
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native'; 
import { SafeAreaView } from 'react-native-safe-area-context'; 
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App'; 
import { chapter1 } from '../data/story';

// 1. Assets and Mapping (Place this OUTSIDE the function)
const caveImg = require('../../assets/images/cave.png');

const backgroundMap: Record<string, any> = {
  "beginner_cave": caveImg,
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Story'>;

export default function StoryScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentLine = chapter1[currentIndex];
  const navigation = useNavigation<NavigationProp>();

  const handleNext = () => {
    // Navigate to Chat if the story triggers it
    if (currentLine.triggerEvent === 'START_FREE_TIME') {
      navigation.replace('Chat'); 
      return;
    }

    if (currentIndex < chapter1.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity style={styles.container} activeOpacity={1} onPress={handleNext}>
        
        {/* BACKGROUND LAYER */}
        <ImageBackground 
          source={backgroundMap[currentLine.background] || caveImg} 
          style={StyleSheet.absoluteFillObject}
          resizeMode="cover"
        >
          {/* CHARACTER PORTRAIT LAYER */}
          {currentLine.speaker !== "" && (
            <View style={styles.portraitPlaceholder}>
              <Text style={styles.debugText}>{currentLine.speaker}</Text>
              <Text style={styles.debugText}>({currentLine.expression})</Text>
            </View>
          )}

          {/* DIALOGUE BOX LAYER */}
          <View style={styles.dialogueBox}>
            {currentLine.speaker !== "" && (
              <Text style={styles.speakerName}>{currentLine.speaker}</Text>
            )}
            <Text style={styles.dialogueText}>{currentLine.text}</Text>
          </View>
        </ImageBackground>

      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Changed backgroundColors to transparent so the App.tsx or ImageBackground shows through
  safeArea: { flex: 1, backgroundColor: 'transparent' },
  container: { flex: 1, backgroundColor: 'transparent' },
  
  portraitPlaceholder: { 
    position: 'absolute', 
    bottom: 180, 
    alignSelf: 'center', 
    width: 250, 
    height: 350, 
    backgroundColor: 'rgba(22, 33, 62, 0.8)', // Made slightly see-through
    justifyContent: 'center', 
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#0f3460'
  },
  dialogueBox: { 
    position: 'absolute', 
    bottom: 40, 
    left: 20, 
    right: 20, 
    minHeight: 120, 
    backgroundColor: 'rgba(0, 0, 0, 0.85)', 
    borderColor: '#e94560', 
    borderWidth: 2, 
    borderRadius: 12, 
    padding: 20 
  },
  speakerName: { color: '#e94560', fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  dialogueText: { color: '#FFF', fontSize: 18, lineHeight: 26 },
  debugText: { color: '#fff', opacity: 0.7 }
});