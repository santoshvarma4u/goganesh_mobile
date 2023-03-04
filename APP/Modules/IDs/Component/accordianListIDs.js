import {useNavigation} from '@react-navigation/native';
import {BottomSheet, Icon} from '@rneui/themed';
import * as React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Clipboard,
  Linking,
  Pressable,
} from 'react-native';
import {Button} from 'react-native-paper';
// import {List} from 'react-native-paper';
import Colors from '../../../Theams/Colors';
import {removeHttpOrWww} from '../../../Utils';
import FGImage from '../../Common/FGImage';
import {Typography} from '../../Common/Text';

const AccordionListNew = props => {
  // const [expanded, setExpanded] = React.useState(false);
  const navigation = useNavigation();
  // const handlePress = () => setExpanded(!expanded);
  const [isVisible, setIsVisible] = React.useState(false);

  function ListTitle() {
    return (
      <View style={styles.ListTitle}>
        <View style={styles.image}>
          <FGImage
            style={styles.image}
            source={{uri: props.data.siteimage}}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            flex: 1,
          }}>
          <Pressable
            onPress={() => {
              Linking.openURL(props.data.siteurl);
            }}>
            <Typography variant="H4" style={styles.siteName}>
              {props.data.sitename}
            </Typography>
          </Pressable>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
            <Typography
              variant="caption"
              style={{
                ...styles.url,
                textAlign: 'left',
              }}>
              {removeHttpOrWww(props.data.siteurl)}
            </Typography>
          </View>
        </View>
        <Pressable
          style={{
            width: 100,
            height: 22,
            backgroundColor: Colors.appPrimaryColor,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
          }}
          onPress={() => {
            navigation.navigate('CreateID', {
              sdid: props.data.sdid,
              requestStatus: 'new',
              url: props.data.siteurl,
              sitename: props.data.sitename,
              siteimage: props.data.siteimage,
            });
          }}>
          <Typography variant="H4">Create</Typography>
        </Pressable>
      </View>
    );
  }

  function ListCollapse() {
    return (
      <View style={styles.containerCollapse}>
        <View style={styles.credsCard}>
          <View style={styles.credsCardHeader}>
            <Typography style={styles.credTitle}>Demo</Typography>
            <View style={styles.credIcon}>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(props.data.siteurl);
                }}>
                <Icon name="launch" color="white" size={20} />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#424040',
              marginVertical: 5,
            }}
          />
          <View style={styles.credsCardID}>
            <Typography style={styles.credTitle}>Demo Id</Typography>
            <Typography style={{color: 'white', marginLeft: 'auto'}}>
              {props.data.demoid}
            </Typography>
            <TouchableOpacity
              style={{color: 'white', marginLeft: 15}}
              onPress={() => {
                Clipboard.setString(props.data.demoid);
              }}>
              <Icon name="content-copy" color="white" size={20} />
            </TouchableOpacity>
          </View>
          <View style={styles.credsCardPassword}>
            <Typography style={styles.credTitle}>Demo password</Typography>
            <Typography style={{color: 'white', marginLeft: 'auto'}}>
              {props.data.demopassword}
            </Typography>
            <TouchableOpacity
              style={{color: 'white', marginLeft: 15}}
              onPress={() => {
                Clipboard.setString(props.data.demopassword);
              }}>
              <Icon name="content-copy" color="white" size={20} />
            </TouchableOpacity>
          </View>
        </View>
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate('CreateID', {
              sdid: props.data.sdid,
              requestStatus: 'new',
              sitename: props.data.sitename,
              siteimage: props.data.siteimage,
              url: props.data.siteurl,
            });
          }}>
          Create ID
        </Button>
        <Button
          onPress={() => {
            setIsVisible(false);
          }}>
          Cancel
        </Button>
      </View>
    );
  }

  return (
    <TouchableOpacity
      onPress={() => setIsVisible(true)}
      style={styles.container}>
      <ListTitle />
      <BottomSheet
        isVisible={isVisible}
        containerStyle={{backgroundColor: 'rgba(0.5, 0.25, 0, 0.8)'}}
        onBackButtonPress={() => setIsVisible(false)}
        onBackdropPress={() => setIsVisible(false)}>
        <ListCollapse />
      </BottomSheet>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.appBlackColorLight,
    borderRadius: 8,
    padding: 8,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  image: {
    width: 50,
    height: 50,
    backgroundColor: Colors.appBlackColor,
    overflow: 'hidden',
    borderRadius: 30,
  },
  url: {
    marginLeft: 10,
    color: Colors.appWhiteColor,
  },
  siteName: {
    marginLeft: 10,
    color: Colors.appWhiteColor,
  },
  ListTitle: {
    flexDirection: 'row',
    flex: 1,
    margin: 2,
    alignItems: 'center',
  },
  containerCollapse: {
    padding: 10,
    width: '100%',
    backgroundColor: Colors.appBlackColor,
    alignItems: 'center',
    borderTopColor: Colors.appWhiteColor + '50',
    borderTopWidth: 0.5,
  },
  icons: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  credsCardHeader: {
    flexDirection: 'row',
    padding: 5,
  },
  credsCard: {
    marginTop: 10,
    padding: 10,
    backgroundColor: Colors.appBlackColor,
    borderRadius: 30,
    width: '100%',
  },
  credIcon: {
    marginLeft: 'auto',
  },
  credTitle: {
    color: 'white',
  },
  credsCardID: {
    padding: 5,
    flexDirection: 'row',
  },
  credsCardPassword: {
    padding: 5,
    flexDirection: 'row',
  },
});

export default AccordionListNew;
