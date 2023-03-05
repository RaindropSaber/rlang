import type { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  preset: "ts-jest",
  testMatch: ["**/*.test.[jt]s?(x)"],
};
// '**/?(*.)+(spec|test).[jt]s?(x)';
export default jestConfig;
