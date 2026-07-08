import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';

export function Bubble({ from, text }: { from: 'me' | 'kai'; text: string }) {
  const mine = from === 'me';
  return (
    <View style={[styles.row, mine ? styles.rowMe : styles.rowKai]}>
      <View style={[styles.bubble, mine ? styles.me : styles.kai]}>
        <Text style={[styles.text, mine ? styles.meText : styles.kaiText]}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', marginVertical: 4, paddingHorizontal: 12 },
  rowMe: { justifyContent: 'flex-end' },
  rowKai: { justifyContent: 'flex-start' },
  bubble: { maxWidth: '82%', paddingVertical: 10, paddingHorizontal: 14, borderRadius: theme.radius },
  me: { backgroundColor: theme.bubbleMe, borderBottomRightRadius: 6 },
  kai: { backgroundColor: theme.bubbleKai, borderBottomLeftRadius: 6 },
  text: { fontSize: 16, lineHeight: 22 },
  meText: { color: theme.bubbleMeText },
  kaiText: { color: theme.bubbleKaiText },
});
