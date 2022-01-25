module.exports = {
    root: true,
    env: {
        node: true,
        es2021: true,
        jest: true
    },
    globals: {
        page: true,
        browser: true,
        context: true,
        jestPuppeteer: true
    },
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "security", "prettier"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:security/recommended"
    ],
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "@typescript-eslint/explicit-function-return-type": ["error"],
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/explicit-member-accessibility": ["error"],
        indent: "off",
        "@typescript-eslint/indent": [
            "error",
            4,
            {
                SwitchCase: 1
            }
        ],
        semi: 2,
        quotes: [
            2,
            "double",
            {
                avoidEscape: true,
                allowTemplateLiterals: true
            }
        ],
        "no-trailing-spaces": "error",
        "no-case-declarations": "off",
        "prefer-template": "error",
        "eol-last": "error",
        "no-undef": 1,
        "no-prototype-builtins": 1,
        "prettier/prettier": ["error"]
    },
    ignorePatterns: ["**/*.ejs"]
};
