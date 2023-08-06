import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const metrics = {
  borderRadius: 20,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  marginHorizontal: 10,
};

export default metrics;
