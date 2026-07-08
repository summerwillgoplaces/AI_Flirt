import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Bubble } from '../components/Bubble';
import { chatWithKai, type ChatTurn } from '../ai/client';
import { GREETINGS, pick, type RizzLevel } from '../persona/kai';
import { theme } from '../theme';

export function ChatScreen({
  apiKey,
  rizz,
  personaId,
}: {
  apiKey: string;
  rizz: RizzLevel;
  personaId: string;
}) {
  const [turns, setTurns] = useState<ChatTurn[]>([
    { role: 'assistant', content: pick(GREETINGS) },
  ]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const listRef = useRef<FlatList<ChatTurn>>(null);

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
    const { text: reply } = await chatWithKai(apiKey, rizz, personaId, next.slice(-12));
    setTurns((prev) => [...prev, { role: 'assistant', content: reply }]);
    setBusy(false);
  }

  return (
    <KeyboardAvoidingView
      style={styles.fill}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <FlatList
        ref={listRef}
        data={turns}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item }) => (
          <Bubble from={item.role === 'user' ? 'me' : 'kai'} text={item.content} />
        )}
        contentContainerStyle={styles.list}
      />
      {busy && (
        <Text style={styles.typing}>Kai is typing… nagbubuo ng kilig 💭</Text>
      )}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="I-type ang chika mo kay Kai…"
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
  list: { paddingVertical: 12 },
  typing: { color: theme.textFaint, fontSize: 12, paddingHorizontal: 18, paddingBottom: 4, fontStyle: 'italic' },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 10,
    gap: 8,
    backgroundColor: theme.bgElevated,
  },
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
  send: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: theme.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBusy: { opacity: 0.7 },
  sendText: { color: theme.bubbleMeText, fontSize: 20, fontWeight: '800' },
});
