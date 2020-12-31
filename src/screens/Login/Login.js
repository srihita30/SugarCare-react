import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
  Alert,
  BackHandler,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import styles from "./Login.styles";
import Input from "../../components/Input";
import Button from "../../components/Button/Button";
import routes from "../../constants/routes";
import { SESSION_DETAILS, URL, USER_DETAIL_KEYS } from "../../constants";
import { getHttpPostRequest } from "../../utils";
import { NavigationActions, StackActions } from "react-navigation";

export default (Login = (props) => {
  const [state, setState] = useState({
    showRegister: false,
    phoneNumber: "",
    password: "",
    isLoadingLogin: false,
  });

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);

  const handleBackButton = () => {
    props.navigation.navigate(routes.DASHBOARD);
    return true;
  };

  props.navigation.setOptions({
    headerShown: false,
  });

  const navigateToDashboard = async () => {
    setState({ isLoadingLogin: true });
    const request = {
      password: state.password,
      phoneNumber: state.phoneNumber,
    };
    const httpRequest = await getHttpPostRequest(request);
    try {
      const httpResponse = await fetch(URL.LOGIN, httpRequest);
      if (httpResponse.ok) {
        let responseBody = await httpResponse.json();
        responseBody = JSON.stringify(responseBody);
        const token = httpResponse.headers.get("Jwt-Token");
        await AsyncStorage.setItem(USER_DETAIL_KEYS.USER_DATA, responseBody);

        await AsyncStorage.setItem(SESSION_DETAILS.TOKEN, token);
        setState({ isLoadingLogin: false });
        props.navigation.navigate(routes.DASHBOARD);
      } else {
        setState({ isLoadingLogin: false });
        Alert.alert("Login Failed", "Failed to Login! Please try again.");
      }
    } catch (e) {
      setState({ ...state, isLoadingLogin: false });
      Alert.alert("Login Failed", "Failed to Login! Please try again.");
      console.log("the exceptions is  -- ", e);
    }
  };

  const onClickRegister = () => {
    setState({
      showRegister: !state.showRegister,
    });
  };

  const handleRegistry = async () => {
    setState({ isLoadingLogin: true });
    const request = {
      firstName: state.firstName,
      lastName: state.lastName,
      password: state.password,
      status: "ACTIVE",
      firstTimeLogin: true,
      phoneNumber: state.phoneNumber,
    };
    const httpRequest = getHttpPostRequest(request);
    try {
      const httpResponse = await fetch(URL.REGISTER, httpRequest);
      setState({ ...state, isLoadingLogin: false });
      if (httpResponse.ok) {
        ToastAndroid.show("Successfully Registered !", ToastAndroid.LONG);
        onClickRegister();
      } else {
        Alert.alert(
          "Registration Failed",
          "Failed to Registered! Please check the details"
        );
      }
    } catch (e) {
      setState({ ...state, isLoadingLogin: false });
      Alert.alert(
        "Registration Failed",
        "Failed to Registered! Please check the details"
      );
      console.log("the exceptions is  -- ", e);
    }
  };
  const onChangeHandler = (field, value) => {
    setState({
      ...state,
      [field]: value,
    });
  };
  const validatePhone = () => {
    if (state.phoneNumber && !String(state.phoneNumber).match("[0-9]{10}")) {
      return "Invalid Phone Number";
    }
    return null;
  };
  const validatePassword = () => {
    if (state.password && state.password.length < 6) {
      return "Invalid Password";
    }
    return null;
  };
  const validateFirstName = () => {
    if (state.firstName && !/^[a-zA-Z ]{3,30}$/.test(state.firstName)) {
      return "Invalid First Name";
    }
    return null;
  };
  const validateLastName = () => {
    if (state.lastName && !/^[a-zA-Z ]{3,30}$/.test(state.lastName)) {
      return "Invalid Last Name";
    }
    return null;
  };
  const validateLogin = () => {
    if (!state.phoneNumber || !state.password) {
      return true;
    }
    if (validatePhone()) {
      return true;
    } else {
      return validatePassword();
    }
  };
  const validateRegistration = () => {
    if (
      !state.phoneNumber ||
      !state.password ||
      !state.firstName ||
      !state.lastName
    ) {
      return true;
    }
    if (
      validateFirstName() ||
      validateLastName() ||
      validatePhone() ||
      validatePassword()
    ) {
      return true;
    } else {
      return false;
    }
  };
  const { showRegister, isLoadingLogin } = state;
  if (isLoadingLogin) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }
  return (
    <View style={[styles.container, styles.container__login]}>
      <View style={styles.tempStatusBar} />
      <View style={styles.primaryCard}>
        <Image
          resizeMode="contain"
          source={require("../../assets/images/sugarcare_v.png")}
          style={[styles.logo, styles.well]}
        />
        <View style={styles.form}>
          <View style={styles.formGroup}>
            {showRegister ? (
              <Text style={styles.formLabel}>
                REGISTER YOUR SUGARCARE ACCOUNT
              </Text>
            ) : (
              <Text style={styles.formLabel}>
                LOGIN TO YOUR SUGARCARE ACCOUNT
              </Text>
            )}
          </View>
          {showRegister && (
            <>
              <Input
                label={"First Name"}
                maxLength={30}
                errorMessage={validateFirstName()}
                returnKeyType={"next"}
                value={state.firstName}
                onChange={(value) => {
                  onChangeHandler("firstName", value);
                }}
              />
              <Input
                label={"Last Name"}
                maxLength={30}
                errorMessage={validateLastName()}
                returnKeyType={"next"}
                value={state.lastName}
                onChange={(value) => {
                  onChangeHandler("lastName", value);
                }}
              />
            </>
          )}
          <Input
            label={"Phone Number"}
            maxLength={10}
            errorMessage={validatePhone()}
            keyboardType={"numeric"}
            value={state.phoneNumber}
            returnKeyType={"done"}
            onChange={(value) => {
              onChangeHandler("phoneNumber", value);
            }}
          />
          <Input
            label={"Password"}
            returnKeyType={"done"}
            secureTextEntry={true}
            errorMessage={validatePassword()}
            value={state.password}
            onChange={(value) => {
              onChangeHandler("password", value);
            }}
          />
          {showRegister ? (
            <Button
              label={"REGISTER"}
              disabled={validateRegistration()}
              onClick={handleRegistry}
            />
          ) : (
            <Button
              disabled={validateLogin()}
              label={"SUBMIT"}
              onClick={navigateToDashboard}
            />
          )}
          <View style={styles.formGroup}>
            {showRegister ? (
              <>
                <Text style={styles.socialButton_text}>
                  ALREADY A SUGARCARE USER ?
                </Text>
                <TouchableOpacity onPress={() => onClickRegister()}>
                  <Text style={styles.register_text}>LOGIN HERE !</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.socialButton_text}>NEW TO SUGARCARE ?</Text>
                <TouchableOpacity onPress={() => onClickRegister()}>
                  <Text style={styles.register_text}>REGISTER HERE !</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </View>
    </View>
  );
});
