import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Choice'>;

export default function ChoiceScreen() {
  const navigation = useNavigation<NavigationProp>();

  const handleChoice = (characterId: 'vaina' | 'meri') => {
    // Navigate to Chat and pass the chosen character!
    navigation.replace('Chat', { characterId });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.prompt}>Where would you like to go?</Text>

        <TouchableOpacity 
          style={styles.choiceButton} 
          onPress={() => handleChoice('vaina')}
        >
          <Text style={styles.choiceTitle}>Head to the Rooftop</Text>
          <Text style={styles.choiceSub}>Spend time with Vaina</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.choiceButton} 
          onPress={() => handleChoice('meri')}
        >
          <Text style={styles.choiceTitle}>Visit the Training Grounds</Text>
          <Text style={styles.choiceSub}>See what Meri is up to</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#000' },
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#1a1a2e' },
  prompt: { color: '#fff', fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 40 },
  choiceButton: { 
    backgroundColor: 'rgba(0,0,0,0.6)', 
    borderColor: '#e94560', 
    borderWidth: 2, 
    borderRadius: 10, 
    padding: 20, 
    marginBottom: 20,
    alignItems: 'center'
  },
  choiceTitle: { color: '#e94560', fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  choiceSub: { color: '#aaa', fontSize: 14 }
});