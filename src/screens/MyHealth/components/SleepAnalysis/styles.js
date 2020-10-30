import {StyleSheet} from 'react-native';
import * as theme from '../../../../styles/theme';

const styles = StyleSheet.create({
  msg_container: {
    padding: theme.gutter_width_medium,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  msg: {
    marginLeft: 5,
    fontFamily: theme.font_family_alpha_r,
    fontSize: theme.font_size_big,
    color: theme.color_txt_light,
  },
  msg_icon: {
    color: theme.color_txt_light,
  },
});

export default styles;
