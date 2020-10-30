import React, {Component} from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import {Icon} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

import Tile from '../../../../components/Tile';
import {
  MY_HEALTH_TILES,
  USER_DETAIL_KEYS,
  USER_BMI_STATE,
} from '../../../../constants';

import styles from './styles';

export default class HealthAnalysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isData: false,
      isError: false,
      details: {},
      bmiCount: 0,
      bmiState: '',
      suggestion: '',
    };
    this.getHealthData();
  }

  getHealthData = async () => {
    let height_ft = await AsyncStorage.getItem(USER_DETAIL_KEYS.HEIGHT_FT);
    let height_in = await AsyncStorage.getItem(USER_DETAIL_KEYS.HEIGHT_IN);
    let weight = await AsyncStorage.getItem(USER_DETAIL_KEYS.WEIGHT);

    if (!(height_ft && height_in && weight)) {
      this.setState({
        isData: false,
      });
    } else {
      const {bmiCount, bmiState} = this.calculateBMI(
        height_ft,
        height_in,
        weight,
      );
      this.setState({
        details: {
          ...this.state.details,
          [USER_DETAIL_KEYS.HEIGHT_FT]: height_ft,
          [USER_DETAIL_KEYS.HEIGHT_IN]: height_in,
          [USER_DETAIL_KEYS.WEIGHT]: weight,
        },
        bmiCount,
        bmiState,
        isData: true,
      });
    }
  };

  convertToInt = val => Number.parseInt(val, 10);

  removeWhitespace = val => val.substr(0, val.length - 3);

  calculateBMI = (height_ft, height_in, weight) => {
    const heightFoot_Mtr =
      this.convertToInt(this.removeWhitespace(height_ft)) / 3.281;
    const heightInch_Mtr =
      this.convertToInt(this.removeWhitespace(height_in)) / 39.37;
    const weightKg = this.convertToInt(weight);
    const height_MtrSqr = Math.pow(heightFoot_Mtr + heightInch_Mtr, 2);
    const bmiCount = (weightKg / height_MtrSqr).toFixed(2);
    const bmiState = this.calculateBMIState(bmiCount);

    return {
      bmiCount,
      bmiState,
    };
  };

  calculateBMIState = bmi => {
    if (bmi >= 30) {
      return USER_BMI_STATE.OBESE;
    } else if (bmi >= 25 && bmi < 30) {
      return USER_BMI_STATE.OVERWEIGHT;
    } else if (bmi >= 18.5 && bmi < 25) {
      return USER_BMI_STATE.NORMAL;
    } else if (bmi >= 0 && bmi < 18.5) {
      return USER_BMI_STATE.UNDERWEIGHT;
    }
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

  renderBMI = () => {
    const {
      bmiCount,
      bmiState: {value, color},
    } = this.state;

    return (
      <View style={styles.container}>
        <Text style={[styles.primaryText, {color}]}>{bmiCount}</Text>
        <Text style={styles.secondaryText}>{value}</Text>
      </View>
    );
  };

  renderContent = () => {
    const {isData} = this.state;

    if (!isData) {
      return this.showMessage('Personal information missing');
    }

    return this.renderBMI();
  };

  render() {
    const {title, subtitle} = MY_HEALTH_TILES.HEALTH_ANALYSIS;

    return (
      <Tile
        title={title}
        subtitle={subtitle}
        actionName="Check"
        onPress={this.getHealthData}>
        {this.renderContent()}
      </Tile>
    );
  }
}
