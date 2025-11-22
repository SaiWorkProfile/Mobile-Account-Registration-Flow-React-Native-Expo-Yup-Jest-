# PROMPTS.md

## Example prompts used (copy/paste to re-run)

1. Scaffold an Expo React Native TypeScript app with Register, Login, Home screens. Use Expo SecureStore for credentials and AsyncStorage for drafts. Use react-hook-form and yup for validation.

2. Implement RegisterScreen: react-hook-form, save draft to AsyncStorage, store credentials to SecureStore (email, password, firstName, lastName, phone), navigate to Login after register.

3. Implement LoginScreen: load credentials from SecureStore, validate, navigate to Home.

4. Implement HomeScreen: read stored user and display profile with logout (clear SecureStore).

5. Create auth service to wrap expo-secure-store: storeCredentials(user), loadCredentials(), clearCredentials().

6. Generate unit tests for validation functions and for auth service (mock expo-secure-store).

7. Create ESLint + Prettier config for React Native + TypeScript that uses `.eslintrc.cjs`.

(Adjust with exact wording you used during your session.)
