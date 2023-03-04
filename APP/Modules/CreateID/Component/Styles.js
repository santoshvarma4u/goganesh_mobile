import {Dimensions, StyleSheet} from 'react-native';
import Colors from '../../../Theams/Colors';
export default StyleSheet.create({
  container: {
    paddingBottom: 40,
    backgroundColor: Colors.appBlackColor,
  },
  containerMain: {
    backgroundColor: Colors.appPrimaryColor,
    flex: 1,
    height: Dimensions.get('window').height,
  },
  createIDContainer: {
    flex: 1,
    flexDirection: 'column',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: Colors.appBlackColor,
    alignItems: 'center',
  },
  planCards: {
    flex: 0.4,
    marginTop: 20,
    padding: 5,
    backgroundColor: 'black',
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 10,
    display: 'none',
  },
  planDetails: {
    backgroundColor: Colors.appBlackColor,
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 30,
    width: '94%',
  },
  topIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageIcon: {
    height: 150,
    width: 150,
    borderColor: Colors.appBlackColor,
    borderWidth: 0.5,
    borderRadius: 35,
  },
  bronzeCard: {
    flex: 0.33,
    backgroundColor: Colors.appBlackColor,
    padding: 10,
    borderRadius: 10,
    height: '100%',
    margin: 8,
    alignItems: 'center',
    width: 20,
  },
  goldCard: {
    flex: 0.33,
    backgroundColor: Colors.appBlackColor,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    height: '100%',
    margin: 8,
    width: 20,
  },
  silverCard: {
    flex: 0.33,
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    height: '100%',
    backgroundColor: Colors.appBlackColor,
    margin: 8,
    width: 20,
  },
  modalText: {
    borderRadius: 10,
    backgroundColor: Colors.appBlackColor,
    fontSize: 14,
    color: Colors.appWhiteColor,
    marginBottom: 5,
    marginTop: 10,
  },
  planDetailsText: {
    color: Colors.appWhiteColor,
    marginLeft: 'auto',
    padding: 5,
  },

  hexagon: {
    width: 50,
    height: 25,
    marginTop: 20,
  },
  hexagonInner: {
    width: 45,
    height: 25,
    backgroundColor: 'red',
  },
  hexagonAfter: {
    position: 'absolute',
    bottom: -12,
    left: 0,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 22,
    borderLeftColor: 'transparent',
    borderRightWidth: 22,
    borderRightColor: 'transparent',
    borderTopWidth: 12,
    borderTopColor: 'red',
  },
  hexagonBefore: {
    position: 'absolute',
    top: -12,
    left: 0,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 22,
    borderLeftColor: 'transparent',
    borderRightWidth: 22,
    borderRightColor: 'transparent',
    borderBottomWidth: 12,
    borderBottomColor: 'red',
  },
  inputCustomBox: {
    backgroundColor: Colors.appBlackColorLight,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 10,
    fontSize: 16,
  },
});
