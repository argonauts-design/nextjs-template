import pluginJs from "@eslint/js";
import pluginNext from "@next/eslint-plugin-next";
import parser from "@typescript-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier";
import * as importPlugin from "eslint-plugin-import";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginTailwind from "eslint-plugin-tailwindcss";
import pluginUnicorn from "eslint-plugin-unicorn";
import unusedImportsPlugin from "eslint-plugin-unused-imports";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { languageOptions: { parser, globals: globals.browser } },
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  {
    ignores: [
      // shadcn/ui のコンポーネントは自動生成なので ignore する
      "components/ui/**/*",
      ".next",
      "tailwind.config.js",
      "postcss.config.js",
      "next.config.js",
      ".github",
      "pnpm-lock.yaml",
    ],
  },
  {
    name: "unicorn/recommended",
    plugins: { unicorn: pluginUnicorn },
    rules: pluginUnicorn.configs["flat/recommended"].rules,
  },
  {
    name: "eslint/recommended",
    rules: pluginJs.configs.recommended.rules,
  },
  ...tseslint.configs.recommended,
  {
    // eslint-plugin-import の設定
    plugins: { import: importPlugin },
    rules: {
      "import/order": [
        // import の並び順を設定
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling"],
            "object",
            "type",
            "index",
          ],
          "newlines-between": "always",
          pathGroupsExcludedImportTypes: ["builtin"],
          alphabetize: { order: "asc", caseInsensitive: true },
          pathGroups: [
            {
              pattern: "react",
              group: "external",
              position: "before",
            },
          ],
        },
      ],
    },
  },
  {
    // eslint-plugin-unused-imports の設定
    plugins: { "unused-imports": unusedImportsPlugin },
    rules: {
      "@typescript-eslint/no-unused-vars": "off", // 重複エラーを防ぐため typescript-eslint の方を無効化
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    name: "react/jsx-runtime",
    plugins: { react: pluginReact },
    rules: pluginReact.configs["jsx-runtime"].rules,
    settings: { react: { version: "detect" } },
  },
  {
    name: "react-hooks/recommended",
    plugins: { "react-hooks": pluginReactHooks },
    rules: pluginReactHooks.configs.recommended.rules,
  },
  {
    name: "next/recommended",
    plugins: {
      "@next/next": pluginNext,
    },
    rules: pluginNext.configs.recommended.rules,
  },
  {
    name: "next/core-web-vitals",
    plugins: {
      "@next/next": pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
    },
  },
  {
    name: "tailwind/recommended",
    plugins: { tailwindcss: pluginTailwind },
    rules: pluginTailwind.configs.recommended.rules,
  },
  // project rule
  {
    rules: {
      quotes: ["error", "double"],
      "react/prop-types": "off",
      "react/display-name": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-member-accessibility": "warn",
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react/react-in-jsx-scope": "off",
      eqeqeq: [2, "allow-null"],
      "no-console": [
        "error",
        {
          allow: ["warn", "error"],
        },
      ],
      "unicorn/prevent-abbreviations": "off",
      "unicorn/no-abusive-eslint-disable": "off",
      "unicorn/no-null": "off",
      "unicorn/no-array-reduce": "off",
      "unicorn/text-encoding-identifier-case": "off",
      "unicorn/prefer-export-from": "off",
      "unicorn/filename-case": "off",
      "unicorn/consistent-function-scoping": "off",
      "node/no-unsupported-features/node-builtins": "off",
    },
  },
  {
    name: "prettier/config",
    ...eslintConfigPrettier,
  },
];
