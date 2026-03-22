import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Chat'>;
type ChatRouteProp = RouteProp<RootStackParamList, 'Chat'>;

export default function ChatScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ChatRouteProp>();

  const { characterId } = route.params;

  const isVaina = characterId === 'vaina';
  const charName = isVaina ? 'Vaina' : 'Meri';
  const bgImage = isVaina ? 'Village_Night' : 'Training_Grounds';
  const initialExpression = isVaina ? 'Happy' : 'Neutral';
  const defaultLine = isVaina
    ? 'Well Mister, what did you want to talk about?'
    : "Oh, hey. Didn't see you there. Just moving these logs. Barely even a warmup.";

  const quickPrompts = isVaina
    ? [
        'Do you come up here to watch the stars a lot?',
        'What is this village like at night?',
        "You always call me 'Mister' like we're in some old story.",
      ]
    : [
        'Are those logs heavy?',
        'Do you train here every day?',
        'You look like you could eat a massive meal after that workout.',
      ];

  const [currentLine, setCurrentLine] = useState(defaultLine);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [affection, setAffection] = useState(0);
  const [turnCount, setTurnCount] = useState(0);
  const [currentExpression, setCurrentExpression] = useState(initialExpression);

  const sendMessage = async (forcedMessage?: string) => {
    const userMessage = (forcedMessage ?? inputText).trim();

    if (!userMessage || loading) return;

    setInputText('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          characterId,
          userMessage,
          currentAffection: affection,
          turnCount,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch from AI');
      }

      const data = await response.json();

      setCurrentLine(data.reply ?? '...');
      setAffection(data.nextAffection ?? affection);
      setTurnCount(data.nextTurnCount ?? turnCount);
      setCurrentExpression(data.expression ?? 'Neutral');

      if (data.sceneEnded) {
        setTimeout(() => {
          navigation.replace('Paywall', { characterId });
        }, 700);
      }
    } catch (error) {
      console.error('Chat Error:', error);
      setCurrentLine('...She seems unresponsive.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.backgroundPlaceholder}>
          <Text style={styles.debugText}>BG: {bgImage}</Text>
        </View>

        <View style={styles.header}>
          <Text style={styles.headerTitle}>{charName} ({currentExpression})</Text>
          <Text style={styles.meter}>Affection: {affection} / 3</Text>
        </View>

        <View style={styles.portraitPlaceholder}>
          <Text style={styles.debugText}>{charName}</Text>
          <Text style={styles.debugText}>({currentExpression})</Text>
        </View>

        <View style={styles.dialogueBox}>
          <Text style={styles.speakerName}>{charName}</Text>
          <Text style={styles.dialogueText}>
            {loading ? `${charName} is thinking...` : currentLine}
          </Text>
          <Text style={styles.turnText}>Turns: {turnCount}</Text>
        </View>

        <View style={styles.quickPromptRow}>
          {quickPrompts.map((prompt) => (
            <TouchableOpacity
              key={prompt}
              style={[styles.quickPromptButton, loading && styles.quickPromptDisabled]}
              onPress={() => sendMessage(prompt)}
              disabled={loading}
            >
              <Text style={styles.quickPromptText}>{prompt}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={`Say something to ${charName}...`}
            placeholderTextColor="#888"
            value={inputText}
            onChangeText={setInputText}
            editable={!loading}
            onSubmitEditing={() => sendMessage()}
            returnKeyType="send"
          />
          <TouchableOpacity
            style={[styles.sendButton, loading && styles.sendButtonDisabled]}
            onPress={() => sendMessage()}
            disabled={loading}
          >
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#000' },
  container: { flex: 1 },
  backgroundPlaceholder: { ...StyleSheet.absoluteFillObject, backgroundColor: '#1a1a2e', justifyContent: 'center', alignItems: 'center' },
  header: { position: 'absolute', top: 10, left: 15, right: 15, padding: 15, backgroundColor: 'rgba(26, 26, 46, 0.9)', flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#e94560', borderRadius: 10 },
  headerTitle: { color: '#e94560', fontSize: 18, fontWeight: 'bold' },
  meter: { color: '#FFD700', fontSize: 16, fontWeight: 'bold' },
  portraitPlaceholder: { position: 'absolute', bottom: 260, alignSelf: 'center', width: 250, height: 350, backgroundColor: '#16213e', justifyContent: 'center', alignItems: 'center', borderRadius: 10, borderWidth: 2, borderColor: '#0f3460' },
  dialogueBox: { position: 'absolute', bottom: 155, left: 15, right: 15, minHeight: 130, backgroundColor: 'rgba(0,0,0,0.85)', borderColor: '#e94560', borderWidth: 2, borderRadius: 10, padding: 15 },
  speakerName: { color: '#e94560', fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  dialogueText: { color: '#FFF', fontSize: 16, lineHeight: 24 },
  turnText: { color: '#888', fontSize: 12, marginTop: 10, textAlign: 'right' },
  quickPromptRow: { position: 'absolute', bottom: 95, left: 15, right: 15, flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  quickPromptButton: { backgroundColor: 'rgba(22, 33, 62, 0.95)', borderColor: '#0f3460', borderWidth: 1, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8, marginRight: 8, marginBottom: 8 },
  quickPromptDisabled: { opacity: 0.5 },
  quickPromptText: { color: '#dbe4ff', fontSize: 13, fontWeight: '600' },
  inputContainer: { position: 'absolute', bottom: 20, left: 15, right: 15, flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', color: '#fff', borderRadius: 10, paddingHorizontal: 15, paddingVertical: 10, marginRight: 10, borderWidth: 1, borderColor: '#333' },
  sendButton: { backgroundColor: '#e94560', justifyContent: 'center', borderRadius: 10, paddingHorizontal: 20, paddingVertical: 12 },
  sendButtonDisabled: { backgroundColor: '#555' },
  sendButtonText: { color: '#fff', fontWeight: 'bold' },
  debugText: { color: '#fff', opacity: 0.5 },
});