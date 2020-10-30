import {StyleSheet} from 'react-native';
import * as theme from '../../../../styles/theme';

const styles = StyleSheet.create({
  container: {
    padding: theme.gutter_width_base,
    alignItems: 'center',
    justifyContent: 'center',
  },
  msg_container: {
    flexDirection: 'row',
  },
  primaryText: {
    fontFamily: theme.font_family_alpha_b,
    fontSize: 2 * theme.font_size_huge,
    // color: theme.color_txt_light,
  },
  secondaryText: {
    fontFamily: theme.font_family_alpha_l,
    fontSize: theme.font_size_huge,
    color: theme.color_txt,
  },
  msg: {
    marginLeft: 5,
    fontFamily: theme.font_family_alpha_l,
    fontSize: theme.font_size_big,
    color: theme.color_txt_light,
  },
  msg_icon: {
    color: theme.color_txt_light,
  },
});

export default styles;
