import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';

export type TabKey = 'chat' | 'wingman' | 'roleplay' | 'hugot' | 'settings';

const TABS: { key: TabKey; icon: string; label: string }[] = [
  { key: 'chat', icon: '💬', label: 'Chat' },
  { key: 'wingman', icon: '🪽', label: 'Wingman' },
  { key: 'roleplay', icon: '🎭', label: 'Roleplay' },
  { key: 'hugot', icon: '💘', label: 'Hugot' },
  { key: 'settings', icon: '⚙️', label: 'Settings' },
];

export function TabBar({ active, onChange }: { active: TabKey; onChange: (t: TabKey) => void }) {
  return (
    <View style={styles.bar}>
      {TABS.map((t) => {
        const on = t.key === active;
        return (
          <Pressable key={t.key} style={styles.tab} onPress={() => onChange(t.key)}>
            <Text style={[styles.icon, on && styles.iconOn]}>{t.icon}</Text>
            <Text style={[styles.label, on && styles.labelOn]} numberOfLines={1}>
              {t.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: theme.bgElevated,
    borderTopWidth: 1,
    borderTopColor: '#00000030',
    paddingTop: 8,
  },
  tab: { flex: 1, alignItems: 'center', paddingBottom: 6, paddingHorizontal: 2 },
  icon: { fontSize: 22, opacity: 0.5 },
  iconOn: { opacity: 1 },
  label: { color: theme.textFaint, fontSize: 10, marginTop: 2 },
  labelOn: { color: theme.accent, fontWeight: '700' },
});
