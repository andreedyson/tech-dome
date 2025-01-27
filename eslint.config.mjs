import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = {
  rules: {
    "react/react-in-jsx-scope": "error",
    "next/no-img-element": "warn",
    "typescript/no-unused-vars": "error",
    ...compat.extends("next/core-web-vitals", "next/typescript"),
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
};

export default eslintConfig;
