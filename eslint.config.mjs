import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import prettier from "eslint-plugin-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Configuración base (eslint:recommended)
  js.configs.recommended,

  // Configuración para React
  {
    files: ["**/*.{js,jsx,mjs,cjs}"],
    plugins: {
      react,
      prettier,
    },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.jest,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...prettier.configs.recommended.rules,
    },
  },

  // Configuración específica para CommonJS
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
    },
  },
]);
