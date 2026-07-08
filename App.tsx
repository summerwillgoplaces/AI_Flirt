import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { TabBar, type TabKey } from './src/components/TabBar';
import { ChatScreen } from './src/screens/ChatScreen';
import { WingmanScreen } from './src/screens/WingmanScreen';
import { PickupScreen } from './src/screens/PickupScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { getApiKey, getRizz, setRizz as persistRizz } from './src/storage';
import { RIZZ, type RizzLevel } from './src/persona/kai';
import { theme } from './src/theme';

const TITLES: Record<TabKey, string> = {
  chat: 'Kai 💬',
  wingman: 'Wingman 🪽',
  hugot: 'Hugot Lines 💘',
  settings: 'Settings ⚙️',
};

export default function App() {
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState<TabKey>('chat');
  const [apiKey, setApiKey] = useState('');
  const [rizz, setRizzState] = useState<RizzLevel>('smooth');

  useEffect(() => {
    (async () => {
      setApiKey(await getApiKey());
      setRizzState(await getRizz());
      setReady(true);
    })();
  }, []);

  function changeRizz(r: RizzLevel) {
    setRizzState(r);
    void persistRizz(r);
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
            <Text style={styles.rizzBadge}>
              {RIZZ[rizz].emoji} {RIZZ[rizz].label}
            </Text>
          )}
        </View>

        <View style={styles.fill}>
          {tab === 'chat' && <ChatScreen apiKey={apiKey} rizz={rizz} />}
          {tab === 'wingman' && <WingmanScreen apiKey={apiKey} rizz={rizz} />}
          {tab === 'hugot' && <PickupScreen />}
          {tab === 'settings' && (
            <SettingsScreen
              apiKey={apiKey}
              rizz={rizz}
              onApiKey={setApiKey}
              onRizz={changeRizz}
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
  rizzBadge: {
    color: theme.accent,
    fontSize: 13,
    fontWeight: '700',
    backgroundColor: theme.card,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    overflow: 'hidden',
  },
});
