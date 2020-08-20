module.exports = {
    "extends": ["liaoyf/react-typescript"],
    "parserOptions": {
        "ecmaVersion": 2019,
        "sourceType": "module",
        "ecmaFeatures": true,
        "project": "./tsconfig.json",
        "tsconfigRootDir": __dirname
    },
    ignorePatterns: [
        // @see https://stackoverflow.com/questions/61956555/why-is-typescript-eslint-parser-including-files-outside-of-those-configured-in
        ".eslintrc.js"
    ]
};
