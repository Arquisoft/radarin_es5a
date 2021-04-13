// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    collectCoverage: true,

    collectCoverageFrom: [
        "src/**/*.{js,jsx,ts,tsx}",
        "!src/hocs/*.js",
        "!src/hooks/*.js",
        "!src/layouts/**/*.js",
        "!src/**/*.d.ts",
        "!src/**/index.js",
        "!src/**/serviceWorker.js",
        "!src/**/setupTests.js",
        "!src/**/*.lite.js",
    ],

    coverageDirectory: "coverage",

    moduleFileExtensions: [
        "web.js",
        "js",
        "web.ts",
        "ts",
        "web.tsx",
        "tsx",
        "json",
        "web.jsx",
        "jsx",
        "node"
    ],

    moduleNameMapper: {
        "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules",
        // fix bug with solid style guide
        "@inrupt/solid-style-guide": "<rootDir>/node_modules/jest-css-modules"
    },

    "resolver": "jest-pnp-resolver",

    setupFiles: [
        "react-app-polyfill/jsdom"
    ],

    "setupFilesAfterEnv": [
        './node_modules/jest-enzyme/lib/index.js'
    ],

    testEnvironment: "jsdom",

    testPathIgnorePatterns: [
        "\\\\node_modules\\\\",
        "\\\\scripts\\\\",
        "/scripts/"
    ],

    "transform": {
        "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
        "^(?!.*\\.(js|jsx|ts|tsx|json)$)": "<rootDir>/config/jest/fileTransform.js"
    },

    transformIgnorePatterns: [
        "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
        "\\\\node_modules\\\\",
    ],
};