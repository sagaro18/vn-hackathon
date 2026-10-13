
import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  View,
  Modal,
  ScrollView,
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
  const [historyVisible, setHistoryVisible] = useState(false);

  const currentLine = chapter1[currentIndex];
  const dialogueHistory = chapter1.slice(0, currentIndex + 1);

  const navigation = useNavigation<NavigationProp>();

  const handleNext = () => {
    // Do not advance the story while history is open.
    if (historyVisible) {
      return;
    }

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

          {/* History button */}
          <TouchableOpacity
            style={styles.historyButton}
            onPress={(event) => {
              event.stopPropagation();
              setHistoryVisible(true);
            }}
            accessibilityRole="button"
            accessibilityLabel="Open dialogue history"
          >
            <Text style={styles.historyButtonText}>History</Text>
          </TouchableOpacity>

          {!!portraitSource && (
            <Image
              source={portraitSource}
              style={styles.portrait}
              resizeMode="contain"
            />
          )}

          {/* Current dialogue */}
          <View style={styles.dialogueBox}>
            {!!currentLine.speaker && (
              <Text style={styles.speakerName}>
                {currentLine.speaker}
              </Text>
            )}
            <Text style={styles.dialogueText}>{currentLine.text}</Text>
            <Text style={styles.tapHint}>Tap to continue</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>

      {/* Dialogue history modal */}
      <Modal
        visible={historyVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setHistoryVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.historyPanel}>
            {/* Panel header */}
            <View style={styles.historyHeader}>
              <Text style={styles.historyTitle}>
                Dialogue History
              </Text>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setHistoryVisible(false)}
                accessibilityRole="button"
                accessibilityLabel="Close dialogue history"
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>

            {/* Scrollable dialogue history */}
            <ScrollView
              style={styles.historyScroll}
              contentContainerStyle={styles.historyContent}
              nestedScrollEnabled
            >
              {dialogueHistory.map((line) => (
                <View key={line.id} style={styles.historyEntry}>
                  {!!line.speaker && (
                    <Text style={styles.historySpeaker}>
                      {line.speaker}
                    </Text>
                  )}

                  <Text style={styles.historyDialogue}>
                    {line.text}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
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

  // History button styling
  historyButton: {
    position: 'absolute',
    top: 20,
    right: 15,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.82)',
    borderColor: '#e94560',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  historyButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Modal styling
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  historyPanel: {
    width: '100%',
    maxWidth: 600,
    height: '80%',
    maxHeight: 650,
    backgroundColor: '#17151e',
    borderColor: '#e94560',
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  historyTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    flexShrink: 1,
  },
  closeButton: {
    backgroundColor: '#e94560',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginLeft: 12,
  },
  closeButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },

  // History list styling
  historyScroll: {
    flex: 1,
  },
  historyContent: {
    paddingBottom: 12,
  },
  historyEntry: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#39313f',
  },
  historySpeaker: {
    color: '#e94560',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  historyDialogue: {
    color: '#FFF',
    fontSize: 15,
    lineHeight: 23,
  },
});
