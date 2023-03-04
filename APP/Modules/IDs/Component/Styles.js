import {StyleSheet} from 'react-native';
import Colors from '../../../Theams/Colors';
export default StyleSheet.create({
  containerMain: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.appBlackColor,
  },
  searchBar: {
    marginBottom: 8,
    padding: 0,
    borderRadius: 30,
  },
  searchInput: {
    backgroundColor: Colors.appBlackColorLight,
    borderRadius: 10,
    padding: 0,
    paddingLeft: 10,
    height: 40,
  },
  searchInputStyle: {
    color: Colors.appWhiteColor,
    fontSize: 14,
  },
  list: {
    padding: 5,
  },
});
