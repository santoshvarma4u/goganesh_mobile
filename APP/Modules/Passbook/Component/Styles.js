import {StyleSheet} from 'react-native';
import Colors from '../../../Theams/Colors';

export default StyleSheet.create({
  containerMain: {
    backgroundColor: Colors.appPrimaryColor,
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    width: '100%',
    borderRadius: 20,
    backgroundColor: 'white',
  },
  offersContainer: {
    flex: 1,
    flexDirection: 'column',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: 'black',
    alignItems: 'center',
    padding: 10,
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
  trasactions: {
    backgroundColor: 'orange',
  },
  trasactionsCard: {
    backgroundColor: 'black',
    borderRadius: 10,
    marginBottom: 5,
    padding: 10,
  },
});
