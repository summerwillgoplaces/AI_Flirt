// ─────────────────────────────────────────────────────────────────────────────
// ROLE-PLAY scenarios. The user rehearses real flirting situations with the active
// personality — who plays the scene AND drops light coaching. Wholesome practice
// for genuine connection, never manipulation.
// ─────────────────────────────────────────────────────────────────────────────

export interface Scenario {
  id: string;
  title: string;
  emoji: string;
  setup: string; // the situation
  goal: string; // what the user is practicing toward
  instruction: string; // how the persona should coach / role-play the scene
}

export const SCENARIOS: Scenario[] = [
  {
    id: 'the-opening-line',
    title: 'The Opening Line',
    emoji: '💬',
    setup: "May bagong match ka. Blank pa ang chat box at nakatingin sa'yo ang cursor. First impression na 'to.",
    goal: 'Mag-send ng opener na tapat, may personality, at magbibigay ng dahilan para mag-reply — hindi lang "hi".',
    instruction:
      'Role-play as the match receiving the user\'s opener. React honestly and in-character to ' +
      'what they actually send — reward specific, playful, sincere openers with warmth and a ' +
      'real reply, and gently let generic "hi/hello" fall flat so they feel the difference. ' +
      'After each attempt, coach in Taglish: point out one thing that worked and suggest one ' +
      'tweak, and nudge them to reference something real about the person instead of a canned line.',
  },
  {
    id: 'left-on-seen',
    title: 'Iniwan sa Seen',
    emoji: '👀',
    setup: 'Na-seen ka. Two days na. Ang labo, pero gusto mo pa ring subukan — nang hindi mukhang desperate o galit.',
    goal: 'Mag-recover nang cool, light, at wala sa ego — magbukas ng pinto ulit nang hindi nanunumbat.',
    instruction:
      'Role-play as the person who left them on seen, initially a bit distant, and let your ' +
      'warmth depend on their approach. Reward light, low-pressure, guilt-free re-openers and ' +
      'pull back if they get clingy, sulky, or accusatory. Coach in Taglish that dignity is ' +
      'attractive: one good message, no double-triple texting, and never guilt-trip — kung hindi ' +
      'umusad, okay lang, marami pang ibang tao.',
  },
  {
    id: 'asking-her-out',
    title: 'The Ask',
    emoji: '☕',
    setup: 'Ilang araw na kayong nag-uusap at maganda ang vibe. Panahon na para mag-alok ng totoong date.',
    goal: 'Mag-ask out nang tiyak at confident: may plano, may araw, at may madaling paraan para tumanggi kung ayaw.',
    instruction:
      'Role-play as the crush deciding whether to say yes, responding to how clearly and ' +
      "confidently they ask. Reward a specific plan ('coffee this Saturday, 4pm?') and a " +
      "respectful out ('no pressure ha'), and act unsure when the ask is vague or wishy-washy. " +
      'Coach in Taglish to be brave and concrete, to make it easy to say yes AND easy to say no.',
  },
  {
    id: 'the-tita-test',
    title: 'The Tita Test',
    emoji: '🍽️',
    setup: "Family gathering. Ang final boss: ang mga tita na may tanong na 'anong plano mo sa buhay?'",
    goal: 'Mapa-good impression sa pamilya — magalang, may sense of humor, at hindi mukhang nagpapa-impress lang.',
    instruction:
      "Play a warm-but-testing Filipino tita firing classic questions ('taga-saan ka?', 'may " +
      "trabaho ka na ba?', 'simbahan ba kayo?') with a twinkle in her eye. Reward respect " +
      '(po/opo), genuine warmth, and light humor that doesn\'t try too hard; tease back if ' +
      'they\'re stiff or over-eager. Coach in Taglish that winning the family is about being ' +
      'real, respectful, and secure — hindi pagsisinungaling para pumasa.',
  },
  {
    id: 'long-distance-lambing',
    title: 'LDR Lambing',
    emoji: '🌏',
    setup: 'Magkalayo kayo ng oras at lugar. Pagod siya, medyo tahimik ngayong gabi.',
    goal: 'Magpadama ng lambing at presence sa text lang — pagaanin ang araw niya nang walang guilt.',
    instruction:
      "Role-play as the long-distance partner who's tired and a little quiet tonight. Respond " +
      'warmly to gestures that show real care — good-morning/good-night rituals, asking about ' +
      "their day, small 'sana katabi kita' sweetness — and feel smothered by jealousy or " +
      'guilt-trips about the distance. Coach in Taglish that lambing across distance is about ' +
      'consistency and reassurance, not pressure.',
  },
  {
    id: 'making-up',
    title: 'Bati Tayo',
    emoji: '🫶',
    setup: 'May maliit na away — na-miss mo ang plans, may na-misinterpret sa text. Tampo mode siya.',
    goal: 'Mag-ayos nang tapat: aminin ang mali, kilalanin ang nararamdaman niya, at ibalik ang init nang walang drama.',
    instruction:
      "Role-play as the partner who's a bit hurt (tampo) but open to making up. Soften " +
      "genuinely when the user takes accountability, validates the feeling ('naiintindihan ko " +
      "kung bakit ka na-off'), and offers a real fix — and stay guarded if they get defensive " +
      "or fake-apologize to end it fast. Coach in Taglish that making up is about listening " +
      "first, a sincere sorry (not 'sorry na, tama na'), and gentle warmth to reconnect.",
  },
];
