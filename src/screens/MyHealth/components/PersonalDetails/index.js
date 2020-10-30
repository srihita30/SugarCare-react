import React, {Component} from 'react';
import {Text, View, ActivityIndicator, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Tile from '../../../../components/Tile';
import Dropdown from '../../../../components/Dropdown';
import Input from '../../../../components/Input';
import {
  MY_HEALTH_TILES,
  USER_TITLES,
  USER_HEIGHT_FEET,
  USER_HEIGHT_INCH,
  USER_DETAIL_KEYS,
} from '../../../../constants';

import {saveUserInfo} from '../../../../firebase/util';

import styles from './styles';

export default class PersonalDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {
        [USER_DETAIL_KEYS.TITLE]: USER_TITLES[0].value,
        [USER_DETAIL_KEYS.HEIGHT_FT]: USER_HEIGHT_FEET[4].value,
        [USER_DETAIL_KEYS.HEIGHT_IN]: USER_HEIGHT_INCH[0].value,
      },
      isData: false,
      isSaving: false,
    };
    this.getFormData();
  }

  getFormData = async () => {
    let title = await AsyncStorage.getItem(USER_DETAIL_KEYS.TITLE);
    let name = await AsyncStorage.getItem(USER_DETAIL_KEYS.NAME);
    let mobile = await AsyncStorage.getItem(USER_DETAIL_KEYS.MOBILE);
    let height_ft = await AsyncStorage.getItem(USER_DETAIL_KEYS.HEIGHT_FT);
    let height_in = await AsyncStorage.getItem(USER_DETAIL_KEYS.HEIGHT_IN);
    let weight = await AsyncStorage.getItem(USER_DETAIL_KEYS.WEIGHT);

    if (!(title && name && mobile && height_ft && height_in && weight)) {
      // No values
      this.setState({
        isData: false,
      });
    } else {
      // Value
      this.setState({
        details: {
          ...this.state.details,
          [USER_DETAIL_KEYS.TITLE]: title,
          [USER_DETAIL_KEYS.NAME]: name,
          [USER_DETAIL_KEYS.MOBILE]: mobile,
          [USER_DETAIL_KEYS.HEIGHT_FT]: height_ft,
          [USER_DETAIL_KEYS.HEIGHT_IN]: height_in,
          [USER_DETAIL_KEYS.WEIGHT]: weight,
        },
        isData: true,
      });
    }
  };

  onSaveDetails = async () => {
    this.setState({isSaving: true});
    const {details} = this.state;

    if (!details[USER_DETAIL_KEYS.NAME]) {
      this.setState({isSaving: false});
      return Alert.alert('Incomplete details', 'Please enter a name');
    }
    if (!details[USER_DETAIL_KEYS.MOBILE]) {
      this.setState({isSaving: false});
      return Alert.alert('Incomplete details', 'Please enter a mobile number');
    }
    if (!details[USER_DETAIL_KEYS.WEIGHT]) {
      this.setState({isSaving: false});
      return Alert.alert('Incomplete details', 'Please enter weight');
    }

    await AsyncStorage.setItem(
      USER_DETAIL_KEYS.TITLE,
      details[USER_DETAIL_KEYS.TITLE],
    );
    await AsyncStorage.setItem(
      USER_DETAIL_KEYS.NAME,
      details[USER_DETAIL_KEYS.NAME],
    );
    await AsyncStorage.setItem(
      USER_DETAIL_KEYS.MOBILE,
      details[USER_DETAIL_KEYS.MOBILE],
    );
    await AsyncStorage.setItem(
      USER_DETAIL_KEYS.HEIGHT_FT,
      details[USER_DETAIL_KEYS.HEIGHT_FT],
    );
    await AsyncStorage.setItem(
      USER_DETAIL_KEYS.HEIGHT_IN,
      details[USER_DETAIL_KEYS.HEIGHT_IN],
    );
    await AsyncStorage.setItem(
      USER_DETAIL_KEYS.WEIGHT,
      details[USER_DETAIL_KEYS.WEIGHT],
    );

    const profileData = {
      name: `${details[USER_DETAIL_KEYS.TITLE]}. ${
        details[USER_DETAIL_KEYS.NAME]
      }`,
      mobile: details[USER_DETAIL_KEYS.MOBILE],
      height: `${details[USER_DETAIL_KEYS.HEIGHT_FT]}, ${
        details[USER_DETAIL_KEYS.HEIGHT_IN]
      }`,
      weight: `${details[USER_DETAIL_KEYS.WEIGHT]} kg`,
    };

    await saveUserInfo(profileData);
    this.getFormData();
    this.setState({isSaving: false});
  };

  onEditDetails = () => {
    this.setState({isData: false});
  };

  updateDetails = (field, val) => {
    this.setState({
      ...this.state,
      details: {
        ...this.state.details,
        [field]: val,
      },
    });
  };

  renderTitle = () => {
    const {details} = this.state;
    return (
      <View style={[styles.formGroup, styles.formGroup_half]}>
        <Dropdown
          items={USER_TITLES}
          label="Title"
          onChange={val => this.updateDetails(USER_DETAIL_KEYS.TITLE, val)}
          value={details[USER_DETAIL_KEYS.TITLE]}
        />
      </View>
    );
  };

  renderFullName = () => {
    const {details} = this.state;
    return (
      <View style={styles.formGroup}>
        <Input
          label="Name"
          onChange={val => this.updateDetails(USER_DETAIL_KEYS.NAME, val)}
          value={details[USER_DETAIL_KEYS.NAME]}
        />
      </View>
    );
  };

  renderMobile = () => {
    const {details} = this.state;
    return (
      <View style={styles.formGroup}>
        <Input
          label="Mobile Number"
          keyboardType="numeric"
          maxLength={10}
          onChange={val => this.updateDetails(USER_DETAIL_KEYS.MOBILE, val)}
          value={details[USER_DETAIL_KEYS.MOBILE]}
        />
      </View>
    );
  };

  renderHeight = () => {
    const {details} = this.state;
    return (
      <View style={[styles.formGroup, styles.row_flex]}>
        <View style={styles.formGroup_half}>
          <Dropdown
            items={USER_HEIGHT_FEET}
            label="Height (feet)"
            onChange={val =>
              this.updateDetails(USER_DETAIL_KEYS.HEIGHT_FT, val)
            }
            value={details[USER_DETAIL_KEYS.HEIGHT_FT]}
          />
        </View>
        <View style={styles.formGroup_half}>
          <Dropdown
            items={USER_HEIGHT_INCH}
            label="Height (inch)"
            onChange={val =>
              this.updateDetails(USER_DETAIL_KEYS.HEIGHT_IN, val)
            }
            value={details[USER_DETAIL_KEYS.HEIGHT_IN]}
          />
        </View>
      </View>
    );
  };

  renderWeight = () => {
    const {details} = this.state;
    return (
      <View style={styles.formGroup}>
        <Input
          label="Weight (kg)"
          keyboardType="numeric"
          maxLength={3}
          onChange={val => this.updateDetails(USER_DETAIL_KEYS.WEIGHT, val)}
          value={details[USER_DETAIL_KEYS.WEIGHT]}
        />
      </View>
    );
  };

  renderEditForm = ({title, subtitle}) => {
    return (
      <Tile
        title={title}
        subtitle={subtitle}
        actionName="Save"
        onPress={this.onSaveDetails}>
        {this.renderTitle()}
        {this.renderFullName()}
        {this.renderMobile()}
        {this.renderHeight()}
        {this.renderWeight()}
      </Tile>
    );
  };

  renderDetails = ({title, subtitle}) => {
    const {details} = this.state;
    return (
      <Tile
        title={title}
        subtitle={subtitle}
        actionName="Edit"
        onPress={this.onEditDetails}>
        <Text style={styles.title}>
          {`${details[USER_DETAIL_KEYS.TITLE]}. ${
            details[USER_DETAIL_KEYS.NAME]
          }`}
        </Text>
        <Text style={styles.subtitle}>{details[USER_DETAIL_KEYS.MOBILE]}</Text>

        <View style={[styles.formGroup, styles.row_flex, styles.divider]}>
          <View style={[styles.formGroup_half, styles.center]}>
            <Text style={styles.subtitle}>{`${
              details[USER_DETAIL_KEYS.HEIGHT_FT]
            } ${details[USER_DETAIL_KEYS.HEIGHT_IN]}`}</Text>
          </View>
          <View style={[styles.formGroup_half, styles.center]}>
            <Text style={styles.subtitle}>{`${
              details[USER_DETAIL_KEYS.WEIGHT]
            } kg`}</Text>
          </View>
        </View>
      </Tile>
    );
  };

  showLoader = ({title, subtitle}) => {
    return (
      <Tile title={title} subtitle={subtitle}>
        <View style={[styles.container, styles.msg_container]}>
          <ActivityIndicator size="large" color={styles.msg_icon.color} />
          <Text style={styles.msg}>Saving your details</Text>
        </View>
      </Tile>
    );
  };

  render() {
    const {isData, isSaving} = this.state;

    if (isSaving) {
      return this.showLoader(MY_HEALTH_TILES.PERSONAL_DETAILS);
    }

    if (isData) {
      return this.renderDetails(MY_HEALTH_TILES.PERSONAL_DETAILS);
    } else {
      return this.renderEditForm(MY_HEALTH_TILES.PERSONAL_DETAILS);
    }
  }
}
