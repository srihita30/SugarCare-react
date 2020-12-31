import AsyncStorage from "@react-native-community/async-storage";
import React, { Component } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { URL, USER_DETAIL_KEYS } from "../../constants";
import { getHttpGetRequest, getHttpPostRequestWithAuth } from "../../utils";
import { Icon } from "react-native-elements";

import SugarLevels from "./components/SugarLevels";

import styles from "./History.styles";
import Footer from "../../components/Footer/Footer";
import LogoutModal from "../../components/LogoutModal/LogoutModal";
import routes from "../../constants/routes";

export default class MyHealth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  fetchSugarReadings = async () => {
    this.setState({
      loading: true,
    });
    let userDetails = await AsyncStorage.getItem(USER_DETAIL_KEYS.USER_DATA);
    userDetails = JSON.parse(userDetails);
    const url = `${URL.GET_SUGAR_DETAILS}${userDetails.id}/for-days/30`;
    const httpRequest = await getHttpGetRequest();
    try {
      const httpResponse = await fetch(url, httpRequest);
      if (httpResponse.ok) {
        const response = await httpResponse.json();
        this.setState({
          loading: false,
          sugarReadings: response,
        });
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
    this.setState({
      loading: true,
    });
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
        this.props.navigation.navigate(routes.HISTORY);
      } else {
        this.setState({
          loading: false,
        });
        this.props.navigation.navigate(routes.LOGIN);
      }
    } catch (e) {
      this.setState({
        loading: false,
      });
      console.log("excepton in authentication", e);
    }
    this.fetchSugarReadings();
  }

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
    return (
      <>
        <View style={styles.titleBar}>
          <Text style={styles.titleBar_title}>
            Past 30 Days Of Your Sugar Readings
          </Text>
        </View>
        <LogoutModal
          visible={this.state.showLogoutModal}
          closeModal={this.closeModal}
          navigation={this.props.navigation}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={this.state.loading}
              onRefresh={this.fetchSugarReadings}
            />
          }
        >
          {this.state.sugarReadings && this.state.sugarReadings.length > 0 ? (
            this.state.sugarReadings.map((item) => {
              return <SugarLevels data={item} />;
            })
          ) : (
            <View>
              <Text>No Data to show. Please update your Sugar levels.</Text>
            </View>
          )}
        </ScrollView>
        <Footer focus={3} navigation={this.props.navigation} />
      </>
    );
  }
}
