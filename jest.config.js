module.exports = {
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig-test.json'
    }
  },
  extensionsToTreatAsEsm: ['.ts'],
  clearMocks: true,
  moduleFileExtensions: ['js', 'ts'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  verbose: true
}