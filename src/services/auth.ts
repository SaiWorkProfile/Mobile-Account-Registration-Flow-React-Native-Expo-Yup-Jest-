import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DRAFT_KEY = 'REGISTER_DRAFT';

export type StoredUser = {
  email: string;
  password: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
};

// ---------------- STORE CREDENTIALS ----------------
export async function storeCredentials(user: StoredUser) {
  await SecureStore.setItemAsync('APP_EMAIL', user.email);
  await SecureStore.setItemAsync('APP_PASSWORD', user.password);
  await SecureStore.setItemAsync('APP_FIRSTNAME', user.firstName ?? '');
  await SecureStore.setItemAsync('APP_LASTNAME', user.lastName ?? '');
  await SecureStore.setItemAsync('APP_PHONE', user.phone ?? '');
}

// ---------------- LOAD CREDENTIALS ----------------
export async function loadCredentials(): Promise<StoredUser | null> {
  const email = await SecureStore.getItemAsync('APP_EMAIL');
  const password = await SecureStore.getItemAsync('APP_PASSWORD');

  if (!email || !password) return null;

  const firstName = await SecureStore.getItemAsync('APP_FIRSTNAME');
  const lastName = await SecureStore.getItemAsync('APP_LASTNAME');
  const phone = await SecureStore.getItemAsync('APP_PHONE');

  return {
    email,
    password,
    firstName: firstName || null,
    lastName: lastName || null,
    phone: phone || null,
  };
}

// ---------------- CLEAR CREDENTIALS ----------------
export async function clearCredentials() {
  await SecureStore.deleteItemAsync('APP_EMAIL');
  await SecureStore.deleteItemAsync('APP_PASSWORD');
  await SecureStore.deleteItemAsync('APP_FIRSTNAME');
  await SecureStore.deleteItemAsync('APP_LASTNAME');
  await SecureStore.deleteItemAsync('APP_PHONE');
}

// ---------------- DRAFT SAVE / LOAD ----------------
type Draft = {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
};

export async function saveDraft(draft: Draft): Promise<void> {
  try {
    await AsyncStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } catch (e) {
    console.warn('Error saving draft', e);
  }
}

export async function loadDraft(): Promise<Draft | null> {
  try {
    const value = await AsyncStorage.getItem(DRAFT_KEY);
    return value ? JSON.parse(value) : null;
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
