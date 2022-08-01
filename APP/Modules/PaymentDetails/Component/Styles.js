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
    marginTop: 20,
    width: '100%',
    borderRadius: 10,
  },
  bankDetailsView: {
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  bankCardDetails: {
    margin: 10,
    backgroundColor: Colors.appBlackColorLight,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  centeredView: {
    width: '100%',
    flex: 1,
  },
  modalView: {
    backgroundColor: Colors.appBlackColor,
    borderRadius: 20,
    paddingTop: 30,
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
  cardTextStyle: {
    color: Colors.appWhiteColor,
  },
  cardItem: {
    justifyContent: 'space-between',
    padding: 2,
    color: Colors.appWhiteColor,
  },
  trasactionsCard: {
    backgroundColor: Colors.appBlackColorLight,
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
    shadowColor: Colors.appWhiteColor,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 3.84,
    elevation: 8,
    margin: 20,
    flex: 1,
  },

  modalText: {
    borderRadius: 10,
    color: Colors.appWhiteColor,
    fontSize: 15,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
