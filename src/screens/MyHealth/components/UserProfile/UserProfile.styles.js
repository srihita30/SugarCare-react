import { StyleSheet } from "react-native";
import * as theme from '../../../../styles/theme';

export default StyleSheet.create({
    container: {
      marginTop: 40,
      flex: 1,
    },
    body: {
      alignSelf: "stretch",
      backgroundColor: theme.color_bg,
    },
    header: {
      flexDirection: "row",
      paddingLeft: theme.gutter_width_medium,
      paddingRight: theme.gutter_width_medium,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.color_white,
      elevation: 10,
    },
    headerLogo: {
      flex: 1,
      height: 60,
      width: 90,
    },
    header_rha_icon: {
      fontSize: theme.icon_font_size_big,
      color: theme.color_beta,
    },
    header_lha_icon: {
      fontSize: theme.icon_font_size_big,
      color: theme.color_alpha,
    },
    titleBar: {
      flexDirection: "row",
      padding: theme.gutter_width_medium,
      alignItems: "center",
    },
    titleBar_title: {
      flex: 1,
      fontFamily: theme.font_family_alpha_bl,
      fontSize: theme.font_size_medium,
      color: theme.color_txt,
    },
    titleBar_subTitle: {
      fontFamily: theme.font_family_alpha_m,
      fontSize: theme.font_size_base,
      color: theme.color_txt,
      backgroundColor: theme.color_bg_card,
      paddingLeft: theme.gutter_width_base,
      paddingRight: theme.gutter_width_base,
    },
    userCard: {
      justifyContent: "center",
      alignItems: "center",
      padding: theme.gutter_width_base,
      backgroundColor: theme.color_bg_card,
    },
    userCard_nameCard: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    userCard_nameCard__status: {
      marginLeft: theme.gutter_width_tiny,
    },
    userCard_thumbnail: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.color_white,
      width: 100,
      height: 100,
      borderRadius: 80,
      borderWidth: 4,
      borderColor: theme.color_white,
    },
    userCard_status: {
      borderRadius: theme.border_radius_rounded,
      paddingLeft: theme.gutter_width_small,
      paddingRight: theme.gutter_width_small,
      color: theme.color_white,
      fontFamily: theme.font_family_alpha_b,
      fontSize: theme.font_size_small,
      marginTop: 5,
    },
    userCard_status_green: {
      backgroundColor: theme.color_status_green,
    },
    userCard_status_amber: {
      backgroundColor: theme.color_status_amber,
    },
    userCard_status_red: {
      backgroundColor: theme.color_status_red,
    },
    userCard_name: {
      fontFamily: theme.font_family_alpha_b,
      fontSize: theme.font_size_bigger,
      color: theme.color_txt,
    },
    userCard_desc: {
      margin: theme.gutter_width_base,
      fontFamily: theme.font_family_alpha_r,
      fontSize: theme.font_size_base,
      color: theme.color_txt_light,
      textAlign: "center",
      marginBottom: 0,
    },
    descCard: {
      flexDirection: "row",
      alignItems: "center",
      padding: theme.gutter_width_huge,
      paddingTop: theme.gutter_width_small,
      marginTop: 0,
      backgroundColor: theme.color_bg_card,
    },
    descCard_cell: {
      flex: 1,
    },
    descCard_label: {
      textAlign: "center",
      fontFamily: theme.font_family_alpha_r,
      fontSize: theme.font_size_small,
      color: theme.color_txt_light,
    },
    descCard_value: {
      textAlign: "center",
      fontFamily: theme.font_family_alpha_b,
      fontSize: theme.font_size_medium,
      color: theme.color_txt,
      marginTop: theme.gutter_width_tiny,
    },
    descCard_label__left: {
      fontFamily: theme.font_family_alpha_r,
      fontSize: theme.font_size_small,
      color: theme.color_txt_light,
    },
    descCard_value__left: {
      fontFamily: theme.font_family_alpha_b,
      fontSize: theme.font_size_medium,
      color: theme.color_txt,
      marginTop: theme.gutter_width_tiny,
    },
    descCard_label__right: {
      textAlign: "right",
      fontFamily: theme.font_family_alpha_r,
      fontSize: theme.font_size_small,
      color: theme.color_txt_light,
    },
    descCard_value__right: {
      textAlign: "right",
      fontFamily: theme.font_family_alpha_b,
      fontSize: theme.font_size_medium,
      color: theme.color_txt,
      marginTop: theme.gutter_width_tiny,
    },
    userProfileStatusBar: {
      width: "100%",
      height: 3,
    },
    readings: {
      margin: theme.gutter_width_medium,
    },
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
  