import '@testing-library/jest-dom';
import { vi, beforeEach, afterEach } from 'vitest';

function formatConsoleArgs(first, ...rest) {
  if (typeof first !== 'string') {
    return [first, ...rest].map(String).join(' ');
  }
  let i = 0;
  const formatted = first.replace(/%[sdifoO]/g, () => (i < rest.length ? String(rest[i++]) : ''));
  const remaining = rest.slice(i).map(String);
  return remaining.length ? `${formatted}\n${remaining.join(' ')}` : formatted;
}

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
