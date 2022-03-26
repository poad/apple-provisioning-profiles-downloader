module.exports = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  clearMocks: true,
  extensionsToTreatAsEsm: ['.ts'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  testMatch: ['**/tests/*.test.ts'],
  transform: {
    // '^.+\\.ts$': 'ts-jest',
    "^.+\\.(t|j)sx?$": ["@swc/jest", {
      "jsc": {
        "parser": {
          "syntax": "typescript",
          "tsx": false,
          "decorators": true,
          "dynamicImport": true
        },
        "minify": {
          "compress": {
            "unused": true
          },
          "mangle": true
        },
        "target": "es2021",
        "transform": {
          "optimizer": {
            "jsonify": {
              "minCost": 0
            }
          }
        }
      },
      "minify": true,
      "sourceMaps": true,
      "module": {
        "type": "es6",
        "strict": true,
        "strictMode": true,
        "lazy": false,
        "noInterop": false
      }
    }]
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
