module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    parserOptions: {
        sourceType: "module",
        ecmaVersion: 2020,
        ecmaFeatures: {
            impliedStrict: true
        }
    },
    plugins: ["@typescript-eslint"],
    extends: ["plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
    ignorePatterns: ["node_modules", "dist"],
    overrides: [
        {
            files: ["**/*.spec.ts"],
            rules: {
                // Some chai assertions trigger this rule (e.g `expect(x).to.be.true`)
                "@typescript-eslint/no-unused-expressions": "off"
            }
        }
    ]
};
