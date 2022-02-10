module.exports = {
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
};
