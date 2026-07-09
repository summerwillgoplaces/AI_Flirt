import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';

const STEPS: { emoji: string; title: string; body: string }[] = [
  {
    emoji: '🎭',
    title: 'Pumili ng coach',
    body: '7 personalities — mula shy softie hanggang bold charmer. Each one may sariling vibe.',
  },
  {
    emoji: '🎚️',
    title: 'I-set ang Rizz',
    body: 'Torpe, Smooth, o Landi? Ikaw ang bahala sa lakas ng lambing.',
  },
  {
    emoji: '💬',
    title: 'Chat, Wingman, at Roleplay',
    body: 'Mag-practice, humingi ng pa-kilig na reply, o mag-ensayo ng totoong eksena.',
  },
];

export function OnboardingScreen({ onDone }: { onDone: () => void }) {
  return (
    <View style={styles.fill}>
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.hero}>💘</Text>
        <Text style={styles.title}>Kumusta! Ako si Kai 💗</Text>
        <Text style={styles.subtitle}>
          Your Pinoy flirting kabarkada. Tutulungan kitang maging mas charming, confident,
          at kilig-worthy — sa totoong ikaw.
        </Text>

        <View style={styles.card}>
          {STEPS.map((s) => (
            <View key={s.title} style={styles.step}>
              <Text style={styles.stepEmoji}>{s.emoji}</Text>
              <View style={styles.stepBody}>
                <Text style={styles.stepTitle}>{s.title}</Text>
                <Text style={styles.stepText}>{s.body}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.freeBadge}>
          <Text style={styles.freeText}>
            ✨ Libre subukan — walang sign-up, walang API key na kailangan. Gumagana agad!
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={styles.cta} onPress={onDone}>
          <Text style={styles.ctaText}>Simulan na! →</Text>
        </Pressable>
        <Text style={styles.foot}>Flirt kindly, laging may respeto. 🇵🇭</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, backgroundColor: theme.bg },
  body: { padding: 24, paddingTop: 40, alignItems: 'center' },
  hero: { fontSize: 64, marginBottom: 8 },
  title: { color: theme.text, fontSize: 26, fontWeight: '800', textAlign: 'center' },
  subtitle: {
    color: theme.textDim,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 22,
  },
  card: { alignSelf: 'stretch', backgroundColor: theme.bgElevated, borderRadius: theme.radius, padding: 8 },
  step: { flexDirection: 'row', alignItems: 'center', padding: 12 },
  stepEmoji: { fontSize: 28, marginRight: 14 },
  stepBody: { flex: 1 },
  stepTitle: { color: theme.text, fontSize: 16, fontWeight: '700' },
  stepText: { color: theme.textDim, fontSize: 13, lineHeight: 18, marginTop: 2 },
  freeBadge: {
    alignSelf: 'stretch',
    marginTop: 18,
    backgroundColor: theme.cardAlt,
    borderRadius: theme.radiusSm,
    padding: 14,
    borderLeftWidth: 3,
    borderLeftColor: theme.gold,
  },
  freeText: { color: theme.text, fontSize: 14, lineHeight: 20, fontWeight: '600' },
  footer: { padding: 20, paddingTop: 8 },
  cta: {
    backgroundColor: theme.accent,
    borderRadius: theme.radius,
    paddingVertical: 16,
    alignItems: 'center',
  },
  ctaText: { color: theme.bubbleMeText, fontSize: 18, fontWeight: '800' },
  foot: { color: theme.textFaint, fontSize: 12, textAlign: 'center', marginTop: 12 },
});
