module.exports = {
  root: true,
  plugins: ['react-native', 'import'],
  extends: '@react-native-community',
  rules: {
    'react-native/no-unused-styles': 1,
    // 'react-native/split-platform-components': 2,
    // 'react-native/no-inline-styles': 2,
    // 'react-native/no-color-literals': 2,
    // 'react-native/no-raw-text': 1,
    'react-native/no-single-element-style-arrays': 2,
    'import/no-unresolved': 'error',
    'import/named': 'error',
    'import/namespace': 'error',
    'import/default': 'error',
    'import/export': 'error',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
        alphabetize: {
          order: 'asc',
        },
      },
    ],
  },
  settings: {
    'import/ignore': ['react-native'],
  },
};
