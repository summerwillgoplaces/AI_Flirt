import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { TabBar, type TabKey } from './src/components/TabBar';
import { ChatScreen } from './src/screens/ChatScreen';
import { WingmanScreen } from './src/screens/WingmanScreen';
import { RoleplayScreen } from './src/screens/RoleplayScreen';
import { PickupScreen } from './src/screens/PickupScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import {
  getApiKey,
  getRizz,
  setRizz as persistRizz,
  getPersonaId,
  setPersonaId as persistPersona,
} from './src/storage';
import { RIZZ, type RizzLevel } from './src/persona/kai';
import { personaById, DEFAULT_PERSONA_ID } from './src/persona/personalities';
import { theme } from './src/theme';

const TITLES: Record<TabKey, string> = {
  chat: 'Chat 💬',
  wingman: 'Wingman 🪽',
  roleplay: 'Roleplay 🎭',
  hugot: 'Hugot Lines 💘',
  settings: 'Settings ⚙️',
};

export default function App() {
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState<TabKey>('chat');
  const [apiKey, setApiKey] = useState('');
  const [rizz, setRizzState] = useState<RizzLevel>('smooth');
  const [personaId, setPersonaState] = useState<string>(DEFAULT_PERSONA_ID);

  useEffect(() => {
    (async () => {
      setApiKey(await getApiKey());
      setRizzState(await getRizz());
      setPersonaState(await getPersonaId());
      setReady(true);
    })();
  }, []);

  function changeRizz(r: RizzLevel) {
    setRizzState(r);
    void persistRizz(r);
  }

  function changePersona(id: string) {
    setPersonaState(id);
    void persistPersona(id);
  }

  if (!ready) {
    return (
      <View style={[styles.fill, styles.center]}>
        <ActivityIndicator color={theme.accent} size="large" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.fill} edges={['top', 'bottom']}>
        <StatusBar style="light" />
        <View style={styles.header}>
          <Text style={styles.title}>{TITLES[tab]}</Text>
          {tab !== 'settings' && (
            <View style={styles.badges}>
              <Pressable style={styles.badge} onPress={() => setTab('settings')}>
                <Text style={styles.badgeText}>
                  {personaById(personaId).emoji} {personaById(personaId).name}
                </Text>
              </Pressable>
              <Text style={[styles.badge, styles.badgeText]}>
                {RIZZ[rizz].emoji} {RIZZ[rizz].label}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.fill}>
          {tab === 'chat' && <ChatScreen apiKey={apiKey} rizz={rizz} personaId={personaId} />}
          {tab === 'wingman' && <WingmanScreen apiKey={apiKey} rizz={rizz} personaId={personaId} />}
          {tab === 'roleplay' && (
            <RoleplayScreen apiKey={apiKey} rizz={rizz} personaId={personaId} />
          )}
          {tab === 'hugot' && <PickupScreen />}
          {tab === 'settings' && (
            <SettingsScreen
              apiKey={apiKey}
              rizz={rizz}
              personaId={personaId}
              onApiKey={setApiKey}
              onRizz={changeRizz}
              onPersona={changePersona}
            />
          )}
        </View>

        <TabBar active={tab} onChange={setTab} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, backgroundColor: theme.bg },
  center: { alignItems: 'center', justifyContent: 'center' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: theme.bg,
  },
  title: { color: theme.text, fontSize: 20, fontWeight: '800' },
  badges: { flexDirection: 'row', gap: 6, flexShrink: 1, justifyContent: 'flex-end' },
  badge: {
    backgroundColor: theme.card,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    overflow: 'hidden',
  },
  badgeText: { color: theme.accent, fontSize: 12, fontWeight: '700' },
});
