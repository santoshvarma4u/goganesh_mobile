import {useNavigation} from '@react-navigation/native';
import {BottomSheet, Icon} from '@rneui/themed';
import * as React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Clipboard,
  Linking,
} from 'react-native';
import {Button, IconButton} from 'react-native-paper';
// import {List} from 'react-native-paper';
import Colors from '../../../Theams/Colors';
import {Typography} from '../../Common/Text';

const AccordianListNew = props => {
  // const [expanded, setExpanded] = React.useState(false);
  const navigation = useNavigation();
  // const handlePress = () => setExpanded(!expanded);
  const [isVisible, setIsVisible] = React.useState(false);

  function ListTitle() {
    return (
      <View style={styles.ListTitle}>
        <View style={styles.image}>
          <Image
            style={styles.image}
            source={{uri: props.data.siteimage}}
            resizeMode="contain"
          />
        </View>
        <View>
          <Typography style={styles.siteName}>{props.data.sitename}</Typography>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(props.data.siteurl);
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
            <Typography
              variant="caption"
              style={{
                ...styles.url,
                textDecorationLine: 'underline',
                textAlign: 'left',
              }}>
              {props.data?.siteurl?.substring(0, props.data?.siteurl?.length)}
            </Typography>
            <Icon
              name="launch"
              color="white"
              size={16}
              style={{
                marginLeft: 5,
              }}
            />
          </TouchableOpacity>
          <Button
            compact
            mode="contained"
            uppercase={false}
            labelStyle={{
              fontSize: 12,
              fontWeight: '600',
            }}
            style={{
              marginLeft: 10,
              marginTop: 10,
              width: 100,
            }}
            onPress={() => {
              navigation.navigate('CreateID', {
                sdid: props.data.sdid,
                requestStatus: 'new',
              });
            }}>
            Create ID
          </Button>
        </View>
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
    <View style={styles.container}>
      <ListTitle />
      <View
        style={{
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}>
        <IconButton
          size={30}
          onPress={() => setIsVisible(true)}
          icon={'arrow-right-circle'}
          color={Colors.appWhiteColor}
        />
        {/* <Button
          compact
          mode="contained"
          uppercase={false}
          style={{
            marginLeft: 10,
          }}
          onPress={() => {
            navigation.navigate('CreateID', {
              sdid: props.data.sdid,
              requestStatus: 'new',
            });
          }}>
          Create ID
        </Button> */}
      </View>
      <BottomSheet
        isVisible={isVisible}
        containerStyle={{backgroundColor: 'rgba(0.5, 0.25, 0, 0.8)'}}
        onBackButtonPress={() => setIsVisible(false)}
        onBackdropPress={() => setIsVisible(false)}>
        <ListCollapse />
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.appBlackColorLight,
    borderRadius: 10,
    padding: 14,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  image: {
    width: 60,
    height: 60,
    backgroundColor: Colors.appBlackColor,
    overflow: 'hidden',
    borderRadius: 10,
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
  },
  containerCollapse: {
    padding: 10,
    width: '100%',
    backgroundColor: Colors.appBlackColor,
    alignItems: 'center',
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

export default AccordianListNew;
