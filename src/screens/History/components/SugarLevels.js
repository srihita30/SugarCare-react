import React, {Component} from 'react';
import {View} from 'react-native';

import styles from './SugarLevels.styles';
import SugarReadingCard from '../../../components/SugarReadingCard/SugarReadingCard';

export default class SugarLevels extends Component {
  render() {
    return (
      <View style={styles.readings}>
        <SugarReadingCard data={this.props.data}/>
      </View>
    );
  }
}