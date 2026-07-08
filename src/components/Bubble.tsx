import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';

export function Bubble({
  from,
  text,
  onPress,
}: {
  from: 'me' | 'kai';
  text: string;
  onPress?: () => void;
}) {
  const mine = from === 'me';
  const inner = (
    <View style={[styles.bubble, mine ? styles.me : styles.kai]}>
      <Text style={[styles.text, mine ? styles.meText : styles.kaiText]}>{text}</Text>
    </View>
  );
  return (
    <View style={[styles.row, mine ? styles.rowMe : styles.rowKai]}>
      {onPress ? (
        <Pressable onPress={onPress} onLongPress={onPress}>
          {inner}
        </Pressable>
      ) : (
        inner
      )}
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
