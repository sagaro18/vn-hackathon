import React, { useState } from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { backgrounds } from '../data/assets';

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PremiumScene'
>;
type PremiumSceneRouteProp = RouteProp<RootStackParamList, 'PremiumScene'>;

const vainaSceneLines = [
  {
    speaker: 'Vaina',
    text: "You really stayed, Mister. I thought you'd wander off the moment things got quiet.",
  },
  {
    speaker: 'Player',
    text: 'Maybe I just wanted to know what you were thinking while you stared up at the sky.',
  },
  {
    speaker: 'Vaina',
    text: "Dangerous thing to ask a girl like me. I've got far too many thoughts, and half of them don't know how to behave.",
  },
  {
    speaker: 'Vaina',
    text: "Still... it's nice. Having someone sit beside me without asking for medicine, miracles, or answers.",
  },
  {
    speaker: 'Vaina',
    text: "Sometimes I look at those stars and wonder if there's a place out there where people get to choose who they become.",
  },
  {
    speaker: 'Player',
    text: 'And if there is?',
  },
  {
    speaker: 'Vaina',
    text: "Then maybe... when you're strong enough to leave, you can tell me what it looks like.",
  },
  {
    speaker: 'Vaina',
    text: "But that's enough big feelings for one night. Sit with me a little longer, okay, Mister?",
  },
];

const meriSceneLines = [
  {
    speaker: 'Meri',
    text: "Huh. So you actually came. I figured you'd get scared off once you saw how much food I brought.",
  },
  {
    speaker: 'Player',
    text: 'That depends. Are you planning to eat all of it yourself?',
  },
  {
    speaker: 'Meri',
    text: "Don't tempt me. Training all day makes a girl hungry.",
  },
  {
    speaker: 'Meri',
    text: "Most people only come talk to me when they want something heavy moved or someone yelled at.",
  },
  {
    speaker: 'Player',
    text: 'And what if I just wanted to spend time with you?',
  },
  {
    speaker: 'Meri',
    text: "Tch. You're smoother than you look.",
  },
  {
    speaker: 'Meri',
    text: "Still... this is nice. Good food, warm air, and someone who doesn't mind sitting in silence for a bit.",
  },
  {
    speaker: 'Meri',
    text: "Don't make a habit of making me like this, alright? ...But you can stay until sunset's gone.",
  },
];

export default function PremiumSceneScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<PremiumSceneRouteProp>();

  const { characterId } = route.params;

  const isVaina = characterId === 'vaina';
  const charName = isVaina ? 'Vaina' : 'Meri';

  const sceneLines = isVaina ? vainaSceneLines : meriSceneLines;
  const backgroundSource = isVaina
    ? backgrounds.Premium_Vaina
    : backgrounds.Premium_Meri;

  const [currentIndex, setCurrentIndex] = useState(0);

  const currentLine = sceneLines[currentIndex];
  const isLastLine = currentIndex === sceneLines.length - 1;

  const handleNext = () => {
    if (isLastLine) {
      navigation.replace('Home');
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
        <ImageBackground
          source={backgroundSource}
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.overlay} />

          <View style={styles.premiumBadge}>
            <Text style={styles.premiumBadgeText}>PREMIUM SCENE</Text>
          </View>

          <View style={styles.dialogueBox}>
            {currentLine.speaker !== '' && (
              <Text style={styles.speakerName}>{currentLine.speaker}</Text>
            )}

            <Text style={styles.dialogueText}>{currentLine.text}</Text>

            <Text style={styles.progressText}>
              {currentIndex + 1} / {sceneLines.length}
            </Text>

            <Text style={styles.tapHint}>
              {isLastLine ? 'Tap to return home' : 'Tap to continue'}
            </Text>
          </View>
        </ImageBackground>
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
  background: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.18)',
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
  dialogueBox: {
    position: 'absolute',
    bottom: 20,
    left: 15,
    right: 15,
    minHeight: 150,
    backgroundColor: 'rgba(0,0,0,0.86)',
    borderColor: '#e94560',
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
  },
  speakerName: {
    color: '#e94560',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
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
});