import React, {Component} from 'react';
import {Text, View, ScrollView} from 'react-native';

import DistanceAnalysis from './components/DistanceAnalysis';
import HealthAnalysis from './components/HealthAnalysis';
import PersonalDetails from './components/PersonalDetails';
import PersonalSuggestions from './components/PersonalSuggestions';
import SleepAnalysis from './components/SleepAnalysis';

import styles from './styles';

export default class MyHealth extends Component {
  render() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <PersonalDetails />
        <HealthAnalysis />
        {/* <SleepAnalysis /> */}
        {/* <DistanceAnalysis /> */}
        <PersonalSuggestions />
      </ScrollView>
    );
  }
}

// My Health
//     Full name
//     Gender
//     Height
//     Age
//     Weight

// BMI
//     Obese or not?
//     Some tips around it

// Distance walked today
//     FROM HEALTH DATA

// Personalized Suggestions
//     Daily tips

// Water reminders
