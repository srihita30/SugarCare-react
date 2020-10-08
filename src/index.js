import 'react-native-gesture-handler';
import RouteContainer from './routes';
import React, {Component} from 'react';
import {
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
  Linking,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import firebase from 'react-native-firebase';
import DropdownAlert from 'react-native-dropdownalert';
import AsyncStorage from '@react-native-community/async-storage';

import {checkPermission, getMetadata} from './firebase/util';
import {FCM_TOKEN, UPDATE_CONTENT, APP_LINK} from './constants';

import styles from './styles';
import Modal from './components/Modal';

class AppComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notify: false,
      android_released_version: 0,
      ios_released_version: 0,
    };
    console.disableYellowBox = true;
  }

  async UNSAFE_componentWillMount() {
    const {
      ios_released_version,
      notify,
      android_released_version,
      cancellable,
    } = await getMetadata();

    this.setState({
      ios_released_version,
      notify,
      android_released_version,
      cancellable,
    });
  }

  async componentDidMount() {
    checkPermission();
    this.messageListener();
    this.logEvent();
  }

  logEvent = async () => {
    let token = await AsyncStorage.getItem(FCM_TOKEN);
    firebase.analytics().logEvent('daily_app_launch_event', {token});
  };

  messageListener = async () => {
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        // When app is in foreground
        const {title, body} = notification;
        this.showAlert(title, body);
      });

    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        // When notification is clicked
        const {title, body} = notificationOpen.notification;
        this.showAlert(title, body);
      });

    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const {title, body} = notificationOpen.notification;
      this.showAlert(title, body);
    }

    this.messageListener = firebase.messaging().onMessage(message => {
      console.log(JSON.stringify(message));
    });
  };

  showAlert = (title, message) => {
    if (Platform.OS === 'android' && this.dropDownAlertRef) {
      this.dropDownAlertRef.alertWithType('info', title, message);
    } else {
      Alert.alert(title, message);
    }
  };

  onCancelPressHandler = () => {
    const {cancellable} = this.state;
    if (cancellable) {
      this.setState({notify: false});
    }
  };

  onUpdatePressHandler = () => {
    const link = Platform.OS === 'android' ? APP_LINK.android : APP_LINK.ios;
    Linking.openURL(link)
      .then(success => console.log('success', success))
      .catch(error =>
        Alert.alert('Unable to open store', 'Please update the app manually'),
      );
  };

  renderUpdateAction = () => {
    return (
      <TouchableOpacity
        style={[styles.update_action_container, styles.shadow]}
        onPress={this.onUpdatePressHandler}>
        <Text style={styles.update_action_text}>UPDATE</Text>
      </TouchableOpacity>
    );
  };

  renderCancelAction = () => {
    const {cancellable} = this.state;
    if (cancellable) {
      return (
        <TouchableOpacity
          style={[styles.update_cancel_container, styles.shadow]}
          onPress={this.onCancelPressHandler}>
          <Text style={styles.update_action_text}>DISMISS</Text>
        </TouchableOpacity>
      );
    }
    return null;
  };

  renderUpdatePopupContent = () => {
    const {android_released_version, ios_released_version} = this.state;
    const currentVersion = DeviceInfo.getVersion();
    const releasedVersion =
      Platform.OS === 'android'
        ? android_released_version
        : ios_released_version;

    const {TITLE, CONTENT_1, CONTENT_2} = UPDATE_CONTENT;

    return (
      <View style={styles.update_container}>
        <Text
          style={styles.update_title}>{`${TITLE} (${currentVersion})`}</Text>
        <Text style={styles.update_desc}>{CONTENT_1}</Text>
        <Text
          style={
            styles.update_desc
          }>{`${CONTENT_2} (${releasedVersion})`}</Text>
        <View style={styles.update_actions}>
          {this.renderUpdateAction()}
          {this.renderCancelAction()}
        </View>
      </View>
    );
  };

  shouldUserBeNotified = () => {
    const {notify, android_released_version, ios_released_version} = this.state;
    if (!notify) {
      return false;
    }

    const currentVersion = DeviceInfo.getVersion();
    const releasedVersion =
      Platform.OS === 'android'
        ? android_released_version
        : ios_released_version;

    return currentVersion < releasedVersion;
  };

  renderUpdatePopup = () => {
    const isNotify = this.shouldUserBeNotified();
    return (
      <Modal isVisible={isNotify}>{this.renderUpdatePopupContent()}</Modal>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <DropdownAlert ref={ref => (this.dropDownAlertRef = ref)} />
        <StatusBar
          barStyle="dark-content"
          backgroundColor={styles.container.backgroundColor}
        />
        <RouteContainer />
        {this.renderUpdatePopup()}
      </View>
    );
  }
}

export default AppComponent;
