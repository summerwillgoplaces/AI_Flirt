// Shared visual language — a warm "gabi-ng-harana" (serenade night) palette:
// deep violet night sky, mango-sunset accent, sampaguita cream text.
export const theme = {
  bg: '#1B1130',
  bgElevated: '#271843',
  card: '#2F1E52',
  cardAlt: '#3A2566',
  accent: '#FF8A5B', // mango sunset
  accentDeep: '#F25C54',
  gold: '#FFD26F',
  kilig: '#FF6FA5', // pink kilig
  text: '#F6F0FF',
  textDim: '#B9A9D6',
  textFaint: '#7C6BA0',
  bubbleMe: '#FF8A5B',
  bubbleMeText: '#2A1005',
  bubbleKai: '#33224F',
  bubbleKaiText: '#F6F0FF',
  danger: '#F25C54',
  radius: 20,
  radiusSm: 12,
} as const;

export type Theme = typeof theme;
