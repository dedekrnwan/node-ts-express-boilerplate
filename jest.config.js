module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleDirectories: ['./src/tests', 'node_modules'],
	moduleFileExtensions: ['spec.ts', 'ts', 'tsx', 'js'],
	modulePathIgnorePatterns: ['dist'],
};
