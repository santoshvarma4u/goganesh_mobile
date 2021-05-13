import {StyleSheet} from 'react-native';
import Colors from '../../../Theams/Colors';
export default StyleSheet.create({
  containerMain: {
    backgroundColor: '#e39b11',
    flex: 1,
  },
  offersContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
    alignItems: 'center',
  },
  SignINCard: {
    marginTop: 20,
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
  },
  SignInTitle: {
    backgroundColor: 'white',
    padding: 10,
  },
  input: {
    height: 50,
    margin: 12,
    borderRadius: 10,
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
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
    borderColor: '#03DAC6',
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
  addBankButton: {
    backgroundColor: '#F194FF',
    borderRadius: 10,
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
    width: '90%',
    borderRadius: 10,
  },
  bankCardDetails: {
    marginTop: 10,
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 10,
  },
  centeredView: {
    width: '100%',
    flex: 1,
    padding: 10,
    top: 200,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#696969',
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
    fontSize: 20,
    marginBottom: 15,
  },
});
