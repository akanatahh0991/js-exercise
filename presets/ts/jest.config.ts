import { JestConfigWithTsJest } from "ts-jest";

// NOTE: jest.config.ts を TypeScript で記述するためには ts-node が必要
export default {
  preset: "ts-jest/presets/js-with-ts-esm",
  // see default value: https://jestjs.io/docs/configuration#testmatch-arraystring
  testMatch: ["**/?(*.)+(test).(cjs|[jt]s?(x))"],
} satisfies JestConfigWithTsJest;
