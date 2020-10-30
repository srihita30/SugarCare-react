import {Platform} from 'react-native';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';
import DeviceInfo from 'react-native-device-info';

import firebaseConfig from './config';

const FCM_TOKEN = 'FCM_TOKEN';
const PROFILE_PATH = 'PROFILE_PATH';

export const checkPermission = async () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  let token = await AsyncStorage.getItem(FCM_TOKEN);
  if (!token) {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      token = getFcmToken();
    } else {
      requestPermission();
    }
  }

  let profilePath = await AsyncStorage.getItem(PROFILE_PATH);
  if (!profilePath) {
    updateProfilePath();
  }
  console.log('token', token);
  console.log('profilePath', profilePath);
};

const getFcmToken = async () => {
  const fcmToken = await firebase.messaging().getToken();
  if (fcmToken) {
    await setTokenInFirebase(fcmToken);
    await AsyncStorage.setItem(FCM_TOKEN, fcmToken);
  }
  return fcmToken;
};

const requestPermission = async () => {
  try {
    await firebase.messaging().requestPermission();
  } catch (error) {
    console.log('User has rejected permissions');
  }
};

const setTokenInFirebase = async token => {
  const currentVersion = DeviceInfo.getVersion();

  const tokenData = {
    token,
    platform: Platform.OS,
    ver: currentVersion,
    addedOn: moment(new Date()).format('DD-MMM-YYYY'),
    updatedOn: moment(new Date()).format('DD-MMM-YYYY HH:mm:ss'),
  };
  const data = await firebase
    .database()
    .ref('tokens/')
    .push(tokenData);
  await AsyncStorage.setItem(PROFILE_PATH, data.path);
};

export const getMetadata = async () => {
  const data = await firebase
    .database()
    .ref('meta/')
    .once('value');
  return data.val();
};

export const saveUserInfo = async profileData => {
  const profilePath = await AsyncStorage.getItem(PROFILE_PATH);
  const currentVersion = DeviceInfo.getVersion();
  const tokenData = {
    ...profileData,
    ver: currentVersion,
    updatedOn: moment(new Date()).format('DD-MMM-YYYY HH:mm:ss'),
  };
  await firebase
    .database()
    .ref(profilePath)
    .update(tokenData);
};

const updateProfilePath = async () => {
  const myToken = await AsyncStorage.getItem(FCM_TOKEN);
  const allTokens = await getTokensFromFirebase();

  Object.keys(allTokens).every(async key => {
    if (allTokens[key].token === myToken) {
      await AsyncStorage.setItem(PROFILE_PATH, key);
      return false;
    }

    return true;
  });
};

const getTokensFromFirebase = async () => {
  const data = await firebase
    .database()
    .ref('tokens/')
    .once('value');
  return data.val();
};
