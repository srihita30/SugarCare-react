import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {Icon, ListItem} from 'react-native-elements';
import firebase from 'react-native-firebase';

import Tile from '../../../../components/Tile';
import {MY_HEALTH_TILES} from '../../../../constants';

import styles from './styles';

export default class PersonalSuggestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isError: false,
      data: [],
    };
    this.getHealthTips();
  }

  getHealthTips = async () => {
    firebase
      .database()
      .ref('tips/')
      .once('value')
      .then(healthTips => {
        const healthTipsKey = Object.keys(healthTips.val());
        const data = [];
        healthTipsKey.forEach(tip =>
          data.push({tip, detail: healthTips.val()[tip]}),
        );
        this.setState({data, isLoading: false});
      })
      .catch(err => {
        console.log('Error', err);
        this.setState({isError: true});
      });
  };

  showMessage = msg => {
    return (
      <View style={[styles.container, styles.msg_container]}>
        <Icon
          name="info-circle"
          type="font-awesome"
          color={styles.msg_icon.color}
        />
        <Text style={styles.msg}>{msg}</Text>
      </View>
    );
  };

  showLoader = msg => {
    return (
      <View style={[styles.container, styles.msg_container]}>
        <ActivityIndicator size="large" color={styles.msg_icon.color} />
        <Text style={styles.msg}>{msg}</Text>
      </View>
    );
  };

  keyExtractor = (item, index) => index.toString();

  renderTip = ({item}) => {
    const {tip, detail} = item;
    console.log('item', item);
    return (
      <ListItem
        key={tip}
        title={tip}
        titleStyle={styles.primaryText}
        subtitle={detail}
        subtitleStyle={styles.secondaryText}
      />
    );
  };

  renderHealthTips = () => {
    const {data} = this.state;
    return (
      <FlatList
        nestedScrollEnabled
        keyExtractor={this.keyExtractor}
        style={styles.content_container}
        data={data}
        renderItem={this.renderTip}
      />
    );
  };

  renderContent = () => {
    const {isLoading, isError, data} = this.state;
    if (isError) {
      return this.showMessage('Unable to load health tips');
    }

    if (isLoading) {
      return this.showLoader('Loading health tips');
    }

    return this.renderHealthTips();
  };

  render() {
    const {title, subtitle} = MY_HEALTH_TILES.PERSONAL_SUGGESTIONS;
    return (
      <Tile title={title} subtitle={subtitle}>
        {this.renderContent()}
      </Tile>
    );
  }
}
