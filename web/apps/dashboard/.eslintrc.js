/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@arm-stabilizer/eslint-config/next.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
