import {StyleSheet} from 'react-native';
import * as theme from '../../styles/theme';

export default StyleSheet.create({
    modal: {
        borderRadius: theme.border_radius_rounded,
        margin: theme.gutter_width_small,
        borderWidth: 2,
        borderColor: theme.color_border,
        padding: theme.gutter_width_big,
        paddingTop: theme.gutter_width_base,
        marginTop: theme.gutter_width_medium,
        marginBottom: theme.gutter_width_medium,
        backgroundColor: 'white',
      },
      messageBox: {
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      message_main: {
        marginTop: theme.gutter_width_medium,
        fontFamily: theme.font_family_alpha_b,
        fontSize: theme.font_size_base,
        color: theme.color_txt,
        textTransform: 'uppercase',
        marginBottom: theme.gutter_width_medium,
      },
      btn: {
        borderRadius: theme.border_radius_rounded_big,
      },
      btn_primary: {
        backgroundColor: theme.color_black,
      },
      btn_secondary: {
        marginLeft: 30,
        backgroundColor: theme.color_white,
        borderColor: theme.color_black,
        borderWidth: 1
      },
      btn_medium: {
          padding: theme.gutter_width_base
      },
      btn_primary_text: {
        color: theme.color_white,
        textAlign: 'center',
        fontSize: theme.font_size_medium,
        fontWeight: theme.font_wt_max
      },
      btn_secondary_text: {
        color: theme.color_black,
        textAlign: 'center',
        fontSize: theme.font_size_medium,
        fontWeight: theme.font_wt_max
      },
      row: {
          flexDirection: 'row',
          justifyContent: 'space-between',
      }
})