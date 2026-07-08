import Anthropic from '@anthropic-ai/sdk';
import {
  buildSystemPrompt,
  buildWingmanPrompt,
  REPLY_BANK,
  pick,
  type RizzLevel,
} from '../persona/kai';

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

/** Chat with Kai. Falls back to an offline Taglish reply if no key / on error. */
export async function chatWithKai(
  apiKey: string,
  rizz: RizzLevel,
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
      system: buildSystemPrompt(rizz),
      messages: history.map((t) => ({ role: t.role, content: t.content })),
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
      system: buildWingmanPrompt(rizz),
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
