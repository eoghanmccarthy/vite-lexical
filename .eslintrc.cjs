module.exports = {
  root: true,
  extends: ["@eoghanmccarthy"],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  plugins: ["react-refresh"],
  rules: {
    'unused-imports/no-unused-imports': 1,
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
};
