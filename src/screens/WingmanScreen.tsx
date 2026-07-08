import React, { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { suggestReplies } from '../ai/client';
import type { RizzLevel } from '../persona/kai';
import { theme } from '../theme';

export function WingmanScreen({
  apiKey,
  rizz,
  personaId,
}: {
  apiKey: string;
  rizz: RizzLevel;
  personaId: string;
}) {
  const [theirMsg, setTheirMsg] = useState('');
  const [replies, setReplies] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);

  async function go() {
    const msg = theirMsg.trim();
    if (!msg || busy) return;
    setBusy(true);
    setReplies([]);
    const { replies: r } = await suggestReplies(apiKey, rizz, personaId, msg);
    setReplies(r);
    setBusy(false);
  }

  // No clipboard dep — "copy" just flags it as selected for the demo.
  function markCopied(i: number) {
    setCopied(i);
    setTimeout(() => setCopied((c) => (c === i ? null : c)), 1400);
  }

  return (
    <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>🪽 Wingman Mode</Text>
      <Text style={styles.sub}>
        I-paste ang text ng crush mo. Bibigyan ka ni Kai ng 3 pa-kilig na sagot.
      </Text>

      <TextInput
        style={styles.input}
        value={theirMsg}
        onChangeText={setTheirMsg}
        placeholder='e.g. "Uy, gising ka pa pala? 👀"'
        placeholderTextColor={theme.textFaint}
        multiline
      />

      <Pressable style={[styles.cta, busy && styles.ctaBusy]} onPress={go} disabled={busy}>
        {busy ? (
          <ActivityIndicator color={theme.bubbleMeText} />
        ) : (
          <Text style={styles.ctaText}>Tulungan mo ako, Kai! 💘</Text>
        )}
      </Pressable>

      {replies.map((r, i) => (
        <Pressable key={i} style={styles.reply} onPress={() => markCopied(i)}>
          <Text style={styles.replyLabel}>Option {i + 1}</Text>
          <Text style={styles.replyText}>{r}</Text>
          <Text style={styles.tapHint}>{copied === i ? '✓ Ready to send!' : 'Tap to pick'}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: { padding: 18, paddingBottom: 40 },
  title: { color: theme.text, fontSize: 22, fontWeight: '800' },
  sub: { color: theme.textDim, fontSize: 14, marginTop: 6, marginBottom: 16, lineHeight: 20 },
  input: {
    minHeight: 90,
    color: theme.text,
    fontSize: 16,
    backgroundColor: theme.card,
    borderRadius: theme.radius,
    padding: 14,
    textAlignVertical: 'top',
  },
  cta: {
    marginTop: 14,
    backgroundColor: theme.accent,
    borderRadius: theme.radius,
    paddingVertical: 14,
    alignItems: 'center',
  },
  ctaBusy: { opacity: 0.7 },
  ctaText: { color: theme.bubbleMeText, fontSize: 16, fontWeight: '800' },
  reply: {
    marginTop: 14,
    backgroundColor: theme.card,
    borderRadius: theme.radius,
    padding: 16,
    borderLeftWidth: 3,
    borderLeftColor: theme.kilig,
  },
  replyLabel: { color: theme.gold, fontSize: 12, fontWeight: '700', letterSpacing: 1 },
  replyText: { color: theme.text, fontSize: 16, lineHeight: 22, marginTop: 6 },
  tapHint: { color: theme.textFaint, fontSize: 12, marginTop: 8 },
});
