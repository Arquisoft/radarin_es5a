module.exports = {
  projects: ['radarin_es5a'],
  verbose: true,
  resolver: "jest-pnp-resolver",
  preset: 'jest-puppeteer',
  testRegex: '(/feature/.*|(\\.|/)(feature))\\.[jt]sx?$',
  testTimeout: 30000,
  setupFiles: [
    "react-app-polyfill/jsdom"
  ],
  "transform": {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    "^(?!.*\\.(js|jsx|ts|tsx|json)$)": "<rootDir>/config/jest/fileTransform.js"
  },
  "transformIgnorePatterns": [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
    "^.+\\.module\\.(css|sass|scss)$"
  ],
  "moduleNameMapper": {
    "^react-native$": "react-native-web",
    "\\.(css|less|scss|sss|styl)$": "<rootDir>/webapp/node_modules/jest-css-modules",
    "@inrupt/solid-style-guide": "<rootDir>/webapp/node_modules/jest-css-modules"
  }
};