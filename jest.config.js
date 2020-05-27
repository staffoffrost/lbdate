module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsConfig: './spec/tsconfig.json'
    }
  },
  moduleNameMapper: {
    "^lbdate$": "<rootDir>/src",
    "^module-provider$": "<rootDir>/spec/module-provider.ts",
  },
  testRegex: [
    '/spec/.*\\.spec.ts$'
  ],
  modulePathIgnorePatterns: [
    '<rootDir>/build/'
  ],
  reporters: [
    "default",
    [
      "./node_modules/jest-html-reporter",
      {
        pageTitle: "Test Report",
        // theme: "darkTheme",
        styleOverridePath: './darkTheme.css',
        outputPath: "./spec/test-results-output/test-report.html",
        includeFailureMsg: true,
        includeConsoleLog: true,
        sort: "status"
      }
    ]
  ]
}
