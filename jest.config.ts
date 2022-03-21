export default {
  verbose: true, // show test status
  preset: "ts-jest", // use ts compiler
  clearMocks: true,
  forceExit: true,
  resetMocks: true,
  restoreMocks: true,
  modulePathIgnorePatterns: ["/config"],
};
