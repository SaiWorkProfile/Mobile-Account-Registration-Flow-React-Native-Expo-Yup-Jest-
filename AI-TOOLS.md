
---

# 4 — `AI-TOOLS.md` (explain AI usage)
```md
# AI-TOOLS.md

## Purpose
Document AI tools used in the project, why they were used, and how.

## Tools used
- **ChatGPT (OpenAI)** — used to speed up development: scaffolding screens, debugging TypeScript errors, generating ESLint/Prettier config, producing unit tests, and writing documentation.

## Selection criteria
- Speed, quality of TypeScript/React Native code generation, and ability to produce iterative fixes.

## How AI was used (concrete)
- Generated full `RegisterScreen`, `LoginScreen`, `HomeScreen` implementations.
- Created `auth.ts` (expo-secure-store) and `draftStorage.ts` (AsyncStorage).
- Fixed ESLint setup and recommended `.eslintrc.cjs`.
- Generated unit tests and jest config.
- Wrote README, PROMPTS.md, and AI-TOOLS.md.

## Prompts / reproducibility
See `PROMPTS.md` for the exact prompts used.

## Privacy & safety
- No production user data was sent to any external AI service; all sensitive data handling was implemented locally.
