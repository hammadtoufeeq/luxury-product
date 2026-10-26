module.exports = {
  testEnvironment: 'jsdom',
  clearMocks: true,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
  moduleNameMapper: {
    // any import of api/axios(.js) gets the mock instead of the real file
    '^(\\.{1,2}/)+api/axios(\\.js)?$': '<rootDir>/src/__mocks__/axiosMock.cjs',
    // ignore css imports
    '\\.(css|svg|png|jpg)$': '<rootDir>/src/__mocks__/fileMock.cjs',
  },
}