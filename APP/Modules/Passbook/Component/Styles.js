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
    // marginHorizontal: 20,
    width: '100%',
    borderRadius: 20,
  },
  offersContainer: {
    flex: 1,
    flexDirection: 'column',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: Colors.appBlackColor,
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
    backgroundColor: Colors.appBlackColorLight,
    borderRadius: 20,
    marginBottom: 5,
    paddingVertical: 25,
    flexDirection: 'row',
    width: '100%',
  },
  centeredView: {
    width: '100%',
    flex: 0.5,
    padding: 10,
    top: 180,
  },
  modalView: {
    margin: 20,
    backgroundColor: Colors.appPrimaryColor,
    borderRadius: 10,
    padding: 15,
  },
  modalText: {
    marginBottom: 10,
  },
});
