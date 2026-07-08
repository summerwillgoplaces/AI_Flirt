import React, { useState } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { RizzPicker } from '../components/RizzPicker';
import { setApiKey as persistKey } from '../storage';
import type { RizzLevel } from '../persona/kai';
import { theme } from '../theme';

export function SettingsScreen({
  apiKey,
  rizz,
  onApiKey,
  onRizz,
}: {
  apiKey: string;
  rizz: RizzLevel;
  onApiKey: (k: string) => void;
  onRizz: (r: RizzLevel) => void;
}) {
  const [draft, setDraft] = useState(apiKey);
  const [saved, setSaved] = useState(false);

  async function save() {
    await persistKey(draft);
    onApiKey(draft.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  return (
    <ScrollView contentContainerStyle={styles.body}>
      <Text style={styles.h1}>Settings</Text>

      <View style={styles.section}>
        <RizzPicker value={rizz} onChange={onRizz} />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Claude API Key</Text>
        <Text style={styles.help}>
          Optional. Without it, Kai still flirts using built-in Taglish lines. Add a key
          to unlock smart, context-aware kilig powered by Claude. Your key is stored only
          on this device.
        </Text>
        <TextInput
          style={styles.input}
          value={draft}
          onChangeText={setDraft}
          placeholder="sk-ant-..."
          placeholderTextColor={theme.textFaint}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
        />
        <Pressable style={styles.save} onPress={save}>
          <Text style={styles.saveText}>{saved ? '✓ Saved!' : 'Save key'}</Text>
        </Pressable>
        <Pressable onPress={() => Linking.openURL('https://console.anthropic.com/settings/keys')}>
          <Text style={styles.link}>Get an API key →</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.status}>
          Status: {apiKey ? '🟢 Kai is running on Claude (smart mode)' : '🟡 Offline charm mode'}
        </Text>
      </View>

      <Text style={styles.footer}>
        Made with 💗 — Kai, your Pinoy flirting kabarkada. Flirt kindly, always with respeto. 🇵🇭
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: { padding: 18, paddingBottom: 40 },
  h1: { color: theme.text, fontSize: 24, fontWeight: '800', marginBottom: 8 },
  section: { backgroundColor: theme.bgElevated, borderRadius: theme.radius, padding: 16, marginTop: 14 },
  label: { color: theme.text, fontSize: 15, fontWeight: '700', marginBottom: 6 },
  help: { color: theme.textDim, fontSize: 13, lineHeight: 19, marginBottom: 12 },
  input: {
    color: theme.text,
    fontSize: 15,
    backgroundColor: theme.card,
    borderRadius: theme.radiusSm,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  save: {
    marginTop: 12,
    backgroundColor: theme.accent,
    borderRadius: theme.radiusSm,
    paddingVertical: 12,
    alignItems: 'center',
  },
  saveText: { color: theme.bubbleMeText, fontWeight: '800', fontSize: 15 },
  link: { color: theme.gold, marginTop: 12, fontSize: 14, fontWeight: '600' },
  status: { color: theme.textDim, fontSize: 14 },
  footer: { color: theme.textFaint, fontSize: 12, textAlign: 'center', marginTop: 24, lineHeight: 18 },
});
