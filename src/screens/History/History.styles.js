import {StyleSheet} from 'react-native';
import * as theme from '../../styles/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.color_bg,
    paddingVertical: theme.gutter_width_medium,
    paddingHorizontal: theme.gutter_width_tiny,
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
});

export default styles;
