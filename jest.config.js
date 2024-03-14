// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: [
    '<rootDir>/setupJest.js',
  ],
  testEnvironment: "jsdom",
  testPathIgnorePatterns: [
    "<rootDir>/__tests__/test-utils.js",
  ],
  // Ignore Mirador code from jest transforms
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!mirador|@react-dnd|react-dnd|dnd-core|react-dnd-html5-backend|dnd-multi-backend|rdndmb-html5-to-touch)'
  ],
};
