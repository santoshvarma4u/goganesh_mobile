import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
if (module.hot) {
  module.hot.accept();
}
AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById('app-root'),
});
