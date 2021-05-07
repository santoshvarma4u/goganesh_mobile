import React, {Component} from 'react';
import Accordion from 'react-native-collapsible/Accordion';
import {Text, Button, View, Image, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';

const SECTIONS = [
  {
    title: 'First',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Second',
    content: 'Lorem ipsum...',
  },
  {
    title: 'First',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Second',
    content: 'Lorem ipsum...',
  },
  {
    title: 'First',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Second',
    content: 'Lorem ipsum...',
  },
  {
    title: 'First',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Second',
    content: 'Lorem ipsum...',
  },
];

export default class AccordionView extends Component {
  state = {
    activeSections: [],
  };

  _renderSectionTitle = section => {
    return (
      <View style={styles.content}>
        <Text>lkabcljanlcanlscnlakisnclanslca</Text>
      </View>
    );
  };

  _renderHeader = section => {
    return (
      <View style={styles.cardContent}>
        <View style={styles.containerUpperCard}>
          <Image style={styles.image}></Image>
          <View>
            <Text style={styles.url}>{section.title}</Text>
            <Text style={styles.siteName}>as;nclabudcbu</Text>
          </View>
        </View>
      </View>
    );
  };

  _renderContent = section => {
    return (
      <View style={styles.cardContent}>
        {console.log(1)}
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
          </View>
        </View>
      </View>
    );
  };

  _updateSections = activeSections => {
    this.setState({activeSections});
  };

  render() {
    return (
      <Accordion
        sections={SECTIONS}
        activeSections={this.state.activeSections}
        renderSectionTitle={this._renderSectionTitle}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
        onChange={this._updateSections}
      />
    );
  }
}

const styles = StyleSheet.create({
  cardContent: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  containerUpperCard: {
    flexDirection: 'row',
    padding: 10,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: 'white',
  },
  containerCollapse: {
    padding: 10,
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: 'white',
  },
  image: {
    width: 75,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'black',
    marginRight: 10,
  },
  url: {
    fontWeight: '500',
  },
  siteName: {},
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
