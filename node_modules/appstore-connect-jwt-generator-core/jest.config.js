module.exports = {
    preset: "ts-jest",
    clearMocks: true,
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    testMatch: ['**/tests/*.test.ts'],
    // testRunner: 'jest-circus/runner',
    transform: {
      '^.+\\.ts$': 'ts-jest'
    },
    modulePaths: [
      "<rootDir>/dist",
      "<rootDir>/node_modules"
    ],
    globals: {
      "ts-jest": {
        tsconfig: "tsconfig.json"
      }
    },
    verbose: true
  }
  