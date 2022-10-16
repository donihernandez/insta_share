const nextJest = require('next/jest');
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

const createJestConfig = nextJest({
    dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
    moduleNameMapper: {
        // Handle module aliases (this will be automatically configured for you soon)
        '^@/components/(.*)$': '<rootDir>/components/$1',
        '^@/lib/(.*)$': '<rootDir>/lib/$1',
        '^@/pages/(.*)$': '<rootDir>/pages/$1',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);
