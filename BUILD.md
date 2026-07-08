# 📦 Build a permanent Android app (APK) — no computer needed after install

This produces a real, standalone **`.apk`** you download straight to your Android phone
and tap to install. No app store, no dev server, no computer needed once it's on.

The build runs in **Expo's cloud (EAS)** under **your** free Expo account — that's why
you run these commands (they need your login). It takes ~10–20 minutes.

---

## One-time setup

1. **Create a free Expo account** (if you don't have one): https://expo.dev/signup
2. On any computer with Node installed, get the project and the EAS CLI:
   ```bash
   git clone https://github.com/summerwillgoplaces/AI_Flirt.git
   cd AI_Flirt
   npm install
   npm install -g eas-cli
   ```
3. Log in and link the project to your account:
   ```bash
   eas login          # your Expo email + password
   eas init           # creates the project on your account; writes its ID into app.json
   ```
   `eas init` fills in `extra.eas.projectId` in `app.json`. Commit that if you want to
   keep it, or just leave it — it's tied to your account.

---

## Build the APK

```bash
eas build --platform android --profile preview
```

- The `preview` profile is pre-configured in `eas.json` to output an **APK** (installable
  directly), not an AAB (which is Play-Store-only).
- EAS uploads the project, builds in the cloud, and when done prints a **download URL**
  (also visible at https://expo.dev under your project → Builds).

---

## Install on your phone

1. On your **Android phone**, open the build's download URL (email it to yourself, or
   scan the QR EAS shows).
2. Download the `.apk` and tap it.
3. Android will ask to **allow installing from this source** — allow it, then **Install**.
4. Open **AI Flirt — Kai**. 🎭 Done — it lives on your phone now.

---

## Notes

- **Works offline out of the box** — Kai flirts using the built-in Taglish engine with no
  setup. To unlock smart, context-aware replies, open **Settings** in the app and paste a
  Claude API key (from https://console.anthropic.com/settings/keys). The key is stored
  only on your device.
- **Updating the app later:** re-run `eas build ... --profile preview` and install the new
  APK. (For over-the-air updates without rebuilding, ask and I'll wire up **EAS Update**.)
- **iPhone:** a standalone iOS install needs a paid Apple Developer account ($99/yr) and
  `eas build --platform ios`. Ask and I'll set up the iOS profile + walk you through it.
