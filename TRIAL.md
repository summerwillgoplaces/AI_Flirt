# ▶️ Try Kai in 2 minutes

Kai works instantly — **no sign-up, no API key, no payment** to try. Pick the way that
suits you.

---

## 🟢 Easiest for a tester: install the APK (Android)
The friendliest trial for someone who just wants the app: hand them a link, they tap,
it's installed. No Expo Go, no dev server, no computer.

1. You (once) build the APK — see **[BUILD.md](BUILD.md)** (`eas build … --profile preview`).
2. Share the download link EAS gives you.
3. Tester opens it on their Android phone → **Download → tap → Install**. Done.

> First launch shows a friendly welcome and works offline immediately.

---

## 📱 Try over Wi-Fi with Expo Go (iPhone or Android)
No build needed — great while you're developing.

1. Install **Expo Go** (App Store / Play Store).
2. On a computer with the project:
   ```bash
   npm install
   npm run trial          # = expo start --tunnel  (works across any network)
   ```
3. Scan the QR that appears with **Expo Go** (Android) or the **Camera** app (iPhone).

> `npm start` (LAN) is faster if the phone and computer share the same Wi-Fi;
> `npm run trial` (tunnel) works anywhere but is a bit slower to load.

---

## What a trial user experiences
- A one-screen **welcome** explaining the app (skippable in one tap).
- **Everything works with zero setup** — chat, wingman, roleplay, hugot — using the
  built-in Taglish engine.
- Optional: add a Claude API key in **Settings** for smarter, context-aware replies.
  (Purely optional; the key stays on the device.)
