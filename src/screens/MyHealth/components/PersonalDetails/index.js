import React, {Component} from 'react';
import {Text, View, ActivityIndicator, Alert, CheckBox} from 'react-native';
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
  DIABATIC_STAGE, DIABATIC_STAGE_LIST
} from '../../../../constants';

import {saveUserInfo} from '../../../../firebase/util';

import styles from './styles';

export default class PersonalDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {
      },
      isData: false,
      isSaving: false,
      name: '',
      yearDiagnosed: '',
      hyperTensionCheck: false,
      cardiacSurgeryCheck: false,
      isCardiacPatient: false,
      mobile: ''
    };
    this.getFormData();
  }

  componentDidMount(){
    console.log('mounting the personal details')
  }

  onChangeHandler = (field, value) => {
    this.setState({
      ...this.state,
      [field]: value
    })
  }

  getFormData = async () => {
    try{
    let userDetails = await AsyncStorage.getItem(USER_DETAIL_KEYS.USER_DATA)
    userDetails = JSON.parse(userDetails);
    let title = userDetails.account.gender == "MALE" || userDetails.account.gender == null ? USER_TITLES[0].value : USER_TITLES[1].value;
    let name = userDetails.lastName + ' ' + userDetails.firstName
    let mobile = userDetails.phoneNumber

    let height_ft = userDetails.account.heightInFeet > 0 ? USER_HEIGHT_FEET[userDetails.account.heightInFeet-1].value : USER_HEIGHT_FEET[4].value;
    let height_in = userDetails.account.heightInInches > 0 ? USER_HEIGHT_INCH[userDetails.account.heightInInches].value : USER_HEIGHT_INCH[5].value;
    let weight = userDetails.account.weight > 0 ? userDetails.account.weight : '';
    this.setState({
      ...this.state,
      details: {
        ...this.state.details,
        [USER_DETAIL_KEYS.TITLE]: title,
        [USER_DETAIL_KEYS.HEIGHT_FT]: height_ft,
        [USER_DETAIL_KEYS.HEIGHT_IN]: height_in,
        weight: weight+'',
        diabeticStage: DIABATIC_STAGE_LIST[userDetails.account.diabeticStage] || 'Normal'
      },
      name,
      age: userDetails.account.age ? userDetails.account.age+'' : '',
      yearDiagnosed: userDetails.account.yearDetected,
      hyperTensionCheck: userDetails.account.hasHyperTension,
      cardiacSurgeryCheck: userDetails.account.cardiacSurgeryDone,
      isCardiacPatient: userDetails.account.cardiacPatient,
      mobile
    });
    } catch (e) {
      console.log('exception in fetching data in personal details', e)
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

  renderDiabeticStatus = () => {
    const {details} = this.state;
    return (
      <View style={[styles.formGroup, styles.formGroup_half]}>
        <Dropdown
          items={DIABATIC_STAGE}
          label="Diabetic Stage"
          onChange={val => this.updateDetails('diabeticStage', val)}
          value={details['diabeticStage']}
        />
      </View>
    );
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
          // onChange={val => this.onChangeHandler('name', val)}
          value = {this.state.name}
          editable={false}
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
          // onChange={val => this.onChangeHandler('mobile', val)}
          value={this.state.mobile}
          editable={false}
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
              this.updateDetails(USER_DETAIL_KEYS.HEIGHT_FT, val.split('')[0])
            }
            value={details[USER_DETAIL_KEYS.HEIGHT_FT]}
          />
        </View>
        <View style={styles.formGroup_half}>
          <Dropdown
            items={USER_HEIGHT_INCH}
            label="Height (inch)"
            onChange={val =>
              this.updateDetails(USER_DETAIL_KEYS.HEIGHT_IN, val.split(' ')[0])
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
          value={details.weight}
        />
      </View>
    );
  };

  renderYearDiagnosed = () => {
    return (
      <View style={styles.formGroup}>
        <Input
          label="Year diagnosed"
          keyboardType="numeric"
          maxLength={4}
          onChange={val => this.onChangeHandler('yearDiagnosed', val)}
          value={this.state.yearDiagnosed}
        />
      </View>
    )
  }

  renderAge = () => {
    return (
      <View style={styles.formGroup}>
        <Input
          label="Age"
          keyboardType="numeric"
          maxLength={3}
          onChange={val => this.onChangeHandler('age', val)}
          value={this.state.age}
        />
      </View>
    )
  }

  renderHyperTensionCheck = () => {
    return (
      <>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={this.state.hyperTensionCheck}
            onValueChange={(val)=>this.onChangeHandler('hyperTensionCheck',val)}
            style={styles.checkbox}
          />
          <Text style={styles.label}>Has hyper tension ?</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={this.state.isCardiacPatient}
            onValueChange={(val)=>this.onChangeHandler('isCardiacPatient',val)}
            style={styles.checkbox}
          />
          <Text style={styles.label}>Is a Cardiac Patient ?</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={this.state.cardiacSurgeryCheck}
            onValueChange={(val)=>this.onChangeHandler('cardiacSurgeryCheck',val)}
            style={styles.checkbox}
          />
          <Text style={styles.label}>Has undergone Cardiac surgery ?</Text>
        </View>
      </>
    )
  }

  renderEditForm = ({title, subtitle}) => {
    return (
      <Tile
        title={title}
        subtitle={subtitle}
        actionName="Save"
        onPress={()=>this.props.handleSavePersonalDetails(this.state)}>
        {this.renderTitle()}
        {this.renderFullName()}
        {this.renderMobile()}
        {this.renderAge()}
        {this.renderHeight()}
        {this.renderWeight()}
        {this.renderYearDiagnosed()}
        {this.renderDiabeticStatus()}
        {this.renderHyperTensionCheck()}
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
