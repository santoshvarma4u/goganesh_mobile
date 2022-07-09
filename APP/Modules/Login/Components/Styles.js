import {StyleSheet} from 'react-native';
import Colors from '../../../Theams/Colors';
export default StyleSheet.create({
  containerMain: {
    backgroundColor: Colors.appBlackColor,
    flex: 1,
  },
  offersContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  SignINCard: {
    // marginTop: 60,
    width: '90%',
    flexDirection: 'row',
    borderRadius: 10,
  },
  SignInTitle: {
    backgroundColor: 'white',
    padding: 10,
  },
  input: {
    height: 40,
    margin: 12,
    backgroundColor: Colors.appWhiteColor,
    color: 'black',
    borderRadius: 5,
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },
  borderStyleHighLighted: {
    borderColor: Colors.appPrimaryColor,
  },
  sendOtpButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 30,
    padding: 5,
    backgroundColor: Colors.appPrimaryColor,
    color: Colors.appWhiteColor,
    marginRight: 20,
    marginTop: 15,
  },
  underlineStyleBase: {
    width: 50,
    height: 45,
    borderWidth: 2,
    borderBottomWidth: 4,
  },
  nextButton: {
    borderRadius: 10,
    marginTop: 20,
  },
  underlineStyleHighLighted: {
    borderColor: Colors.appPrimaryColor,
  },
  profileContainer: {
    flex: 1,
    flexDirection: 'column',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: 'center',
    padding: 5,
  },
  addBankButton: {
    backgroundColor: '#F194FF',
    borderRadius: 10,
    marginLeft: 'auto',
  },
  profileDetails: {
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
    padding: 15,
    marginTop: 10,
    backgroundColor: Colors.appBlackColor,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  bankCardDetails: {
    backgroundColor: Colors.appBlackColor,
    borderRadius: 10,
    padding: 10,
    marginTop: 40,
  },
  centeredView: {
    width: '100%',
    flex: 1,
    padding: 10,
    top: 200,
  },
  modalView: {
    margin: 20,
    backgroundColor: Colors.appBlackColorLight,
    borderRadius: 20,
    padding: 25,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    marginTop: 15,
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
  },

  modalText: {
    borderRadius: 10,
    backgroundColor: 'white',
    fontSize: 16,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
});
