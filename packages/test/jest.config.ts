import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  extensionsToTreatAsEsm: ['.ts'],
  testMatch: ['**/*.test.[jt]s?(x)'],
  transform: {
    '^.+\\.ts?$': [
      'ts-jest',
      {
        tsconfig: false,
      },
    ],
  },
  // transformIgnorePatterns: [],
  // transformIgnorePatterns: ['/node_modules/(?!rlang-node-receiver)'],
};
export default jestConfig;
