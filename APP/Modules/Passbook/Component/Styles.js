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
    backgroundColor: Colors.backgroundColor,
  },
  offersContainer: {
    flex: 1,
    flexDirection: 'column',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: 'black',
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
    marginVertical: 10,
    color: 'white',
  },
  trasactions: {
    backgroundColor: 'orange',
  },
  trasactionsCard: {
    backgroundColor: Colors.appBlackColor,
    borderRadius: 10,
    marginBottom: 5,
    paddingVertical: 25,
    flexDirection:'row'
  },
});
