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
    marginTop: 50,
  },
  profileDetails: {
    padding: 10,
    alignItems: 'center',
    width: '90%',
    borderRadius: 10,
  },
  profileIcon: {
    borderRadius: 100,
    marginTop: -60,
    shadowRadius: 10,
  },
  profileIconInner: {
    backgroundColor: Colors.appWhiteColor,
    borderRadius: 100,
  },
});
