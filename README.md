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
| 💬 **Chat** | Text directly with your chosen flirt coach. Practice, banter, or just get your daily dose of kilig. |
| 🪽 **Wingman** | Paste what your crush texted you → get **3 ready-to-send Taglish replies** to choose from. |
| 🎭 **Roleplay** | **Rehearse real situations** — the opening line, left-on-seen, asking her out, the *tita test*, LDR lambing, making up. Your coach plays the scene and drops tips. |
| 💘 **Hugot** | Endless generator of Filipino **pick-up lines** and **hugot** lines. Tap for more. |
| ⚙️ **Settings** | Pick your **personality**, set the **Rizz Meter**, and (optionally) add your Claude API key. |

### 🎭 Personalities — pick your flirt coach
Seven distinct coaches, each varying across **age**, **aggressiveness** (1–5), and **attitude** — every one built to make *you* more magnetic:
- 💗 **Kai** — the warm, witty all-rounder (the OG)
- 🧸 **Biboy** — shy softie, kilig sa simple
- 😜 **Kokoy** — funny Gen-Z softboi, banter king
- 🤵 **Raf** — smooth gentleman, tita-approved
- 💼 **Tinay** — witty achiever, green flag with a punchline
- 🎸 **Lakan** — poetic harana romantic
- 🔥 **Andrea** — bold, confident charmer

The chosen personality shapes **every** feature — Chat, Wingman, and Roleplay.

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
Even offline, each personality uses its **own flavored lines**, so Andrea still sounds
bold and Biboy still sounds shy. Add a key in Settings to unlock smart, context-aware
replies.

**Tap to copy.** In Wingman, tap a suggested reply to copy it to your clipboard — ready
to paste into your real chat. In Roleplay, tap any coach line to steal it.

---

## 🚀 Run it

```bash
npm install
npm run trial      # = expo start --tunnel — scan the QR with Expo Go, any network
```

Then:
- **iPhone / Android** — install **Expo Go**, scan the QR code. Same code, both ecosystems. 📱
- `npm start` — LAN mode (faster if phone + computer share Wi-Fi)
- `npm run ios` / `npm run android` — open in a simulator/emulator
- `npm run web` — quick preview in the browser

> Requires Node 18+. No native build needed to try it — Expo Go handles both platforms.
> First launch shows a friendly welcome and works **offline with zero setup**.

**👉 Just want to try it? See [TRIAL.md](TRIAL.md)** for the easiest paths (incl. a
tap-to-install Android APK for testers).

### 📦 Permanent install (no computer needed after)
Want a real standalone app on your phone instead of the Expo Go preview? Build an
installable **Android APK** in Expo's cloud — full step-by-step in **[BUILD.md](BUILD.md)**:
```bash
npm install -g eas-cli
eas login && eas init
eas build --platform android --profile preview   # → download the .apk, tap to install
```
The `preview` profile (see `eas.json`) outputs a sideloadable APK. iOS standalone builds
need a paid Apple Developer account — see BUILD.md.

---

## 🗂️ Project structure

```
App.tsx                    # root: tab navigation + shared state
src/
├─ persona/
│  ├─ kai.ts               # 💗 persona-driven prompts, rizz levels & Taglish banks
│  ├─ personalities.ts     # 🎭 the 7-coach roster (age / aggressiveness / attitude)
│  └─ scenarios.ts         # 🎬 role-play practice scenarios
├─ ai/client.ts            # Claude calls (chat / wingman / roleplay) + offline fallback
├─ storage.ts              # on-device settings (API key, rizz, persona)
├─ theme.ts                # "gabi-ng-harana" color palette
├─ components/             # Bubble, RizzPicker, PersonaPicker, TabBar
└─ screens/                # Chat, Wingman, Roleplay, Hugot, Settings
```

---

## 🔒 Notes on safety & privacy
- Your Claude API key is stored **only on your device** (AsyncStorage) and is sent
  solely in the direct HTTPS call to Anthropic.
- Kai is built to flirt **kindly**: playful and spicy, never vulgar, never coercive,
  and it won't help with deception or love-scams. Flirting is fun and mutual. 💛

---

_Made with 💗 — flirt kindly, laging may respeto._
