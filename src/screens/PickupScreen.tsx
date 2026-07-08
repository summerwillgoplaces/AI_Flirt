import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { HUGOT_LINES, PICKUP_LINES, pick } from '../persona/kai';
import { theme } from '../theme';

type Mode = 'pickup' | 'hugot';

export function PickupScreen() {
  const [mode, setMode] = useState<Mode>('pickup');
  const [line, setLine] = useState<string>(pick(PICKUP_LINES));

  function shuffle(next: Mode = mode) {
    setLine(pick(next === 'pickup' ? PICKUP_LINES : HUGOT_LINES));
  }

  function switchMode(next: Mode) {
    setMode(next);
    shuffle(next);
  }

  return (
    <View style={styles.body}>
      <View style={styles.toggle}>
        <Pressable
          style={[styles.toggleBtn, mode === 'pickup' && styles.toggleOn]}
          onPress={() => switchMode('pickup')}
        >
          <Text style={[styles.toggleText, mode === 'pickup' && styles.toggleTextOn]}>
            💘 Pick-up
          </Text>
        </Pressable>
        <Pressable
          style={[styles.toggleBtn, mode === 'hugot' && styles.toggleOn]}
          onPress={() => switchMode('hugot')}
        >
          <Text style={[styles.toggleText, mode === 'hugot' && styles.toggleTextOn]}>
            🥺 Hugot
          </Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.quote}>“</Text>
        <Text style={styles.line}>{line}</Text>
      </View>

      <Pressable style={styles.cta} onPress={() => shuffle()}>
        <Text style={styles.ctaText}>Isa pa, Kai! 🎲</Text>
      </Pressable>

      <Text style={styles.tip}>
        {mode === 'pickup'
          ? 'Tip: sabihin nang confident. Kilig guaranteed. 😉'
          : 'Warning: baka may ma-in love sa\'yo. Char! 💗'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  body: { flex: 1, padding: 18, justifyContent: 'center' },
  toggle: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  toggleBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: theme.radiusSm,
    backgroundColor: theme.card,
    alignItems: 'center',
  },
  toggleOn: { backgroundColor: theme.cardAlt, borderWidth: 1, borderColor: theme.kilig },
  toggleText: { color: theme.textDim, fontWeight: '700' },
  toggleTextOn: { color: theme.text },
  card: {
    backgroundColor: theme.card,
    borderRadius: 28,
    padding: 28,
    minHeight: 220,
    justifyContent: 'center',
  },
  quote: { color: theme.kilig, fontSize: 64, height: 40, marginTop: -20, fontWeight: '800' },
  line: { color: theme.text, fontSize: 22, lineHeight: 32, fontWeight: '600' },
  cta: {
    marginTop: 22,
    backgroundColor: theme.accent,
    borderRadius: theme.radius,
    paddingVertical: 15,
    alignItems: 'center',
  },
  ctaText: { color: theme.bubbleMeText, fontSize: 17, fontWeight: '800' },
  tip: { color: theme.textFaint, fontSize: 13, textAlign: 'center', marginTop: 16, fontStyle: 'italic' },
});
