import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Clipboard,
  Linking,
  Pressable,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {Button, List} from 'react-native-paper';
import {env} from '../../../Network/api/server';
import Colors from '../../../Theams/Colors';
import {Typography} from '../../Common/Text';

const AccordianListNew = props => {
  const [expanded, setExpanded] = React.useState(false);
  const navigation = useNavigation();
  const handlePress = () => setExpanded(!expanded);

  function ListTitle() {
    return (
      <View style={styles.ListTitle}>
        <Image
          style={styles.image}
          source={{uri: `${env}${props.data.siteimage}`}}
        />
        <View>
          <Typography style={styles.url}>{props.data.siteurl}</Typography>
          <View style={styles.credIcon}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('https://' + props.data.sd.siteurl);
              }}>
              <Icon name="launch" color="white" size={14} />
            </TouchableOpacity>
          </View>
          <Typography style={styles.siteName}>{props.data.sitename}</Typography>
        </View>
      </View>
    );
  }

  function ListCollapse() {
    return (
      <View style={styles.containerCollapse}>
        <View style={styles.icons}>
          <Icon
            name="sports-cricket"
            style={{marginHorizontal: 8}}
            color="white"
            size={24}
          />
          <Icon
            name="sports-soccer"
            style={{marginHorizontal: 8}}
            color="white"
            size={24}
          />
          <Icon
            name="sports-tennis"
            style={{marginHorizontal: 8}}
            color="white"
            size={24}
          />
          <Icon
            name="casino"
            style={{marginHorizontal: 8}}
            color="white"
            size={24}
          />
          <Icon
            name="style"
            style={{marginHorizontal: 8}}
            color="white"
            size={24}
          />
          <Icon
            name="business"
            style={{marginHorizontal: 8}}
            color="white"
            size={24}
          />
        </View>
        <View style={styles.credsCard}>
          <View style={styles.credsCardHeader}>
            <Typography style={styles.credTitle}>Demo</Typography>
            <View style={styles.credIcon}>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL('https://' + props.data.siteurl);
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
              goganesh
            </Typography>
            <TouchableOpacity
              style={{color: 'white', marginLeft: 15}}
              onPress={() => {
                Clipboard.setString('goganesh');
              }}>
              <Icon name="content-copy" color="white" size={20} />
            </TouchableOpacity>
          </View>
          <View style={styles.credsCardPassword}>
            <Typography style={styles.credTitle}>Demo password</Typography>
            <Typography style={{color: 'white', marginLeft: 'auto'}}>
              123456
            </Typography>
            <TouchableOpacity
              style={{color: 'white', marginLeft: 15}}
              onPress={() => {
                Clipboard.setString('123456');
              }}>
              <Icon name="content-copy" color="white" size={20} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.moneyCard}>
          <View style={styles.moneyCardContentGrid}>
            <View style={styles.moneyRow1}>
              <View style={styles.moneyCardIcon}>
                <Icon
                  name="sports-cricket"
                  color={Colors.appPrimaryColor}
                  size={18}
                />
              </View>
              <Typography style={styles.moneyCardText}>Cricket</Typography>
              <Typography style={styles.moneyCardPrice}>100</Typography>
            </View>

            <View style={styles.moneyRow2}>
              <View style={styles.moneyCardIcon}>
                <Icon
                  name="sports-soccer"
                  color={Colors.appPrimaryColor}
                  size={18}
                />
              </View>
              <Typography style={styles.moneyCardText}>Football</Typography>
              <Typography style={styles.moneyCardPrice}>100</Typography>
            </View>
            <View style={styles.moneyRow3}>
              <View style={styles.moneyCardIcon}>
                <Icon
                  name="sports-tennis"
                  color={Colors.appPrimaryColor}
                  size={18}
                />
              </View>
              <Typography style={styles.moneyCardText}>Tennis</Typography>
              <Typography style={styles.moneyCardPrice}>100</Typography>
            </View>
            <View style={styles.moneyRow3}>
              <View style={styles.moneyCardIcon}>
                <Icon name="casino" color={Colors.appPrimaryColor} size={18} />
              </View>
              <Typography style={styles.moneyCardText}>Live Casino</Typography>
              <Typography style={styles.moneyCardPrice}>100</Typography>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={{
            width: 100,
            margin: 20,
            padding: 8,
            alignItems: 'center',
            backgroundColor: Colors.appPrimaryColor,
            justifyContent: 'center',
            borderRadius: 5,
          }}
          onPress={() => {
            navigation.navigate('CreateID', {
              sdid: props.data.sdid,
              requestStatus: 'new',
            });
          }}>
          <Typography style={{alignItems: 'center'}}>Create ID</Typography>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <List.Section title="Accordions">
      <View style={styles.container}>
        <List.Accordion
          title={<ListTitle />}
          expanded={expanded}
          onPress={handlePress}
          style={{backgroundColor: Colors.appBlackColor, borderRadius: 10}}>
          <ListCollapse />
        </List.Accordion>
      </View>
    </List.Section>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.appBlackColor,
    borderRadius: 10,
    padding: 14,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'black',
    marginRight: 10,
  },
  url: {
    fontWeight: '500',
    marginLeft: 10,
    marginTop: 8,
    color: '#cdbebe',
  },
  siteName: {
    marginLeft: 10,
    marginTop: 10,
    color: '#cdbebe',
  },
  ListTitle: {
    flexDirection: 'row',
  },

  containerCollapse: {
    padding: 10,
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
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
    backgroundColor: 'black',
    width: '100%',
    borderRadius: 5,
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
  moneyCard: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'black',
    width: '100%',
  },
  moneyCardText: {
    color: 'white',
    flexDirection: 'row-reverse',
  },
  moneyCardPrice: {
    color: 'white',
    marginLeft: 'auto',
    right: 0,
  },
  moneyCardIcon: {
    color: 'white',
    marginRight: 10,
  },
  moneyRow1: {
    flexDirection: 'row',
    padding: 5,
  },
  moneyRow2: {
    flexDirection: 'row',
    padding: 5,
  },
  moneyRow3: {
    flexDirection: 'row',
    padding: 5,
  },

  moneyCardContentGrid: {
    padding: 5,
  },
});
export default AccordianListNew;
