import {
  imageLibrary as webImageLibrary,
  camera as webCamera,
} from './platforms/web.js';

export function launchCamera(options, callback) {
  return webCamera(options, callback);
}

export function launchImageLibrary(options, callback) {
  return webImageLibrary(options, callback);
}

const FGImagePicker = {
  launchCamera,
  launchImageLibrary,
};

export default FGImagePicker;
