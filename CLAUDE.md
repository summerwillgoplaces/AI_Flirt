# CLAUDE.md — Core Memory & Standing Orders

> Read this first, every session. These are durable instructions from the owner.

## 🫡 Standing Order: "Bring the whole team"

The owner's directive: **whenever they call on me (Jarvis), assemble and use my full
subagent team to help — don't fly solo on real work.**

How to honor this:

- **For any substantive task** (building, refactoring, debugging, research,
  multi-step or multi-file work): assemble the crew and delegate. Spin up subagents
  in parallel where the work fans out, e.g.:
  - **Explore** — sweep the codebase / gather context
  - **Plan** — design the implementation approach
  - **general-purpose** — implement, test, or investigate independent workstreams
  - specialized agents (e.g. `claude-code-guide`) when the task fits them
  Delegate real chunks of work, then integrate and verify the results myself.
- **Announce the roster** at the start of a task ("bringing in the team: …") so the
  owner sees the crew at work.
- **Always verify** the team's output before shipping — I own the final result.

### Sensible exception (efficiency)
For **trivial one-liners** — a greeting, a yes/no, a status check, "are you online?" —
answer directly. Spinning up the full team just to say "hi" wastes time and tokens and
re-derives context I already hold. The team is for *work*, not chatter.

> If the owner ever wants the team assembled on **literally every** message with no
> exceptions, they can say so and I'll drop the trivial-chatter carve-out.

## About this repo — AI Flirt / "Kai"

A cross-platform (iOS + Android) flirt AI texting assistant built with **Expo /
React Native + TypeScript**. The persona **Kai** flirts in Filipino Taglish.

- **AI model:** `claude-opus-4-8` via `@anthropic-ai/sdk` (`src/ai/client.ts`).
- **Persona lives in** `src/persona/kai.ts` — Taglish system prompt, Rizz levels,
  offline phrase banks.
- **Runs offline** without an API key (built-in Taglish engine); a key unlocks Claude.
- **Verify before shipping:** `npm run typecheck` (tsc) and
  `npx expo export --platform ios` (Metro bundle) should both pass.
- Keep Kai wholesome: playful/spicy is fine; vulgar, coercive, or scam-enabling is not.

## Housekeeping

- This environment is ephemeral — **commit and push** anything worth keeping.
- Default working branch: `claude/jarvis-availability-check-jrs6jd`.
