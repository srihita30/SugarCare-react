import React, {Component} from 'react';
import {Text, View} from 'react-native';

import Tile from '../../../../components/Tile';
import {MY_HEALTH_TILES} from '../../../../constants';

export default class SleepAnalysis extends Component {
  render() {
    const {title, subtitle} = MY_HEALTH_TILES.SLEEP_ANALYSIS;
    return (
      <Tile title={title} subtitle={subtitle}>
        <Text>Content</Text>
        <Text>Content</Text>
        <Text>Content</Text>
        <Text>Content</Text>
      </Tile>
    );
  }
}
