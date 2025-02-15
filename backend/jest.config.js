module.exports = {
  testEnvironment: "node", // Node environment for backend testing
  transform: {
    "^.+\\.ts$": "ts-jest", // If you're using TypeScript, this will transform your .ts files
  },
  testMatch: [
    "**/tests/**/*.test.ts", // Adjust your test folder and naming convention
    "**/?(*.)+(spec|test).ts",
  ],
  moduleFileExtensions: ["ts", "js", "json", "node"], // Add file extensions Jest should recognize
  coverageDirectory: "./coverage", // Directory to store code coverage reports
  collectCoverage: true, // Optionally collect code coverage
};
