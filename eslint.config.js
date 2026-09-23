const {defineConfig, globalIgnores} = require("eslint/config");

const tsParser = require("@typescript-eslint/parser");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const js = require("@eslint/js");

const {FlatCompat} = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = defineConfig([
    {
        languageOptions: {
            parser: tsParser,
            sourceType: "module",
            ecmaVersion: 2020,

            parserOptions: {
                ecmaFeatures: {
                    impliedStrict: true
                }
            }
        },

        plugins: {
            "@typescript-eslint": typescriptEslint
        },

        extends: compat.extends("plugin:@typescript-eslint/recommended", "plugin:prettier/recommended")
    },
    globalIgnores(["**/node_modules", "**/dist"]),
    {
        files: ["**/*.spec.ts"],

        rules: {
            "@typescript-eslint/no-unused-expressions": "off"
        }
    }
]);
