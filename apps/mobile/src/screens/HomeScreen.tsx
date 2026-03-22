import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();

  const handleStart = () => {
    navigation.replace('Story');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.backgroundGlow} />

        <Text style={styles.title}>Project Vaina</Text>
        <Text style={styles.subtitle}>
          A mystery visual novel about strange worlds, lost memories, and dangerous late-night conversations.
        </Text>

        <TouchableOpacity style={styles.primaryButton} onPress={handleStart}>
          <Text style={styles.primaryButtonText}>Start Game</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>Hackathon Demo Build</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'transparent',
  },
  backgroundGlow: {
    position: 'absolute',
    top: 140,
    width: 280,
    height: 280,
    borderRadius: 999,
    backgroundColor: 'rgba(233, 69, 96, 0.12)',
  },
  title: {
    color: '#ffffff',
    fontSize: 40,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    color: '#c9c9d4',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 32,
    maxWidth: 320,
  },
  primaryButton: {
    backgroundColor: '#e94560',
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: 28,
    marginBottom: 20,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
  footer: {
    position: 'absolute',
    bottom: 24,
    color: '#7f8496',
    fontSize: 12,
  },
});