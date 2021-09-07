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
    backgroundColor: 'black',
    alignItems: 'center',
    padding: 5,
  },
  bankAccountDetails: {},
  addBankButton: {
    backgroundColor: Colors.appPrimaryColor,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  profileDetails: {
    flex: 0.15,
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
  },
  profileIcon: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 100,
  },
  bankDetails: {
    flex: 0.75,
    padding: 15,
    marginTop: 20,
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 10,
  },
  bankDetailsView: {
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  bankCardDetails: {
    marginTop: 10,
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 10,
    width: '100%',
    flexDirection: 'row',
  },
  centeredView: {
    width: '100%',
    flex: 1,
  },
  modalView: {
    margin: 20,
    backgroundColor: Colors.appBlackColor,
    borderRadius: 20,
    padding: 20,
    flex: 1,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: Colors.appPrimaryColor,
  },
  buttonClose: {
    marginLeft: 'auto',
  },
  textStyle: {
    color: Colors.appBlackColor,
  },
  trasactionsCard: {
    backgroundColor: Colors.appBlackColor,
    padding: 10,
    borderRadius: 10,
  },

  modalText: {
    borderRadius: 10,
    color: Colors.appWhiteColor,
    fontSize: 15,
    // marginBottom: 15,
  },
});
