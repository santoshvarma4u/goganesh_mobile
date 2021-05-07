import * as React from 'react';
import {List} from 'react-native-paper';
import Accordion from 'react-native-collapsible/Accordion';
import {Text, Button, View, Image, StyleSheet} from 'react-native';

import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';

const AccordianListNew = () => {
  const [expanded, setExpanded] = React.useState(true);
  const navigation = useNavigation();
  const handlePress = () => setExpanded(!expanded);

  function ListTitle() {
    return (
      <View style={styles.ListTitle}>
        {console.log(navigation)}
        <Image style={styles.image}></Image>
        <View>
          <Text style={styles.url}> asa </Text>
          <Text style={styles.siteName}>asa</Text>
        </View>
      </View>
    );
  }

  function ListCollapse() {
    return (
      <View style={styles.containerCollapse}>
        <View style={styles.icons}>
          <Icon name="home" color="black" size={26} />
          <Icon name="home" color="black" size={26} />
          <Icon name="home" color="black" size={26} />
          <Icon name="home" color="black" size={26} />
          <Icon name="home" color="black" size={26} />
        </View>
        <View style={styles.credsCard}>
          <View style={styles.credsCardHeader}>
            <Text style={styles.credTitle}>DemoID</Text>
            <View style={styles.credIcon}>
              <Icon name="home" color="black" size={26} />
            </View>
          </View>
          <View style={styles.credsCardID}>
            <Text style={styles.credTitle}>DemoID</Text>
            <Text style={{backgroundColor: 'white', marginLeft: 'auto'}}>
              Demo ID
            </Text>
          </View>
          <View style={styles.credsCardPassword}>
            <Text style={styles.credTitle}>DemoID</Text>
            <Text style={{backgroundColor: 'white', marginLeft: 'auto'}}>
              Demopassword
            </Text>
          </View>
        </View>
        <View style={styles.moneyCard}>
          <View style={styles.moneyCardContentGrid}>
            <View style={styles.moneyRow1}>
              <View style={styles.moneyCardIcon}>
                <Icon name="home" color="black" size={26} />
              </View>

              <Text style={styles.moneyCardText}>name</Text>
              <Text style={styles.moneyCardPrice}>100</Text>
            </View>

            <View style={styles.moneyRow2}>
              <View style={styles.moneyCardIcon}>
                <Icon name="home" color="black" size={26} />
              </View>
              <Text style={styles.moneyCardText}>name</Text>
              <Text style={styles.moneyCardPrice}>100</Text>
            </View>
            <View style={styles.moneyRow3}>
              <View style={styles.moneyCardIcon}>
                <Icon name="home" color="black" size={26} />
              </View>
              <Text style={styles.moneyCardText}>name</Text>
              <Text style={styles.moneyCardPrice}>100</Text>
            </View>
          </View>
          <Button
            title="create ID"
            style={{padding: 5}}
            onPress={() => {
              navigation.navigate('CreateID');
            }}></Button>
        </View>
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
          style={{backgroundColor: 'white', borderRadius: 10}}>
          <ListCollapse />
        </List.Accordion>
      </View>
    </List.Section>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
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
  },
  siteName: {
    marginLeft: 10,
  },
  ListTitle: {
    flexDirection: 'row',
  },

  containerCollapse: {
    padding: 10,
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: 'white',
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
    backgroundColor: 'white',
    marginLeft: 'auto',
  },
  credTitle: {
    backgroundColor: 'white',
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
    backgroundColor: 'white',
    flexDirection: 'row-reverse',
  },
  moneyCardPrice: {
    backgroundColor: 'pink',
    marginLeft: 'auto',
    right: 0,
  },
  moneyCardIcon: {
    backgroundColor: 'white',
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
