import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PremiumScene'
>;

const premiumSceneLines = [
  {
    speaker: 'Vaina',
    expression: 'Soft',
    background: 'Village_Night',
    text: "You really stayed, Mister. I thought you'd wander off the moment things got quiet.",
  },
  {
    speaker: 'Player',
    expression: 'none',
    background: 'Village_Night',
    text: "Maybe I just wanted to know what you were thinking while you stared up at the sky.",
  },
  {
    speaker: 'Vaina',
    expression: 'Giggling',
    background: 'Village_Night',
    text: "Dangerous thing to ask a girl like me. I've got far too many thoughts and half of them don't know how to behave.",
  },
  {
    speaker: 'Vaina',
    expression: 'Happy',
    background: 'Village_Night',
    text: "Still... it's nice. Having someone sit beside me without asking for medicine, miracles, or answers.",
  },
  {
    speaker: 'Vaina',
    expression: 'Sad',
    background: 'Village_Night',
    text: "Sometimes I look at those stars and wonder if there's a place out there where people get to choose who they become.",
  },
  {
    speaker: 'Player',
    expression: 'none',
    background: 'Village_Night',
    text: "And if there is?",
  },
  {
    speaker: 'Vaina',
    expression: 'Happy',
    background: 'Village_Night',
    text: "Then maybe... when you're strong enough to leave, you can tell me what it looks like.",
  },
  {
    speaker: 'Vaina',
    expression: 'Giggling',
    background: 'Village_Night',
    text: "But that's enough big feelings for one night. Sit with me a little longer, okay, Mister?",
  },
];

export default function PremiumSceneScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentLine = premiumSceneLines[currentIndex];
  const isLastLine = currentIndex === premiumSceneLines.length - 1;

  const handleNext = () => {
    if (isLastLine) {
      navigation.replace('Story');
      return;
    }

    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onPress={handleNext}
      >
        <View style={styles.backgroundPlaceholder}>
          <Text style={styles.debugText}>BG: {currentLine.background}</Text>
        </View>

        <View style={styles.premiumBadge}>
          <Text style={styles.premiumBadgeText}>PREMIUM SCENE</Text>
        </View>

        {currentLine.speaker !== '' && (
          <View style={styles.portraitPlaceholder}>
            <Text style={styles.debugText}>{currentLine.speaker}</Text>
            <Text style={styles.debugText}>({currentLine.expression})</Text>
          </View>
        )}

        <View style={styles.dialogueBox}>
          {currentLine.speaker !== '' && (
            <Text style={styles.speakerName}>{currentLine.speaker}</Text>
          )}

          <Text style={styles.dialogueText}>{currentLine.text}</Text>

          <Text style={styles.progressText}>
            {currentIndex + 1} / {premiumSceneLines.length}
          </Text>

          <Text style={styles.tapHint}>
            {isLastLine ? 'Tap to return' : 'Tap to continue'}
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundPlaceholder: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#120f1f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  premiumBadge: {
    position: 'absolute',
    top: 20,
    alignSelf: 'center',
    backgroundColor: 'rgba(233, 69, 96, 0.18)',
    borderColor: '#e94560',
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  premiumBadgeText: {
    color: '#ffd166',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },
  portraitPlaceholder: {
    position: 'absolute',
    bottom: 160,
    alignSelf: 'center',
    width: 250,
    height: 350,
    backgroundColor: '#1f1630',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e94560',
  },
  dialogueBox: {
    position: 'absolute',
    bottom: 20,
    left: 15,
    right: 15,
    minHeight: 140,
    backgroundColor: 'rgba(0,0,0,0.88)',
    borderColor: '#e94560',
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
  },
  speakerName: {
    color: '#e94560',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dialogueText: {
    color: '#FFF',
    fontSize: 16,
    lineHeight: 24,
  },
  progressText: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 10,
  },
  tapHint: {
    color: '#ffd166',
    fontSize: 12,
    marginTop: 6,
    textAlign: 'right',
  },
  debugText: {
    color: '#fff',
    opacity: 0.5,
  },
});