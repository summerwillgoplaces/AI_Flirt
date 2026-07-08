import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { PERSONALITIES } from '../persona/personalities';
import { theme } from '../theme';

// Renders a "heat" meter for the aggressiveness axis, e.g. 🔥🔥🔥○○
function Heat({ level }: { level: number }) {
  return (
    <Text style={styles.heat}>
      {'🔥'.repeat(level)}
      <Text style={styles.heatOff}>{'·'.repeat(5 - level)}</Text>
    </Text>
  );
}

export function PersonaPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <View>
      <Text style={styles.heading}>Choose your flirt coach</Text>
      {PERSONALITIES.map((p) => {
        const active = p.id === value;
        return (
          <Pressable
            key={p.id}
            onPress={() => onChange(p.id)}
            style={[styles.card, active && styles.cardActive]}
          >
            <Text style={styles.emoji}>{p.emoji}</Text>
            <View style={styles.body}>
              <View style={styles.topRow}>
                <Text style={[styles.name, active && styles.nameActive]}>{p.name}</Text>
                <Text style={styles.age}>{p.ageVibe}</Text>
              </View>
              <Text style={styles.attitude}>
                {p.attitude} · <Heat level={p.aggressiveness} />
              </Text>
              <Text style={styles.blurb}>{p.blurb}</Text>
            </View>
            {active && <Text style={styles.check}>✓</Text>}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: { color: theme.textDim, fontSize: 12, fontWeight: '700', letterSpacing: 1, marginBottom: 10 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.card,
    borderRadius: theme.radiusSm,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  cardActive: { backgroundColor: theme.cardAlt, borderColor: theme.kilig },
  emoji: { fontSize: 30, marginRight: 12 },
  body: { flex: 1 },
  topRow: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' },
  name: { color: theme.textDim, fontSize: 16, fontWeight: '700' },
  nameActive: { color: theme.text },
  age: { color: theme.textFaint, fontSize: 11 },
  attitude: { color: theme.gold, fontSize: 12, fontWeight: '600', marginTop: 2 },
  heat: { fontSize: 11 },
  heatOff: { color: theme.textFaint },
  blurb: { color: theme.textDim, fontSize: 12, marginTop: 4, lineHeight: 17 },
  check: { color: theme.kilig, fontSize: 20, fontWeight: '800', marginLeft: 8 },
});
