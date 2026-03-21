import React, { useState, useRef } from 'react';
import { 
    View, Text, TextInput, TouchableOpacity, StyleSheet, 
    KeyboardAvoidingView, Platform, ScrollView 
  } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

// Local types for the chat UI
interface Message {
  id: string;
  sender: 'player' | 'vaina';
  text: string;
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'vaina', text: 'Well Mister, what did you want to talk about?' }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Game State
  const [affection, setAffection] = useState(0);
  const [currentExpression, setCurrentExpression] = useState('Happy');
  
  const scrollViewRef = useRef<ScrollView>(null);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    // 1. Add player message to UI instantly
    const userMsg: Message = { id: Date.now().toString(), sender: 'player', text: inputText };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      // 2. Call your local Hono + Mastra API
      // NOTE: If testing on a physical phone, change 'localhost' to your Mac's local Wi-Fi IP address!
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ characterId: 'vaina', userMessage: userMsg.text }),
      });

      if (!response.ok) throw new Error('Failed to fetch from AI');

      const data = await response.json();

      // 3. Update the UI with Vaina's response
      const vainaMsg: Message = { id: (Date.now() + 1).toString(), sender: 'vaina', text: data.reply };
      setMessages(prev => [...prev, vainaMsg]);
      
      // 4. Update the relationship meter and her expression
      setAffection(prev => prev + data.affectionDelta);
      setCurrentExpression(data.expression);

    } catch (error) {
      console.error("Chat Error:", error);
      const errorMsg: Message = { id: Date.now().toString(), sender: 'vaina', text: '... (She seems unresponsive)' };
      setMessages(prev => [...prev, errorMsg]);
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
        {/* Top Bar: Relationship Meter & Expression */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Vaina ({currentExpression})</Text>
          <Text style={styles.meter}>Affection: {affection} / 3</Text>
        </View>

        {/* Chat History */}
        <ScrollView 
          ref={scrollViewRef}
          style={styles.chatArea}
          contentContainerStyle={{ padding: 15, paddingBottom: 40 }}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((msg) => (
            <View key={msg.id} style={[styles.messageBubble, msg.sender === 'player' ? styles.playerBubble : styles.vainaBubble]}>
              <Text style={styles.messageText}>{msg.text}</Text>
            </View>
          ))}
          {loading && <Text style={styles.loadingText}>Vaina is thinking...</Text>}
        </ScrollView>

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Say something to Vaina..."
            placeholderTextColor="#888"
            value={inputText}
            onChangeText={setInputText}
            editable={!loading}
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity style={[styles.sendButton, loading && styles.sendButtonDisabled]} onPress={sendMessage} disabled={loading}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0f3460' },
  container: { flex: 1 },
  header: { padding: 15, backgroundColor: '#1a1a2e', flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#e94560' },
  headerTitle: { color: '#e94560', fontSize: 18, fontWeight: 'bold' },
  meter: { color: '#FFD700', fontSize: 16, fontWeight: 'bold' },
  chatArea: { flex: 1, backgroundColor: '#000' },
  messageBubble: { maxWidth: '80%', padding: 12, borderRadius: 10, marginBottom: 10 },
  playerBubble: { alignSelf: 'flex-end', backgroundColor: '#e94560' },
  vainaBubble: { alignSelf: 'flex-start', backgroundColor: '#16213e', borderWidth: 1, borderColor: '#0f3460' },
  messageText: { color: '#fff', fontSize: 16 },
  loadingText: { color: '#888', fontStyle: 'italic', alignSelf: 'flex-start', marginLeft: 10 },
  inputContainer: { flexDirection: 'row', padding: 10, backgroundColor: '#1a1a2e', borderTopWidth: 1, borderColor: '#0f3460' },
  input: { flex: 1, backgroundColor: '#000', color: '#fff', borderRadius: 20, paddingHorizontal: 15, paddingVertical: 10, marginRight: 10, borderWidth: 1, borderColor: '#333' },
  sendButton: { backgroundColor: '#e94560', justifyContent: 'center', borderRadius: 20, paddingHorizontal: 20 },
  sendButtonDisabled: { backgroundColor: '#555' },
  sendButtonText: { color: '#fff', fontWeight: 'bold' }
});