import {StyleSheet, Dimensions} from 'react-native';
import * as theme from '../../../../styles/theme';

const {height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  content_container: {
    height: 0.4 * height,
  },
  container: {
    padding: theme.gutter_width_medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  msg_container: {
    flexDirection: 'row',
  },
  primaryText: {
    fontFamily: theme.font_family_alpha_b,
    fontSize: theme.font_size_medium,
    color: theme.color_txt,
  },
  secondaryText: {
    fontFamily: theme.font_family_alpha_l,
    fontSize: theme.font_size_base,
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
