import {StyleSheet} from 'react-native';
import Colors from '../../../Theams/Colors';

export default StyleSheet.create({
  containerMain: {
    backgroundColor: Colors.appPrimaryColor,
    flex: 1,
  },
  profileContainer: {
    flex: 1,
    flexDirection: 'column',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: Colors.appBlackColor,
    alignItems: 'center',
    padding: 5,
  },
  profileDetails: {
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: Colors.appBlackColorLight,
    width: '90%',
    borderRadius: 10,
  },
  profileIcon: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 100,
  },
});
