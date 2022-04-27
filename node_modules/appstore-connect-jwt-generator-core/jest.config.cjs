module.exports = {
  testEnvironment: 'node',
  clearMocks: true,
  extensionsToTreatAsEsm: ['.ts'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  testMatch: ['**/tests/*.test.ts'],
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest'
  },
  modulePaths: [
    "<rootDir>/dist",
    "<rootDir>/node_modules"
  ],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
      useESM: true,
    }
  },
  moduleNameMapper: {
  },
  transformIgnorePatterns: [
    'node_modules/(?!aggregate-error|clean-stack|escape-string-regexp|indent-string|p-map)',
  ],
  moduleDirectories: ["js", ".", "node_modules"],
  verbose: true
}
