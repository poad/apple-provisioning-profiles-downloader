module.exports = {
  testEnvironment: 'node',
  // globals: {
  //   'ts-jest': {
  //     tsconfig: 'tsconfig-test.json',
  //     // useESM: true,
  //   }
  // },
  // extensionsToTreatAsEsm: ['.ts'],
  clearMocks: true,
  moduleFileExtensions: ['js', 'ts'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc-node/jest',
      {
        sourceMaps: true,

        module: {
          type: "commonjs",
        },

        jsc: {
          parser: {
            syntax: "typescript",
          },

          transform: {
            react: {
              runtime: "automatic",
            },
          },
        },
      }
    ]
  },
  moduleNameMapper: {
  },
  transformIgnorePatterns: [
    'node_modules/(?!aggregate-error|clean-stack|escape-string-regexp|indent-string|p-map)',
  ],
  moduleDirectories: ["js", ".", "node_modules"],
  verbose: true
}