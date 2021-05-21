import {StyleSheet} from 'react-native';
import Colors from '../../../Theams/Colors';
export default StyleSheet.create({
  containerMain: {
    backgroundColor: Colors.appPrimaryColor,
    flex: 1,
  },
  depositTitile: {
    marginTop: 10,
    marginLeft: 10,
    color: Colors.appWhiteColor,
  },
  phoneNumber: {
    marginLeft: 'auto',
    marginTop: 10,
    color: Colors.appWhiteColor,
    marginRight: 10,
  },
  activeContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  offersContainer: {
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  depositDetailsCard: {
    flex: 0.3,
    marginTop: 20,
    backgroundColor: Colors.appBlackColor,
    width: '90%',
    borderRadius: 10,
  },
  depositDetailsCardForBank: {
    flex: 0.3,
    marginTop: 20,
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
  },
  depostScreenshotCard: {
    flex: 0.4,
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: Colors.appBlackColor,
    width: '90%',
    flexDirection: 'column',
    borderRadius: 10,
  },

  depositTitle: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: 15,
  },
  textStyle: {
    color: Colors.appPrimaryColor,
    fontSize: 16,
  },
  textStyle2: {
    color: Colors.appWhiteColor,
    fontSize: 16,
    marginLeft: 3,
  },
  buttonStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    color: Colors.appPrimaryColor,
  },
  imageStyle: {
    padding: 5,
    width: 150,
    height: 300,
    marginBottom: -15,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
