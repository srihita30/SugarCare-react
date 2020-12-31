import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  Alert,
  ActivityIndicator,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import DistanceAnalysis from "./components/DistanceAnalysis";
import HealthAnalysis from "./components/HealthAnalysis";
import PersonalDetails from "./components/PersonalDetails";
import PersonalSuggestions from "./components/PersonalSuggestions";
import SleepAnalysis from "./components/SleepAnalysis";
import UserProfile from "./components/UserProfile/UserProfile";
import Tile from "../../components/Tile";
import Input from "../../components/Input/index";
import DatePicker from "react-native-datepicker";
import * as theme from "../../styles/theme";
import { Icon } from "react-native-elements";

import styles from "./styles";
import {
  DIABATIC_STAGE_CONSTANTS,
  URL,
  USER_DETAIL_KEYS,
  USER_TITLES,
} from "../../constants";
import {
  getHttpGetRequest,
  getHttpPostRequestWithAuth,
  getHttpPutRequest,
} from "../../utils";
import AsyncStorage from "@react-native-community/async-storage";
import routes from "../../constants/routes";
import Footer from "../../components/Footer/Footer";
import LogoutModal from "../../components/LogoutModal/LogoutModal";

export default class MyHealth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      showUserProfile: false,
      showReading: false,
      sugarReadings: {},
    };
    this.fetchUserData();
  }

  fetchUserData = async () => {
    let userDetails = await AsyncStorage.getItem(USER_DETAIL_KEYS.USER_DATA);
    userDetails = JSON.parse(userDetails);
    this.setState({
      ...this.state,
      userDetails,
    });
    if (userDetails.account.creationDate !== userDetails.account.updateDate) {
      this.setState({
        ...this.state,
        showUserProfile: true,
      });
    }
  };

  async componentDidMount() {
    this.props.navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={styles.header_lha_icon}>
          <Icon  onPress={()=>{
            this.props.navigation.navigate(routes.MY_HEALTH)
            }} name="account-circle" type="material-community" size={30}/>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity style={styles.header_lha_icon}>
          <Icon  onPress={()=>{
            this.setState({...this.state,showLogoutModal: true})
            // this.props.navigation.navigate(routes.LOGIN)
            }} name="power" type="material-community" size={30}/>
        </TouchableOpacity>
      )
    })
    // this.props.navigation.setOptions({
    //   headerLeft: null,
    // });
    console.log("mounting the myprofile");
    this.setState({ ...this.state, loading: true });
    this.fetchUserData();
    this.fetchSugarLevels();
    const httpRequest = await getHttpPostRequestWithAuth();
    try {
      const httpResponse = await fetch(URL.AUTHENTICATE, httpRequest);
      if (httpResponse.ok) {
        let response = await httpResponse.json();
        response = JSON.stringify(response);
        await AsyncStorage.setItem(USER_DETAIL_KEYS.USER_DATA, response);
        this.setState({
          loading: false,
        });
        this.props.navigation.navigate(routes.MY_HEALTH);
      } else {
        this.setState({
          ...this.state,
          loading: false,
        });
        this.props.navigation.navigate(routes.LOGIN);
      }
    } catch (e) {
      this.setState({
        ...this.state,
        loading: false,
      });
      console.log("excepton in authentication", e);
    }
  }

  fetchSugarLevels = async () => {
    this.setState({
      loading: true,
    });
    try {
      let userDetails = await AsyncStorage.getItem(USER_DETAIL_KEYS.USER_DATA);
      userDetails = JSON.parse(userDetails);
      const url = `${URL.GET_SUGAR_DETAILS}${userDetails.id}/for-days/30`;
      const httpRequest = await getHttpGetRequest();
      const httpResponse = await fetch(url, httpRequest);
      if (httpResponse.ok) {
        const response = await httpResponse.json();
        if (response.length > 0) {
          this.setState({
            loading: false,
            showReading: true,
            pastSugarReadings: response,
          });
        } else {
          this.setState({
            loading: false,
          });
        }
      } else {
        this.setState({
          loading: false,
        });
      }
    } catch (e) {
      this.setState({
        loading: false,
      });
      console.log("the exception in fetching the sugar levels -- ", e);
    }
  };

  fetchProfileData = async () => {
    let url = `${URL.GET_USER_DETAILS}${this.state.userDetails.id}`;
    let httpRequest = await getHttpGetRequest();
    try {
      const httpResponse = await fetch(url, httpRequest);
      if (httpResponse.ok) {
        let response = await httpResponse.json();
        console.log("values of user after updateing", response);
        response = JSON.stringify(response);
        await AsyncStorage.setItem(USER_DETAIL_KEYS.USER_DATA, response);
      }
    } catch (e) {
      console.log("the exception is --", e);
    }
  };

  handleSavePersonalDetails = async (userDetails) => {
    if (
      !userDetails.age ||
      (userDetails.age && !/^\d+$/.test(userDetails.age))
    ) {
      return Alert.alert("Incomplete details", "Please enter a valid age");
    }
    if (
      !userDetails.yearDiagnosed ||
      (userDetails.yearDiagnosed.slice(0, 4) &&
        !/^\d+$/.test(userDetails.yearDiagnosed.slice(0, 4)))
    ) {
      return Alert.alert("Incomplete details", "Please enter a valid year");
    }
    if (
      !userDetails.details.weight ||
      (userDetails.details.weight && !/^\d+$/.test(userDetails.details.weight))
    ) {
      return Alert.alert("Incomplete details", "Please enter a valid weight");
    }
    this.setState({
      ...this.state,
      loading: true,
    });
    let userData = await AsyncStorage.getItem(USER_DETAIL_KEYS.USER_DATA);
    userData = JSON.parse(userData);
    const request = {
      age: parseInt(userDetails.age),
      gender:
        userDetails.details[USER_DETAIL_KEYS.TITLE] == USER_TITLES[0].value
          ? "MALE"
          : "FEMALE",
      weight: parseInt(userDetails.details.weight),
      heightInFeet: parseInt(userDetails.details[USER_DETAIL_KEYS.HEIGHT_FT]),
      heightInInches: parseInt(userDetails.details[USER_DETAIL_KEYS.HEIGHT_IN]),
      hasHyperTension: userDetails.hyperTensionCheck,
      diabeticStage:
        DIABATIC_STAGE_CONSTANTS[userDetails.details.diabeticStage],
      yearDetected: userDetails.yearDiagnosed.slice(0, 4) + "-01-01",
      cardiacPatient: userDetails.isCardiacPatient,
      cardiacSurgeryDone: userDetails.cardiacSurgeryCheck,
    };
    const httpRequest = await getHttpPutRequest(request);
    const url = `${URL.UPDATE_USER_DETAILS}${userData.id}`;
    try {
      const httpResponse = await fetch(url, httpRequest);
      if (httpResponse.ok) {
        ToastAndroid.show("Submitted Successfully !", ToastAndroid.LONG);
        await this.fetchProfileData();
        this.setState({
          ...this.state,
          loading: false,
          showUserProfile: true,
        });
      } else {
        Alert.alert(
          "Failed to update",
          "Something went wrong! Please try again later."
        );
        this.setState({
          ...this.state,
          loading: false,
        });
      }
    } catch (e) {
      Alert.alert(
        "Failed to update",
        "Something went wrong! Please try again later."
      );
      console.log("the exception in updating the user details ", e);
    }
  };

  postReadingsToApi = async (isAfterMeal, sugarReading) => {
    let userData = await AsyncStorage.getItem(USER_DETAIL_KEYS.USER_DATA);
    userData = JSON.parse(userData);
    const request = {
      isReadingTakenAfterMeal: isAfterMeal,
      sugarReadingValue: sugarReading,
      recordDate: this.state.sugarReadings.date,
    };
    const httpRequest = await getHttpPostRequestWithAuth(request);
    console.log("the http request to post sugar details", httpRequest);
    const url = `${URL.UPDATE_SUGAR_READINGS}${userData.id}`;
    const httpResponse = await fetch(url, httpRequest);
    return httpResponse;
  };

  handleSaveReading = async () => {
    if (
      !this.state.sugarReadings.preMeal ||
      (this.state.sugarReadings.preMeal &&
        !/^\d+$/.test(this.state.sugarReadings.preMeal))
    ) {
      Alert.alert(
        "Incomplete details",
        "Please enter valid Premeal Sugar reading"
      );
      return;
    }
    if (
      !this.state.sugarReadings.postMeal ||
      (this.state.sugarReadings.postMeal &&
        !/^\d+$/.test(this.state.sugarReadings.postMeal))
    ) {
      Alert.alert(
        "Incomplete details",
        "Please enter valid Postmeal Sugar reading"
      );
      return;
    }
    if (!this.state.sugarReadings.date) {
      Alert.alert("Incomplete details", "Please select a date");
      return;
    }
    try {
      this.setState({
        ...this.state,
        loading: true,
      });
      let httpResponse = await this.postReadingsToApi(
        false,
        this.state.sugarReadings.preMeal
      );
      if (httpResponse.ok) {
        httpResponse = await this.postReadingsToApi(
          true,
          this.state.sugarReadings.postMeal
        );
        if (httpResponse.ok) {
          this.fetchSugarLevels();
          this.setState({
            ...this.state,
            loading: false,
          });
          ToastAndroid.show("Submitted Successfully !", ToastAndroid.LONG);
        } else {
          this.setState({
            ...this.state,
            loading: false,
          });
          Alert.alert(
            "Submittion Failed",
            "Something went wrong. Pleas try again later."
          );
        }
      } else {
        this.setState({
          ...this.state,
          loading: false,
        });
        Alert.alert(
          "Submittion Failed",
          "Something went wrong. Pleas try again later."
        );
      }
    } catch (e) {
      console.log("exception in posting the data", e);
      this.setState({
        ...this.state,
        loading: false,
      });
      Alert.alert(
        "Submittion Failed",
        "Something went wrong. Pleas try again later."
      );
    }
  };

  onChangeHandler = (field, value) => {
    this.setState({
      ...this.state,
      sugarReadings: {
        ...this.state.sugarReadings,
        [field]: value,
      },
    });
  };
  renderEditForm = () => {
    return (
      <Tile
        title={"Sugar Levels"}
        subtitle={"Your last measured sugar level"}
        actionName="Save"
        onPress={() => {
          this.handleSaveReading();
        }}
      >
        <View style={styles.formGroup}>
          <Input
            label="Pre Meal"
            onChange={(val) => {
              this.onChangeHandler("preMeal", val);
            }}
            value={this.state.sugarReadings.preMeal}
            keyboardType={"numeric"}
          />
        </View>
        <View style={styles.formGroup}>
          <Input
            label="Post Meal"
            onChange={(val) => {
              this.onChangeHandler("postMeal", val);
            }}
            value={this.state.sugarReadings.postMeal}
            keyboardType={"numeric"}
          />
        </View>
        <View style={styles.formGroup}>
          <DatePicker
            style={{ width: 200 }}
            date={this.state.sugarReadings && this.state.sugarReadings.date}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            // minDate="2016-05-01"
            // maxDate="2016-06-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0,
                marginTop: 5,
              },
              dateInput: {
                marginLeft: 36,
                ...styles.inputStyle,
              },
            }}
            onDateChange={(date) => {
              this.onChangeHandler("date", date);
            }}
          />
        </View>
        {/* <Button label={'SUBMIT'} onClick={()=>{}}/> */}
      </Tile>
    );
  };
  closeModal = () => {
    this.setState({ ...this.state, showLogoutModal: false });
  };
  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="black" />
        </View>
      );
    }
    if (this.state.showUserProfile) {
      const { pastSugarReadings = [] } = this.state;
      let latestReading = pastSugarReadings.slice(0, 1)[0];
      let showRed = false;
      if (
        (latestReading && latestReading.afterMeal == "RED") ||
        (latestReading && latestReading.beforeMeal == "RED")
      ) {
        showRed = true;
      }
      return (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
          >
            <UserProfile
              showReading={this.state.showReading}
              pastSugarReadings={this.state.pastSugarReadings}
              showRed={showRed}
            />
            <LogoutModal
              visible={this.state.showLogoutModal}
              closeModal={this.closeModal}
              navigation={this.props.navigation}
            />
            {this.renderEditForm()}
            <PersonalDetails
              handleSavePersonalDetails={this.handleSavePersonalDetails}
              userDetails={this.state.userDetails}
            />
            <HealthAnalysis />
            <PersonalSuggestions />
          </ScrollView>
          {showRed && (
            <>
              <Text style={styles.note}>
                * Based on your recent readings, your review with a
                diabetologist is pending
              </Text>
              <TouchableOpacity style={styles.cta}>
                <Text style={styles.btn}>Call Doctor</Text>
              </TouchableOpacity>
            </>
          )}
          <Footer focus={2} navigation={this.props.navigation} />
        </>
      );
    }
    return (
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          <PersonalDetails
            handleSavePersonalDetails={this.handleSavePersonalDetails}
            userDetails={this.state.userDetails}
          />
          <HealthAnalysis />
          <LogoutModal
            visible={this.state.showLogoutModal}
            closeModal={this.closeModal}
            navigation={this.props.navigation}
          />
          {/* <SleepAnalysis /> */}
          {/* <DistanceAnalysis /> */}
          <PersonalSuggestions />
        </ScrollView>
        <Footer focus={2} navigation={this.props.navigation} />
      </>
    );
  }
}
