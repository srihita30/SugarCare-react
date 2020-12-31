import React, {Component} from 'react';
import {
    Text,
    View,
    Image, ActivityIndicator
  } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import styles from './UserProfile.styles';
import AsyncStorage from '@react-native-community/async-storage';
import { USER_DETAIL_KEYS } from '../../../../constants';
import * as theme from '../../../../styles/theme';
import SugarReadingCard from '../../../../components/SugarReadingCard/SugarReadingCard';

export default class UserProfile extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  async componentDidMount() {
    let userDetails = await AsyncStorage.getItem(USER_DETAIL_KEYS.USER_DATA)
    userDetails = JSON.parse(userDetails);
    console.log('check the userdetails here', userDetails);
    this.setState({
      userDetails,
      account: userDetails.account
    })
  }
  
  render() {
    if(!this.state.account){
      return (
        <View style={styles.userCard}>
          <ActivityIndicator size="large" color="black" />
        </View>
      )
    }
    const {cardiacSurgeryDone, hasHyperTension, cardiacPatient, age, yearDetected, heightInFeet, heightInInches, weight, gender} = this.state.account || {};
    const {firstName, lastName} = this.state.userDetails || {};
    const {pastSugarReadings = []} = this.props;
    let message = '';
    if(hasHyperTension && !cardiacSurgeryDone && !cardiacPatient){
      message = ', suffers from hypertension.'
    } else if ( hasHyperTension && !cardiacSurgeryDone && cardiacPatient){
      message = `, suffers from hypertension. ${firstName} is also a Cardiac patient.`
    } else if (hasHyperTension && cardiacSurgeryDone && cardiacPatient) {
      message = `, suffers from hypertension. ${firstName} is also a Cardiac patient and has gone through a surgery in the past`
    } else if (!hasHyperTension && cardiacPatient && !cardiacSurgeryDone) {
      message = `. ${firstName} is also a Cardiac patient.`
    } else if (!hasHyperTension && cardiacPatient && cardiacSurgeryDone) {
      message = `. ${firstName} is also a Cardiac patient and has gone through a surgery in the past`
    }
    return (
        <>
        <View style={styles.userCard}>
              {gender == 'FEMALE' ? <Image
                style={styles.userCard_thumbnail}
                resizeMode="cover"
                source={require("../../../../assets/images/user-profile-female.png")}
              /> :
              <Image
                style={styles.userCard_thumbnail}
                resizeMode="cover"
                source={require("../../../../assets/images/user-profile-male.png")}
              />}
              <View style={styles.userCard_nameCard}>
              <Text style={styles.userCard_name}>{firstName + ' ' + lastName}</Text>
                {this.props.showRed && <View style={styles.userCard_nameCard__status}>
                  <Text
                    style={[styles.userCard_status, styles.userCard_status_red]}
                  >
                    Red
                  </Text>
                </View>}
              </View>
              <Text style={styles.userCard_desc}>
                {`Diagnosed with Diabetes in ${yearDetected.slice(0,4)}${message}`}
              </Text>
            </View>
            <View style={styles.descCard}>
              <View style={styles.descCard_cell}>
                <Text style={styles.descCard_label__left}>Age</Text>
                <Text style={styles.descCard_value__left}>{age}</Text>
              </View>
              <View style={styles.descCard_cell}>
                <Text style={styles.descCard_label}>Height</Text>
                <Text style={styles.descCard_value}>{`${heightInFeet}'${heightInInches}`}</Text>
              </View>
              <View style={styles.descCard_cell}>
                <Text style={styles.descCard_label__right}>Weight</Text>
                <Text style={styles.descCard_value__right}>{weight}</Text>
              </View>
            </View>
            <LinearGradient
              colors={[
                theme.color_status_red,
                theme.color_status_amber,
                theme.color_status_green,
                theme.color_status_amber,
                theme.color_status_green,
                theme.color_status_amber,
                theme.color_status_green,
              ]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.userProfileStatusBar}
            />
            {this.props.showReading && <View style={styles.titleBar}>
              <Text style={styles.titleBar_title}>Recent Readings</Text>
            </View>}

            <View style={styles.readings}>
              {this.props.showReading && 
              pastSugarReadings.slice(0,3).map((item)=>{
                return <SugarReadingCard data={item}/>
              }) 
            }
            </View>
      </>
    );
  }
}




