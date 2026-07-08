import AsyncStorage from '@react-native-async-storage/async-storage';
import type { RizzLevel } from './persona/kai';
import { DEFAULT_PERSONA_ID } from './persona/personalities';

// Lightweight persisted settings. The API key is stored on-device only — it never
// leaves the phone except in the direct HTTPS call to Anthropic.
const KEY_API = 'aiflirt.apiKey';
const KEY_RIZZ = 'aiflirt.rizz';
const KEY_PERSONA = 'aiflirt.persona';

export async function getApiKey(): Promise<string> {
  return (await AsyncStorage.getItem(KEY_API)) ?? '';
}

export async function setApiKey(value: string): Promise<void> {
  await AsyncStorage.setItem(KEY_API, value.trim());
}

export async function getRizz(): Promise<RizzLevel> {
  const v = (await AsyncStorage.getItem(KEY_RIZZ)) as RizzLevel | null;
  return v ?? 'smooth';
}

export async function setRizz(value: RizzLevel): Promise<void> {
  await AsyncStorage.setItem(KEY_RIZZ, value);
}

export async function getPersonaId(): Promise<string> {
  return (await AsyncStorage.getItem(KEY_PERSONA)) ?? DEFAULT_PERSONA_ID;
}

export async function setPersonaId(value: string): Promise<void> {
  await AsyncStorage.setItem(KEY_PERSONA, value);
}
