module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    moduleNameMapper: {
      '\\.(css|less)$': 'identity-obj-proxy'
    },
    transform: {
      '^.+\\.jsx?$': 'babel-jest'
    }
  };
  