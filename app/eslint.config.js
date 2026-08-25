import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  {
    ignores: ["**/static/tabler.js", "dist/**"],
  },
  {
    rules: {
      "no-console": "warn",
      "no-unused-vars": "error",
    },
  },
];
