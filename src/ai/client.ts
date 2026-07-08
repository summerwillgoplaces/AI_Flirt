import Anthropic from '@anthropic-ai/sdk';
import {
  buildSystemPrompt,
  buildWingmanPrompt,
  buildRoleplayPrompt,
  REPLY_BANK,
  pick,
  type RizzLevel,
} from '../persona/kai';
import type { Scenario } from '../persona/scenarios';

// We always default to the latest, most capable model for the best flirt game.
const MODEL = 'claude-opus-4-8';

export type ChatTurn = { role: 'user' | 'assistant'; content: string };

function makeClient(apiKey: string): Anthropic {
  // dangerouslyAllowBrowser is required for React Native / Expo environments.
  // The key lives only on-device (see storage.ts); this is a personal-use app.
  return new Anthropic({ apiKey, dangerouslyAllowBrowser: true });
}

function firstText(message: Anthropic.Message): string {
  for (const block of message.content) {
    if (block.type === 'text') return block.text.trim();
  }
  return '';
}

// The Anthropic Messages API requires the first message to be role "user".
// Our chat/roleplay histories start with a display-only assistant greeting, so
// drop any leading assistant turns before sending.
function toApiMessages(history: ChatTurn[]): { role: 'user' | 'assistant'; content: string }[] {
  const firstUser = history.findIndex((t) => t.role === 'user');
  const trimmed = firstUser === -1 ? [] : history.slice(firstUser);
  return trimmed.map((t) => ({ role: t.role, content: t.content }));
}

/** Chat with the active persona. Falls back to offline Taglish if no key / error. */
export async function chatWithKai(
  apiKey: string,
  rizz: RizzLevel,
  personaId: string,
  history: ChatTurn[],
): Promise<{ text: string; offline: boolean }> {
  if (!apiKey) {
    return { text: pick(REPLY_BANK[rizz]), offline: true };
  }
  try {
    const client = makeClient(apiKey);
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 400,
      system: buildSystemPrompt(rizz, personaId),
      messages: toApiMessages(history),
    });
    const text = firstText(response);
    return { text: text || pick(REPLY_BANK[rizz]), offline: false };
  } catch (err) {
    console.warn('chatWithKai fell back to offline:', err);
    return { text: pick(REPLY_BANK[rizz]), offline: true };
  }
}

/** Wingman: given the crush's message, suggest 3 flirty Taglish replies. */
export async function suggestReplies(
  apiKey: string,
  rizz: RizzLevel,
  personaId: string,
  theirMessage: string,
): Promise<{ replies: string[]; offline: boolean }> {
  if (!apiKey) {
    return { replies: offlineReplies(rizz), offline: true };
  }
  try {
    const client = makeClient(apiKey);
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 500,
      system: buildWingmanPrompt(rizz, personaId),
      messages: [
        {
          role: 'user',
          content: `They texted me: "${theirMessage}"\n\nSuggest my 3 replies.`,
        },
      ],
    });
    const parsed = parseReplyArray(firstText(response));
    return parsed.length
      ? { replies: parsed.slice(0, 3), offline: false }
      : { replies: offlineReplies(rizz), offline: true };
  } catch (err) {
    console.warn('suggestReplies fell back to offline:', err);
    return { replies: offlineReplies(rizz), offline: true };
  }
}

/** Role-play a practice scenario in-character with the active persona. */
export async function roleplayWithKai(
  apiKey: string,
  rizz: RizzLevel,
  personaId: string,
  scenario: Scenario,
  history: ChatTurn[],
): Promise<{ text: string; offline: boolean }> {
  if (!apiKey) {
    return { text: pick(REPLY_BANK[rizz]), offline: true };
  }
  try {
    const client = makeClient(apiKey);
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 400,
      system: buildRoleplayPrompt(rizz, personaId, scenario),
      messages: toApiMessages(history),
    });
    const text = firstText(response);
    return { text: text || pick(REPLY_BANK[rizz]), offline: false };
  } catch (err) {
    console.warn('roleplayWithKai fell back to offline:', err);
    return { text: pick(REPLY_BANK[rizz]), offline: true };
  }
}

function offlineReplies(rizz: RizzLevel): string[] {
  const bank = [...REPLY_BANK[rizz]];
  const out: string[] = [];
  while (out.length < 3 && bank.length) {
    out.push(bank.splice(Math.floor(Math.random() * bank.length), 1)[0]);
  }
  return out;
}

// Best-effort extraction of a JSON string array from the model's reply.
function parseReplyArray(raw: string): string[] {
  const start = raw.indexOf('[');
  const end = raw.lastIndexOf(']');
  if (start === -1 || end === -1 || end <= start) return [];
  try {
    const arr = JSON.parse(raw.slice(start, end + 1));
    if (Array.isArray(arr)) return arr.filter((x) => typeof x === 'string');
  } catch {
    /* fall through */
  }
  return [];
}
