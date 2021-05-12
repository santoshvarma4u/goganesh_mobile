import * as React from 'react';
import {List} from 'react-native-paper';

import {
  Text,
  Button,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import images from '../../../Theams/Images';
import Colors from "../../../Theams/Colors";

const AccordianListNew = props => {
  const [expanded, setExpanded] = React.useState(true);
  const navigation = useNavigation();
  const handlePress = () => setExpanded(!expanded);

  function ListTitle() {
    return (
      <View style={styles.ListTitle}>
        <Image style={styles.image} source={images.logo} />
        <View>
          <Text style={styles.url}>{props.data.siteurl}</Text>
          <Text style={styles.siteName}>{props.data.sitename}</Text>
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
            <Text style={styles.credTitle}>Demo</Text>
            <View style={styles.credIcon}>
              <Icon name="launch" color="white" size={20} />
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
            <Text style={styles.credTitle}>Demo Id</Text>
            <Text style={{color: 'white', marginLeft: 'auto'}}>goganesh</Text>
          </View>
          <View style={styles.credsCardPassword}>
            <Text style={styles.credTitle}>Demo password</Text>
            <Text style={{color: 'white', marginLeft: 'auto'}}>123456</Text>
          </View>
        </View>
        <View style={styles.moneyCard}>
          <View style={styles.moneyCardContentGrid}>
            <View style={styles.moneyRow1}>
              <View style={styles.moneyCardIcon}>
                <Icon name="sports-cricket" color={Colors.appPrimaryColor} size={18} />
              </View>
              <Text style={styles.moneyCardText}>Cricket</Text>
              <Text style={styles.moneyCardPrice}>100</Text>
            </View>

            <View style={styles.moneyRow2}>
              <View style={styles.moneyCardIcon}>
                <Icon name="sports-soccer" color={Colors.appPrimaryColor} size={18} />
              </View>
              <Text style={styles.moneyCardText}>Football</Text>
              <Text style={styles.moneyCardPrice}>100</Text>
            </View>
            <View style={styles.moneyRow3}>
              <View style={styles.moneyCardIcon}>
                <Icon name="sports-tennis" color={Colors.appPrimaryColor} size={18} />
              </View>
              <Text style={styles.moneyCardText}>Tennis</Text>
              <Text style={styles.moneyCardPrice}>100</Text>
            </View>
            <View style={styles.moneyRow3}>
              <View style={styles.moneyCardIcon}>
                <Icon name="casino" color={Colors.appPrimaryColor} size={18} />
              </View>
              <Text style={styles.moneyCardText}>Live Casino</Text>
              <Text style={styles.moneyCardPrice}>100</Text>
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
            borderRadius:5
          }}
          onPress={() => {
            navigation.navigate('CreateID', {sdid: props.data.sdid,url:props.data.siteurl,sitename:props.data.sitename});
          }}>
          <Text style={{alignItems: 'center'}}>Create ID</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <List.Section title="Accordions">
      <View style={styles.container}>
        <List.Accordion
          title={<ListTitle />}
          expanded={!expanded}
          onPress={handlePress}
          style={{backgroundColor: '#171616', borderRadius: 10}}>
          <ListCollapse />
        </List.Accordion>
      </View>
    </List.Section>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#171616',
    borderRadius: 10,
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
    backgroundColor: '#171616',
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
