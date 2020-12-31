import { StyleSheet } from 'react-native';
import * as theme from '../../styles/theme';

export default  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.color_bg,    
      alignItems: 'center',
      justifyContent: 'center',
    },
    container__login: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    tempStatusBar: {
    //   height:Expo.Constants.statusBarHeight,
      backgroundColor: theme.color_black,
    },
    primaryCard: {
      flex: 1,
      backgroundColor: theme.color_bg_card,
      alignSelf: 'stretch',
      flexDirection: 'column',
      padding: theme.gutter_width_big,
      alignItems: 'center'
    },
    logo: {
      height: 80,
      width: 300,
    },
    well: {
      margin: 2*theme.gutter_width_big,
    },
    form: {
      flexDirection: 'column',
      alignSelf: 'stretch',
    },
    formGroup: {
      flexDirection: 'column',
      marginBottom: theme.gutter_width_huge,
      marginTop: theme.gutter_width_huge,
    },
    formLabel: {
      color: theme.color_black,
      fontSize: theme.font_size_medium,
      fontWeight: theme.font_wt_base,
      letterSpacing: theme.ltr_spc_small,
      textAlign: 'center',
      fontFamily: theme.font_family_alpha_r
    },
    btn: {
      borderRadius: theme.border_radius_rounded_huge,
    },
    btn_primary: {
      backgroundColor: theme.color_alpha,
    },
    btn_huge: {
      padding: theme.gutter_width_big,
    },
    btn_primary_text: {
      color: theme.color_white,
      textAlign: 'center',
      fontSize: theme.font_size_medium,
      fontWeight: theme.font_wt_max
    },
    socialButton_text: {
      color: theme.color_black,
      fontSize: theme.font_size_smaller,
      marginTop: theme.gutter_width_tiny,
      textAlign: 'center'
    },
    register_text: {
        color: theme.color_state_info,
      fontSize: theme.font_size_smaller,
      marginTop: theme.gutter_width_tiny,
      textAlign: 'center'
    }
  });