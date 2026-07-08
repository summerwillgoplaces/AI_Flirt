# 💘 AI Flirt — Kai, your Pinoy flirting kabarkada

A cross-platform **flirt AI texting assistant** that runs on **both Android and Apple**
from a single codebase (Expo / React Native + TypeScript). The twist: the AI persona,
**Kai**, texts like a Filipino — natural **Taglish**, *hugot*, pick-up lines, and all the
*kilig*, always with respeto. 🇵🇭

> _"Ikaw ba si WiFi? Kasi kahit saan ako, ikaw pa rin hinahanap ng puso ko."_ 🥺

---

## ✨ Features

| Tab | What it does |
| --- | --- |
| 💬 **Kai** | Chat directly with your Filipino flirt companion. Practice, banter, or just get your daily dose of kilig. |
| 🪽 **Wingman** | Paste what your crush texted you → get **3 ready-to-send Taglish replies** to choose from. |
| 💘 **Hugot** | Endless generator of Filipino **pick-up lines** and **hugot** lines. Tap for more. |
| ⚙️ **Settings** | Set the **Rizz Meter** and (optionally) your Claude API key. |

### 🎚️ The Rizz Meter
Dial the flirt intensity — every reply adapts to it:
- 🙈 **Torpe** — shy & sweet, mahiyain pa
- 😏 **Smooth** — confident charmer, may lakas ng loob
- 🔥 **Landi** — bold & extra, sagad ang lambing

---

## 🧠 How the AI works

Kai is powered by **Claude (`claude-opus-4-8`)** via the official `@anthropic-ai/sdk`.
The Filipino personality lives in [`src/persona/kai.ts`](src/persona/kai.ts) — a system
prompt that teaches Kai to code-switch Taglish, use terms of endearment (*beh, mahal,
crush, langga*), drop *hugot*, and keep everything wholesome and consent-friendly.

**No API key? No problem.** The app ships with a rich built-in Taglish phrase engine,
so every feature works offline in "charm mode" — great for trying it out instantly.
Add a key in Settings to unlock smart, context-aware replies.

---

## 🚀 Run it

```bash
npm install
npm start          # opens Expo Dev Tools
```

Then:
- **iPhone / Android** — install **Expo Go**, scan the QR code. Same code, both ecosystems. 📱
- `npm run ios` / `npm run android` — open in a simulator/emulator
- `npm run web` — quick preview in the browser

> Requires Node 18+. No native build needed to try it — Expo Go handles both platforms.

### 📦 Ship to the stores
This is a standard Expo app, so a production build is:
```bash
npx eas build -p ios        # App Store
npx eas build -p android    # Google Play
```

---

## 🗂️ Project structure

```
App.tsx                    # root: tab navigation + shared state
src/
├─ persona/kai.ts          # 💗 Kai's personality, rizz levels & Taglish banks
├─ ai/client.ts            # Claude calls + offline fallback
├─ storage.ts              # on-device settings (API key, rizz)
├─ theme.ts                # "gabi-ng-harana" color palette
├─ components/             # Bubble, RizzPicker, TabBar
└─ screens/                # Chat, Wingman, Hugot, Settings
```

---

## 🔒 Notes on safety & privacy
- Your Claude API key is stored **only on your device** (AsyncStorage) and is sent
  solely in the direct HTTPS call to Anthropic.
- Kai is built to flirt **kindly**: playful and spicy, never vulgar, never coercive,
  and it won't help with deception or love-scams. Flirting is fun and mutual. 💛

---

_Made with 💗 — flirt kindly, laging may respeto._
