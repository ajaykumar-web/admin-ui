// jest.config.js
module.exports = {
    testEnvironment: 'jsdom',
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest", // Handle JavaScript files with Babel
    },
    moduleNameMapper: {
      "\\.(jpg|jpeg|png|gif|webp|svg)$": "identity-obj-proxy", // Mock image imports
      "\\.(css|scss)$": "identity-obj-proxy", // Mock CSS/SCSS imports
    },
  };
  