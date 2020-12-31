import {StyleSheet} from 'react-native';
import * as theme from '../../styles/theme';

const styles = StyleSheet.create({
  floatingLabel: {
    fontSize: theme.font_size_micro,
    fontFamily: theme.font_family_alpha_b,
    color: theme.color_lightBlueGrey,
    marginLeft: theme.gutter_width_base,
    paddingLeft: theme.gutter_width_tiny,
    paddingRight: theme.gutter_width_tiny,
    bottom: -7,
    zIndex: 2,
    alignSelf: 'flex-start',
    display: 'none',
  },
  bg_white: {
    backgroundColor: theme.color_white,
  },
  floatingLabel__active: {
    display: 'flex',
  },
  floatingLabel__error: {
    color: theme.color_state_danger,
  },
  placeholderTextColor: {
    color: theme.color_lightBlueGrey,
  },
  labelStyle: {
    height: 0,
  },
  containerStyle: {
    borderRadius: theme.border_radius_rounded_small,
    borderWidth: 1,
    borderColor: theme.color_lightBlueGrey,
    paddingHorizontal: 0,
  },
  containerStyle__error: {
    borderColor: theme.color_state_danger,
  },
  inputContainerStyle: {
    borderBottomWidth: 0,
    borderRadius: theme.border_radius_rounded_small,
  },
  inputStyle: {
    padding: theme.gutter_width_base,
    fontSize: theme.font_size_medium,
    fontFamily: theme.font_family_alpha_r,
    color: theme.color_black,
    letterSpacing: 1.5,
    borderRadius: theme.border_radius_rounded_small,
  },
  inputStyle__disabled: {
    backgroundColor: theme.color_bg,
  },
  inputStyle__error: {
    color: theme.color_state_danger,
  },
});

export default styles;
