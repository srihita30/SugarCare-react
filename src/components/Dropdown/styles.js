import {StyleSheet} from 'react-native';
import * as theme from '../../styles/theme';

const styles = StyleSheet.create({
  inputContainerStyle: {
    borderBottomColor: 'transparent',
  },
  dropdownOffset: {
    top: 15,
    left: 0,
  },
  selectedItemColor: {
    color: theme.color_black,
  },
  textInput: {
    // fontFamily: theme.font_family_alpha_sb,
    // fontSize: theme.font_size_medium,
    // color: theme.color_black,
    // letterSpacing: 1,

    fontFamily: theme.font_family_alpha_sb,
    color: theme.color_black,
    letterSpacing: 1.5,
  },
  pickerContainer: {
    borderRadius: theme.border_radius_rounded_small,
    borderWidth: 1,
    borderColor: theme.color_lightBlueGrey,
    padding: theme.gutter_width_base,

    // color: theme.color_black,
    // fontSize: theme.font_size_medium,
    // fontFamily: theme.font_family_alpha_sb,

    // fontFamily: theme.font_family_alpha_sb,
    // fontSize: 16,
    // color: theme.color_black,
    // letterSpacing: 1.5,

    height: 50,
    justifyContent: 'center',
  },
  pickerContainer_error: {
    borderColor: theme.color_state_danger,
  },
  label: {
    fontSize: theme.font_size_micro,
    fontFamily: theme.font_family_alpha_b,
    color: theme.color_lightBlueGrey,
    marginLeft: theme.gutter_width_base,
    paddingLeft: theme.gutter_width_tiny,
    paddingRight: theme.gutter_width_tiny,
    bottom: -7,
    zIndex: 2,
    alignSelf: 'flex-start',
    backgroundColor: theme.color_white,
    display: 'flex',
  },
  floatingLabel__error: {
    color: theme.color_state_danger,
  },
});

export default styles;
