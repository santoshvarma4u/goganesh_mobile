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
    backgroundColor: Colors.appBlackColor,
    alignItems: 'center',
  },
  depositDetailsCard: {
    borderRadius: 10,
    backgroundColor: Colors.appBlackColorLight,
    padding: 10,
  },
  depositDetailsCardForBank: {
    marginTop: 20,
    backgroundColor: Colors.backgroundColor,
    width: '90%',
    borderRadius: 10,
  },
  depostScreenshotCard: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: Colors.appBlackColor,
    width: '90%',
    flexDirection: 'column',
    borderRadius: 10,
    elevation: 10,
    shadowColor: Colors.appWhiteColor,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
  },
  depositTitle: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 8,
    paddingHorizontal: 10,
  },
  textStyleButton: {
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
    marginTop: 15,
    color: Colors.appPrimaryColor,
  },
  imageStyle: {
    padding: 5,
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
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
    shadowColor: Colors.backgroundColor,
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
