import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { RIZZ, type RizzLevel } from '../persona/kai';
import { theme } from '../theme';

const ORDER: RizzLevel[] = ['torpe', 'smooth', 'landi'];

export function RizzPicker({
  value,
  onChange,
}: {
  value: RizzLevel;
  onChange: (r: RizzLevel) => void;
}) {
  return (
    <View>
      <Text style={styles.heading}>Rizz Meter</Text>
      <View style={styles.row}>
        {ORDER.map((r) => {
          const active = r === value;
          return (
            <Pressable
              key={r}
              onPress={() => onChange(r)}
              style={[styles.pill, active && styles.pillActive]}
            >
              <Text style={styles.emoji}>{RIZZ[r].emoji}</Text>
              <Text style={[styles.label, active && styles.labelActive]}>{RIZZ[r].label}</Text>
            </Pressable>
          );
        })}
      </View>
      <Text style={styles.tagline}>{RIZZ[value].tagline}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: { color: theme.textDim, fontSize: 12, fontWeight: '700', letterSpacing: 1, marginBottom: 8 },
  row: { flexDirection: 'row', gap: 8 },
  pill: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: theme.radiusSm,
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  pillActive: { backgroundColor: theme.cardAlt, borderColor: theme.accent },
  emoji: { fontSize: 20 },
  label: { color: theme.textDim, fontSize: 13, fontWeight: '600', marginTop: 2 },
  labelActive: { color: theme.text },
  tagline: { color: theme.textFaint, fontSize: 12, marginTop: 8, fontStyle: 'italic' },
});
