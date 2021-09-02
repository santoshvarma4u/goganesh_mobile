import {Dimensions, StyleSheet} from 'react-native';
import Colors from '../../../Theams/Colors';

export default StyleSheet.create({
  containerMain: {
    backgroundColor: Colors.appPrimaryColor,
    flex: 1,
  },
  centreCard: {
    backgroundColor: '#171717',
    width: '35%',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.34,
    shadowRadius: 6.1,
    elevation: 10,
  },
  centeredView: {
    width: '100%',
    flex: 1,
    top: 200,
  },
  modalView: {
    margin: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
  },
  image: {
    height: 100,
    width: 100,
  },
  createAnnouncement: {
    flex: 0.2,
    flexDirection: 'column',
    alignItems: 'center',
    width: '80%',
    marginTop: 40,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  tipsText: {
    color: Colors.appPrimaryColor,
  },
  tipsSubText: {
    color: 'white',
    marginVertical: 20,
  },

  createText: {
    marginTop: 20,
    flex: 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    paddingVertical: 15,
    justifyContent: 'center',
    backgroundColor: '#343232',
  },
  promotionCard: {
    flex: 1.5,
    flexDirection: 'column',
    marginTop: 20,
    width: '90%',
    borderRadius: 10,
  },
  text: {
    marginTop: 20,
    marginBottom: 10,
    color: 'white',
  },
  createTextOnly: {
    color: 'black',
    marginHorizontal: 10,
  },
  myids: {
    color: 'white',
    marginLeft: 10,
    fontSize: 15,
    marginRight: 'auto',
  },
  centralCardView: {
    flex: 1,
    backgroundColor: 'black',
    width: '50%',
    height: '70%',
    flexDirection: 'row',
    marginHorizontal: 45,
    borderRadius: 20,
  },
  depositCard: {
    flex: 0.35,
    flexDirection: 'column',
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    alignItems: 'center',
    backgroundColor: '#444444',
    padding: 10,
    height: '60%',
    shadowColor: '#000000',
    shadowOpacity: 0.34,
    shadowRadius: 6.1,
    elevation: 10,
  },
  blankCard: {
    flex: 0.4,
    backgroundColor: 'white',
  },
  withdrawCard: {
    flex: 0.35,
    flexDirection: 'column',
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    backgroundColor: '#444444',
    height: '60%',
    padding: 10,
    shadowColor: '#000000',
    shadowOpacity: 0.34,
    shadowRadius: 6.1,
    elevation: 10,
  },
  upperContainer: {
    backgroundColor: Colors.appPrimaryColor,
    // flex: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    marginBottom: 30,
  },
  lowerContainer: {
    backgroundColor: 'black',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    // flex: 0.8,
    alignItems: 'center',
  },
  lowerBox1: {
    flex: 0.4,
    flexDirection: 'column',
    marginTop: 50,
    width: '80%',
    overflow: 'hidden',
    borderRadius: 10,
  },
  carouselCards: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'green',
  },
  buttonClose: {
    marginLeft: 'auto',
  },
  modalText: {
    borderRadius: 5,
    backgroundColor: 'white',
    fontSize: 20,
    height: 50,
    marginBottom: 5,
  },
  notetext: {
    borderRadius: 5,
    backgroundColor: 'white',
    fontSize: 14,
    marginBottom: 10,
  },
  dropdownStyle: {
    borderRadius: 10,
    marginVertical: 20,
    width: Dimensions.get('window').width - 120,
  },
  listContainer: {
    backgroundColor: Colors.appBlackColor,
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 10,
    flexDirection: 'row',
    minHeight: 30,
    alignItems: 'center',
    padding: 10,
    borderTopRightRadius: 5,
  },
});
