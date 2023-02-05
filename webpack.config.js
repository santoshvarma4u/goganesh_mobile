const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const appDirectory = path.resolve(__dirname);

const compileNodeModules = [
  // Add every react-native package that needs compiling
  // 'react-native-gesture-handler',
].map(moduleName => path.resolve(appDirectory, `node_modules/${moduleName}`));

const babelLoaderConfiguration = {
  test: /\.(js|jsx)$/,
  exclude:
    /node_modules\/(?!(react-native-elements|react-native-vector-icons|react-native-ratings|react-native-reanimated)\/).*/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(__dirname, 'index.web.js'), // Entry to your application
    path.resolve(__dirname, 'App.web.js'), // Change this to your main App file
    path.resolve(__dirname, 'src'),
    path.resolve(__dirname, 'APP'),
    path.resolve(__dirname, 'node_modules'),
    path.resolve(__dirname, 'node_modules/@rneui/base'),
    path.resolve(__dirname, 'node_modules/@rneui/themed'),
    path.resolve(__dirname, 'node_modules/react-native-vector-icons'),
    path.resolve(__dirname, 'node_modules/react-native-ratings'),
    path.resolve(appDirectory, 'node_modules/react-native-uncompiled'),
    ...compileNodeModules,
  ],
  use: {
    loader: 'babel-loader',
    options: {
      babelrc: false,
      configFile: false,
      presets: [
        ['@babel/preset-env', {useBuiltIns: 'usage'}],
        '@babel/preset-react',
        '@babel/preset-flow',
        '@babel/preset-typescript',
        'module:metro-react-native-babel-preset',
        {
          plugins: ['@babel/plugin-proposal-class-properties'],
        },
      ],
      plugins: [
        'react-native-web',
        // 'react-native-reanimated/plugin',
        // 'babel-plugin-react-native-web',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-object-rest-spread',
      ],
    },
  },
};

const svgLoaderConfiguration = {
  test: /\.svg$/,
  use: [
    {
      loader: '@svgr/webpack',
    },
  ],
};

const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
    },
  },
};

const webViewRule = {
  test: /postMock.html$/,
  use: {
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
    },
  },
};

const fontLoader = {
  test: /\.ttf$/,
  loader: 'url-loader', // or directly file-loader
  include: path.resolve(__dirname, 'node_modules/react-native-vector-icons'),
};

const cssLoaderConfiguration = {
  test: /\.css$/i,
  use: ['style-loader', 'css-loader'],
};

module.exports = {
  entry: [
    // load any web API polyfills
    'babel-polyfill',
    path.resolve(__dirname, 'index.web.js'),
  ],
  output: {
    path: path.resolve(appDirectory, 'dist'),
    publicPath: '/',
    filename: 'fgpunt.bundle.js',
  },
  resolve: {
    extensions: [
      '.web.tsx',
      '.web.ts',
      '.tsx',
      '.ts',
      '.web.js',
      '.js',
      '.jsx',
    ],
    alias: {
      'react-native$': 'react-native-web',
      'react-native-webview': 'react-native-web-webview',
      // 'lodash-es': 'lodash',
      // // objectSpread2.js
      // objectSpread2$: path.resolve(
      //   __dirname,
      //   './node_modules/@babel/runtime/helpers/objectSpread2.js	',
      // ),
    },
  },
  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration,
      svgLoaderConfiguration,
      webViewRule,
      fontLoader,
      cssLoaderConfiguration,
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
    }),
    new webpack.EnvironmentPlugin({JEST_WORKER_ID: null}),
    new webpack.DefinePlugin({process: {env: {}}}),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      // See: https://github.com/necolas/react-native-web/issues/349
      __DEV__: JSON.stringify(true),
    }),
  ],
};
