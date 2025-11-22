import AsyncStorage from '@react-native-async-storage/async-storage';

const DRAFT_KEY = 'REGISTER_DRAFT';

export type Draft = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
};

export async function saveDraft(draft: Draft): Promise<void> {
  try {
    const existing = await loadDraft();
    const updated = { ...existing, ...draft };
    await AsyncStorage.setItem(DRAFT_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('Error saving draft', e);
  }
}

export async function loadDraft(): Promise<Draft | null> {
  try {
    const value = await AsyncStorage.getItem(DRAFT_KEY);
    return value ? (JSON.parse(value) as Draft) : null;
  } catch (e) {
    console.warn('Error loading draft', e);
    return null;
  }
}

export async function clearDraft(): Promise<void> {
  try {
    await AsyncStorage.removeItem(DRAFT_KEY);
  } catch (e) {
    console.warn('Error clearing draft', e);
  }
}
