import '@testing-library/jest-dom';
import { vi, beforeEach, afterEach } from 'vitest';

// Mirador bundles its own copy of react-i18next, so mocking 'react-i18next' directly
// won't prevent NO_I18NEXT_INSTANCE warnings when useTranslation is imported from 'mirador'.
vi.mock('mirador', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useTranslation: () => ({
      t: (key) => key,
      i18n: { changeLanguage: () => Promise.resolve() },
    }),
  };
});

let consoleErrorSpy;
let consoleErrors = [];

beforeEach(() => {
  consoleErrors = [];
  const originalError = console.error;
  consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation((...args) => {
    originalError(...args);
    consoleErrors.push(formatConsoleArgs(...args));
  });
});

afterEach(() => {
  consoleErrorSpy?.mockRestore();
  if (consoleErrors.length > 0) {
    throw new Error(`Unexpected console.error:\n${consoleErrors.join('\n')}`);
  }
});
