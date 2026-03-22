import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { chapter1 } from '../data/story';
import { backgrounds, portraits } from '../data/assets';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Story'>;

export default function StoryScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentLine = chapter1[currentIndex];

  const navigation = useNavigation<NavigationProp>();

  const handleNext = () => {
    if (currentLine.triggerEvent === 'START_FREE_TIME') {
      navigation.replace('Choice');
      return;
    }

    if (currentIndex < chapter1.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const backgroundKey =
    (currentLine.background as keyof typeof backgrounds) ?? 'beginner_cave';
  const backgroundSource = backgrounds[backgroundKey] ?? backgrounds.beginner_cave;

  let portraitSource: any = null;

  if (currentLine.speaker === 'Vaina') {
    const expressionKey =
      (currentLine.expression as keyof typeof portraits.Vaina) ?? 'default';
    portraitSource = portraits.Vaina[expressionKey] ?? portraits.Vaina.default;
  } else if (currentLine.speaker === 'Meri') {
    const expressionKey =
      (currentLine.expression as keyof typeof portraits.Meri) ?? 'default';
    portraitSource = portraits.Meri[expressionKey] ?? portraits.Meri.default;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity style={styles.container} activeOpacity={1} onPress={handleNext}>
        <ImageBackground
          source={backgroundSource}
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.overlay} />

          {!!portraitSource && (
            <Image
              source={portraitSource}
              style={styles.portrait}
              resizeMode="contain"
            />
          )}

          <View style={styles.dialogueBox}>
            {currentLine.speaker !== '' && (
              <Text style={styles.speakerName}>{currentLine.speaker}</Text>
            )}
            <Text style={styles.dialogueText}>{currentLine.text}</Text>
            <Text style={styles.tapHint}>Tap to continue</Text>
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
    backgroundColor: 'rgba(0,0,0,0.12)',
  },
  portrait: {
    position: 'absolute',
    bottom: 120,
    alignSelf: 'center',
    width: 340,
    height: 460,
  },
  dialogueBox: {
    position: 'absolute',
    bottom: 20,
    left: 15,
    right: 15,
    minHeight: 140,
    backgroundColor: 'rgba(0,0,0,0.82)',
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
  tapHint: {
    marginTop: 10,
    color: '#c9c9d4',
    fontSize: 12,
    textAlign: 'right',
  },
});