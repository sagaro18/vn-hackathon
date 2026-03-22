import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Paywall'>;
type PaywallRouteProp = RouteProp<RootStackParamList, 'Paywall'>; 

export default function PaywallScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<PaywallRouteProp>(); 

  const { characterId } = route.params;
  const charName = characterId === 'vaina' ? 'Vaina' : 'Meri';

  const currentGems = 100;
  const premiumCost = 50;

  const handleUnlock = () => {
    navigation.replace('PremiumScene', { characterId });
  };

  const handleMaybeLater = () => {
    navigation.replace('Home');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.backgroundGlow} />

        <View style={styles.card}>
          <Text style={styles.kicker}>PRIVATE SCENE UNLOCKED</Text>
          <Text style={styles.title}>Stay a little longer with {charName}</Text>
          <Text style={styles.subtitle}>
            You got closer to her tonight. Spend gems to unlock an exclusive late-night scene,
            extra dialogue, and a more intimate story moment.
          </Text>

          <View style={styles.rewardBox}>
            <Text style={styles.rewardTitle}>Includes</Text>
            <Text style={styles.rewardItem}>• Exclusive private conversation</Text>
            <Text style={styles.rewardItem}>• Extra relationship progression</Text>
            <Text style={styles.rewardItem}>• Premium story scene</Text>
          </View>

          <View style={styles.priceRow}>
            <View style={styles.pricePill}>
              <Text style={styles.priceLabel}>Cost</Text>
              <Text style={styles.priceValue}>{premiumCost} Gems</Text>
            </View>

            <View style={styles.pricePill}>
              <Text style={styles.priceLabel}>You Have</Text>
              <Text style={styles.priceValue}>{currentGems} Gems</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.primaryButton} onPress={handleUnlock}>
            <Text style={styles.primaryButtonText}>Spend 50 Gems</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={handleMaybeLater}>
            <Text style={styles.secondaryButtonText}>Maybe Later</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            Some moments only happen if you choose them.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#09090f' },
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#09090f' },
  backgroundGlow: { position: 'absolute', top: 120, left: 40, right: 40, height: 220, borderRadius: 999, backgroundColor: 'rgba(233, 69, 96, 0.12)' },
  card: { backgroundColor: '#12131c', borderWidth: 1, borderColor: '#2b2d42', borderRadius: 20, padding: 24 },
  kicker: { color: '#e94560', fontSize: 12, fontWeight: '800', letterSpacing: 1.2, marginBottom: 10, textAlign: 'center' },
  title: { color: '#ffffff', fontSize: 28, fontWeight: '800', textAlign: 'center', marginBottom: 12 },
  subtitle: { color: '#c9c9d4', fontSize: 15, lineHeight: 24, textAlign: 'center', marginBottom: 22 },
  rewardBox: { backgroundColor: '#1a1c29', borderRadius: 16, padding: 16, marginBottom: 18 },
  rewardTitle: { color: '#fff', fontSize: 16, fontWeight: '700', marginBottom: 10 },
  rewardItem: { color: '#d6d6e3', fontSize: 14, lineHeight: 22 },
  priceRow: { flexDirection: 'row', gap: 12, marginBottom: 22 },
  pricePill: { flex: 1, backgroundColor: '#1a1c29', borderRadius: 14, paddingVertical: 14, paddingHorizontal: 12, alignItems: 'center' },
  priceLabel: { color: '#9ea3b0', fontSize: 12, marginBottom: 4 },
  priceValue: { color: '#ffd166', fontSize: 18, fontWeight: '800' },
  primaryButton: { backgroundColor: '#e94560', borderRadius: 14, paddingVertical: 15, alignItems: 'center', marginBottom: 12 },
  primaryButtonText: { color: '#fff', fontSize: 16, fontWeight: '800' },
  secondaryButton: { borderRadius: 14, paddingVertical: 14, alignItems: 'center', borderWidth: 1, borderColor: '#34374a', marginBottom: 16 },
  secondaryButtonText: { color: '#c9c9d4', fontSize: 15, fontWeight: '700' },
  footerText: { color: '#7f8496', fontSize: 12, textAlign: 'center' },
});