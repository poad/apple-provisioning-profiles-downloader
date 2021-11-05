module.exports = {
  clearMocks: true,
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  testMatch: ['**/tests/*.test.ts'],
  transform: {
    '^.+\\.ts$': ['ts-jest']
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
