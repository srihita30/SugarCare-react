import {StyleSheet} from 'react-native';
import * as theme from '../../styles/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.color_bg,
    paddingVertical: theme.gutter_width_medium,
    paddingHorizontal: theme.gutter_width_tiny,
  },
  formGroup: {
    flexDirection: 'column',
    marginHorizontal: theme.gutter_width_small,
    marginBottom: theme.gutter_width_tiny,
  },
  inputStyle: {
    padding: theme.gutter_width_base,
    fontSize: theme.font_size_medium,
    fontFamily: theme.font_family_alpha_r,
    color: theme.color_black,
    borderRadius: theme.border_radius_rounded_small,
    borderColor: theme.color_lightBlueGrey,
    marginTop: theme.gutter_width_base
  },
  footer: {
    flexDirection: 'row',
    paddingLeft: theme.gutter_width_medium,
    paddingRight: theme.gutter_width_medium,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: theme.color_white,
    elevation: 10,
  },
  note: {
    textAlign: "center",
    fontFamily: theme.font_family_alpha_r,
    fontSize: theme.font_size_smaller,
    color: theme.color_txt_light,
    padding: theme.gutter_width_medium,
    paddingTop: 0,
    backgroundColor: theme.color_bg,
  },
  cta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    backgroundColor: theme.color_state_danger,
    color: theme.color_white,
    fontFamily: theme.font_family_alpha_b,
    fontSize: theme.font_size_base,
    flex: 1,
    textAlign: "center",
    margin: theme.gutter_width_medium,
    marginTop: 5,
    padding: theme.gutter_width_small,
    borderRadius: theme.border_radius_rounded,
  },
});

export default styles;
