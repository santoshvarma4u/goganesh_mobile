import {StyleSheet} from 'react-native';
import Colors from '../../../Theams/Colors';
export default StyleSheet.create({
  containerMain: {
    backgroundColor: Colors.appPrimaryColor,
    flex: 1,
  },

  offersContainer: {
    flex: 1,
    flexDirection: 'column',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  offersCard: {
    flex: 0.25,
    marginTop: 20,
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
  },
  topOffers: {
    backgroundColor: 'white',
    padding: 10,
  },
});
