# 📋 Project Summary — AI Flirt / "Kai"

A cross-platform **flirt AI texting assistant** with a Filipino twist: the AI coach
**Kai** texts in natural Taglish. Built from an empty repo to a verified, installable app.

- **Repo:** `summerwillgoplaces/AI_Flirt` · **Branch:** `claude/jarvis-availability-check-jrs6jd`
- **Stack:** Expo (React Native) + TypeScript — one codebase for **iOS + Android**
- **AI:** Claude `claude-opus-4-8` via `@anthropic-ai/sdk`, with a full offline fallback
- **Size:** 17 TS/TSX files, ~1,700 LOC

---

## What we built

### 1. The core app (iOS + Android)
- Five tabs: **Chat**, **Wingman**, **Roleplay**, **Hugot**, **Settings**.
- **Chat** — text directly with your flirt coach.
- **Wingman** — paste your crush's message → 3 ready-to-send Taglish replies (tap to copy).
- **Roleplay** — rehearse 6 real situations (opening line, left-on-seen, the ask, the
  *tita test*, LDR lambing, making up); the coach plays the scene and drops tips.
- **Hugot** — endless Filipino pick-up & hugot line generator.
- **Rizz Meter** — Torpe / Smooth / Landi live intensity control.

### 2. Personalities (age × aggressiveness × attitude)
Seven pickable coaches, each with a distinct voice that reshapes Chat, Wingman & Roleplay:
Kai (all-rounder), Biboy (shy softie), Kokoy (Gen-Z softboi), Raf (gentleman),
Tinay (witty achiever), Lakan (harana poet), Andrea (bold charmer).

### 3. Genuine-charm design (not manipulation)
Every persona and scenario is built to make the *user* more authentically charming.
Hard guardrails baked into the prompts: wholesome, consensual, no manipulation, no
coercion, no "guaranteed to make anyone fall for you" tricks.

### 4. Works with or without an API key
- **Offline "charm mode":** persona-flavored Taglish lines — each coach still sounds
  like themselves with no key.
- **Smart mode:** add a Claude key in Settings for context-aware replies. Key stored
  on-device only.

### 5. Shipping paths
- **Quick try:** Expo Go + `npx expo start` (README).
- **Permanent Android APK:** EAS cloud build, `preview` profile (BUILD.md).

---

## Architecture

```
App.tsx                     # tabs + shared state (apiKey, rizz, personaId)
src/
├─ persona/
│  ├─ kai.ts                # persona-driven system prompts (chat/wingman/roleplay)
│  ├─ personalities.ts      # 7-coach roster + offline lines
│  └─ scenarios.ts          # role-play scenarios
├─ ai/client.ts             # Claude calls + offline fallback + first-message guard
├─ storage.ts               # on-device settings
├─ components/              # Bubble, RizzPicker, PersonaPicker, TabBar
└─ screens/                 # Chat, Wingman, Roleplay, Hugot, Settings
```

---

## Verification (every feature)
- `tsc --noEmit` — clean on every change.
- Metro iOS bundle (`expo export`) — succeeds (~624 modules).
- Independent code review each feature — caught & fixed a real bug (leading `assistant`
  message → API 400 → silent offline fallback) plus a JSX escaping nit.

---

## How it was built (process)
A standing directive ("bring the whole team") is recorded in `CLAUDE.md`. Substantive
features were built with a subagent crew — an **Architect** (plan), a **Persona Writer**
(content), and a **Reviewer** (correctness) — each equipped with context and guardrails,
and each run closed with an honest subagent scorecard. Small config tasks were done solo.

---

## Commit history
| Commit | What |
|---|---|
| `83d0368` | Base app — Kai, 4 tabs, offline engine, Claude wiring |
| `c9ce7e7` | Core memory: standing team directive |
| `c8d4c32` | Core memory: equip agents + scorecard mandate |
| `bb03ad0` | Personalities + role-play mode |
| `267fad4` | Persona-flavored offline lines + clipboard copy |
| `43abb0e` | EAS config for permanent Android APK builds |

---

## Roadmap (not yet built)
App icon + splash · persistent chat history · share-to-Messenger · iOS EAS profile ·
EAS Update (OTA) · real clipboard toasts everywhere.
