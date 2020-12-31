import React from 'react';
import { View, StyleSheet, Text } from "react-native"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import * as theme from '../../styles/theme';

export default sugarReadingCard = (props) => {
    const {
      afterMeal,
      beforeMeal,
      readingAfterMeal,
      readingBeforeMeal,
      recordDate,
    } = props.data;
    let afterMealColorCode = afterMeal == 'RED' ? theme.color_status_red : afterMeal == 'GREEN' ? theme.color_status_green : theme.color_status_amber;
    let preMealColorCode = beforeMeal == 'RED' ? theme.color_status_red : beforeMeal == 'GREEN' ? theme.color_status_green : theme.color_status_amber
    let finalColor = afterMeal == 'RED' || beforeMeal == 'RED' ? styles.readingsCard__icon__statusRed : 
    afterMeal == 'AMBER' || beforeMeal == 'AMBER' ? styles.readingsCard__icon__statusAmber : readingsCard__icon__statusGreen;
    let finalColorForArrow = afterMeal == 'RED' || beforeMeal == 'RED' ? styles.readingsCard_hl__r : 
    afterMeal == 'AMBER' || beforeMeal == 'AMBER' ? styles.readingsCard_hl__a : readingsCard_hl__g;
    return(
        <View style={styles.readingsCard}>
                <View style={styles.readingsCard__item}>
                  <View style={styles.readingsCard__preMeal}>
                    <MaterialCommunityIcons
                      name="food-off"
                      style={styles.readingsCard__icon}
                    ></MaterialCommunityIcons>
                    <Text style={styles.readingsCard__reading}>{readingBeforeMeal || 'NA'}</Text>
                  </View>
                  <View style={styles.readingsCard__status}>
                    <MaterialCommunityIcons
                      name="heart-circle"
                      style={[
                        styles.readingsCard__icon__status,
                        finalColor,
                      ]}
                    ></MaterialCommunityIcons>
                    <View style={styles.readingsCard__status_dateContainer}>
                      <Text style={styles.readingsCard__status_date}>
                        {recordDate || 'NA'}
                      </Text>
                      <View
                        style={[
                          styles.readingsCard_hl,
                          finalColorForArrow,
                        ]}
                      >
                        <MaterialCommunityIcons
                          name= {readingAfterMeal < readingBeforeMeal ? "arrow-bottom-left" : "arrow-top-right"}
                          style={styles.readingCard_hl_icon}
                        ></MaterialCommunityIcons>
                      </View>
                    </View>
                  </View>
                  <View style={styles.readingsCard__postMeal}>
                    <MaterialCommunityIcons
                      name="food"
                      style={styles.readingsCard__icon}
                    ></MaterialCommunityIcons>
                    <Text style={styles.readingsCard__reading}>{readingAfterMeal || 'NA'}</Text>
                  </View>
                </View>
                <LinearGradient
                  colors={[preMealColorCode, afterMealColorCode]}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  style={styles.readingsCard__statusBar}
                ></LinearGradient>
              </View>
    )
}

const styles = StyleSheet.create({
readingsCard: {
    backgroundColor: theme.color_bg_card,
    borderRadius: theme.border_radius_rounded_small,
    marginBottom: theme.gutter_width_small,
  },
  readingsCard__item: {
    flexDirection: "row",
    padding: theme.gutter_width_small,
  },
  readingsCard__preMeal: {
    flex: 1,
  },
  readingsCard__icon: {
    fontSize: theme.icon_font_size_medium,
    color: theme.color_icon,
    marginBottom: theme.gutter_width_tiny,
  },
  readingsCard__reading: {
    fontFamily: theme.font_family_alpha_b,
    fontSize: theme.font_size_medium,
    color: theme.color_txt,
  },
  readingsCard__status: {
    flex: 1,
    alignItems: "center",
  },
  readingsCard__icon__status: {
    fontSize: theme.icon_font_size_bigger,
    color: theme.color_icon,
    marginBottom: theme.gutter_width_tiny,
  },
  readingsCard__icon__statusGreen: {
    color: theme.color_status_green,
  },
  readingsCard__icon__statusAmber: {
    color: theme.color_status_amber,
  },
  readingsCard__icon__statusRed: {
    color: theme.color_status_red,
  },
  readingsCard__status_dateContainer: {
    flexDirection: "row",
  },
  readingsCard__status_date: {
    fontFamily: theme.font_family_alpha_r,
    fontSize: theme.font_size_small,
    color: theme.color_txt,
  },
  readingsCard__postMeal: {
    flex: 1,
    alignItems: "flex-end",
  },
  readingsCard__statusBar: {
    height: 2,
    width: "100%",
    borderRadius: theme.border_radius_rounded_small,
  },
  readingsCard_hl: {
    marginLeft: theme.gutter_width_tiny,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.border_radius_circle,
  },
  readingsCard_hl__r: {
    backgroundColor: theme.color_status_red,
  },
  readingsCard_hl__a: {
    backgroundColor: theme.color_status_amber,
  },
  readingsCard_hl__g: {
    backgroundColor: theme.color_status_green,
  },
  readingCard_hl_icon: {
    fontSize: theme.icon_font_size_base,
    color: theme.color_white,
  },
});