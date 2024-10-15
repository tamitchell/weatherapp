const nextJest = require('next/jest');
const createJestConfig = nextJest({
    dir: './',
  });

  const customJestConfig = {
    preset: 'ts-jest',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      // Handle module aliases (this will be automatically configured for you soon)
      '^@/components/(.*)$': '<rootDir>/components/$1',
      '^@/pages/(.*)$': '<rootDir>/pages/$1',
      '^@/hooks/(.*)$': '<rootDir>/hooks/$1',
      '^@/reducers/(.*)$': '<rootDir>/reducers/$1',
      '^@/styles/(.*)$': '<rootDir>/styles/$1',
      '^@/utils/(.*)$': '<rootDir>/utils/$1',
      '^@/types/(.*)$': '<rootDir>/types/$1',
      '^@/context/(.*)$': '<rootDir>/context/$1',
      '^@/data/(.*)$': '<rootDir>/data/$1',
    },
    testMatch: [
        "**/?(*.)+(spec|test).[jt]s?(x)"
      ],
          globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.jest.json',
      },
    },
  }

  module.exports = createJestConfig(customJestConfig)