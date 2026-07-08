import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Bubble } from '../components/Bubble';
import { roleplayWithKai, type ChatTurn } from '../ai/client';
import { SCENARIOS, type Scenario } from '../persona/scenarios';
import { personaById } from '../persona/personalities';
import type { RizzLevel } from '../persona/kai';
import { theme } from '../theme';

export function RoleplayScreen({
  apiKey,
  rizz,
  personaId,
}: {
  apiKey: string;
  rizz: RizzLevel;
  personaId: string;
}) {
  const [scenario, setScenario] = useState<Scenario | null>(null);

  if (!scenario) {
    return <ScenarioPicker onPick={setScenario} personaId={personaId} />;
  }
  return (
    <RoleplayChat
      apiKey={apiKey}
      rizz={rizz}
      personaId={personaId}
      scenario={scenario}
      onBack={() => setScenario(null)}
    />
  );
}

function ScenarioPicker({
  onPick,
  personaId,
}: {
  onPick: (s: Scenario) => void;
  personaId: string;
}) {
  const p = personaById(personaId);
  return (
    <ScrollView contentContainerStyle={styles.pickerBody}>
      <Text style={styles.title}>🎭 Role-play Practice</Text>
      <Text style={styles.sub}>
        Mag-ensayo kasama si {p.name} {p.emoji}. Pumili ng eksena — siya na ang bahalang
        gaganap at magco-coach sa iyo. Practice makes kilig.
      </Text>
      {SCENARIOS.map((s) => (
        <Pressable key={s.id} style={styles.scenario} onPress={() => onPick(s)}>
          <Text style={styles.scEmoji}>{s.emoji}</Text>
          <View style={styles.scBody}>
            <Text style={styles.scTitle}>{s.title}</Text>
            <Text style={styles.scSetup}>{s.setup}</Text>
            <Text style={styles.scGoal}>🎯 {s.goal}</Text>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}

function RoleplayChat({
  apiKey,
  rizz,
  personaId,
  scenario,
  onBack,
}: {
  apiKey: string;
  rizz: RizzLevel;
  personaId: string;
  scenario: Scenario;
  onBack: () => void;
}) {
  const p = personaById(personaId);
  const [turns, setTurns] = useState<ChatTurn[]>([
    {
      role: 'assistant',
      content: `Game! Eksena: ${scenario.title}. ${scenario.setup} Ako na bahala gumanap — simulan mo na, ipakita mo ang moves mo. 😉`,
    },
  ]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const listRef = useRef<FlatList<ChatTurn>>(null);

  async function copyLine(text: string) {
    await Clipboard.setStringAsync(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  useEffect(() => {
    const t = setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 80);
    return () => clearTimeout(t);
  }, [turns]);

  async function send() {
    const text = input.trim();
    if (!text || busy) return;
    const next: ChatTurn[] = [...turns, { role: 'user', content: text }];
    setTurns(next);
    setInput('');
    setBusy(true);
    const { text: reply } = await roleplayWithKai(apiKey, rizz, personaId, scenario, next.slice(-12));
    setTurns((prev) => [...prev, { role: 'assistant', content: reply }]);
    setBusy(false);
  }

  return (
    <KeyboardAvoidingView
      style={styles.fill}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <Pressable style={styles.banner} onPress={onBack}>
        <Text style={styles.bannerBack}>‹ Palitan</Text>
        <Text style={styles.bannerTitle} numberOfLines={1}>
          {scenario.emoji} {scenario.title} · {p.emoji} {p.name}
        </Text>
      </Pressable>

      <FlatList
        ref={listRef}
        data={turns}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item }) => (
          <Bubble
            from={item.role === 'user' ? 'me' : 'kai'}
            text={item.content}
            onPress={item.role === 'assistant' ? () => copyLine(item.content) : undefined}
          />
        )}
        contentContainerStyle={styles.list}
      />
      {copied && <Text style={styles.copied}>✓ Copied! Tap any coach line to steal it. 💌</Text>}
      {busy && <Text style={styles.typing}>{p.name} is acting… 🎭</Text>}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Ano'ng isasagot mo?"
          placeholderTextColor={theme.textFaint}
          multiline
          onSubmitEditing={send}
        />
        <Pressable style={[styles.send, busy && styles.sendBusy]} onPress={send} disabled={busy}>
          {busy ? <ActivityIndicator color={theme.bubbleMeText} /> : <Text style={styles.sendText}>➤</Text>}
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  pickerBody: { padding: 18, paddingBottom: 40 },
  title: { color: theme.text, fontSize: 22, fontWeight: '800' },
  sub: { color: theme.textDim, fontSize: 14, marginTop: 6, marginBottom: 16, lineHeight: 20 },
  scenario: {
    flexDirection: 'row',
    backgroundColor: theme.card,
    borderRadius: theme.radius,
    padding: 14,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: theme.accent,
  },
  scEmoji: { fontSize: 26, marginRight: 12 },
  scBody: { flex: 1 },
  scTitle: { color: theme.text, fontSize: 16, fontWeight: '700' },
  scSetup: { color: theme.textDim, fontSize: 13, marginTop: 4, lineHeight: 18 },
  scGoal: { color: theme.gold, fontSize: 12, marginTop: 6 },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: theme.bgElevated,
  },
  bannerBack: { color: theme.accent, fontSize: 15, fontWeight: '700' },
  bannerTitle: { color: theme.textDim, fontSize: 13, flex: 1 },
  list: { paddingVertical: 12 },
  typing: { color: theme.textFaint, fontSize: 12, paddingHorizontal: 18, paddingBottom: 4, fontStyle: 'italic' },
  copied: { color: theme.kilig, fontSize: 12, paddingHorizontal: 18, paddingBottom: 4, fontWeight: '600' },
  inputRow: { flexDirection: 'row', alignItems: 'flex-end', padding: 10, gap: 8, backgroundColor: theme.bgElevated },
  input: {
    flex: 1,
    maxHeight: 120,
    color: theme.text,
    fontSize: 16,
    backgroundColor: theme.card,
    borderRadius: theme.radius,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  send: { width: 46, height: 46, borderRadius: 23, backgroundColor: theme.accent, alignItems: 'center', justifyContent: 'center' },
  sendBusy: { opacity: 0.7 },
  sendText: { color: theme.bubbleMeText, fontSize: 20, fontWeight: '800' },
});
