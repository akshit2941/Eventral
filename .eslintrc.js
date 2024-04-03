module.exports = {
    root: true,
    env: {
        node: true,
        browser: true,
        es6: true,
    },
    extends: ["eslint:recommended", "plugin:react/recommended"],
    plugins: ["react"],
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },
    globals: {
        doc: "readonly",
        setDoc: "readonly",
    },
    rules: {
        // Your ESLint rules here
    },
};
