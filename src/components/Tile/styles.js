import {StyleSheet} from 'react-native';
import * as theme from '../../styles/theme';

export default StyleSheet.create({
  container: {
    marginHorizontal: theme.gutter_width_base,
    marginVertical: theme.gutter_width_tiny,
  },
  header_container: {
    paddingVertical: theme.gutter_width_small,
    paddingHorizontal: theme.gutter_width_tiny,
  },
  titleBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleBar_title: {
    flex: 1,
    fontFamily: theme.font_family_alpha_bl,
    fontSize: theme.font_size_medium,
    color: theme.color_txt,
  },
  titleBar_action_container: {
    backgroundColor: theme.color_white,
    borderRadius: theme.border_radius_rounded_huge,
    paddingHorizontal: theme.gutter_width_medium,
    paddingVertical: theme.gutter_width_tiny,
  },
  titleBar_action: {
    fontFamily: theme.font_family_alpha_b,
    fontSize: theme.font_size_base,
    color: theme.color_txt,
  },
  titleBar_subtitle: {
    fontFamily: theme.font_family_alpha_r,
    fontSize: theme.font_size_base,
    color: theme.color_txt_light,
  },
  content_container: {
    backgroundColor: theme.color_white,
    padding: theme.gutter_width_base,
    borderRadius: theme.border_radius_rounded,
  },
  shadow: {
    // elevation: theme.gutter_width_small,
    // shadowColor: theme.color_black,
    // shadowOffset: {
    //   width: 2,
    //   height: 5,
    // },
    // shadowOpacity: 0.34,
    // shadowRadius: 6.27,
    shadowColor: theme.color_black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: theme.gutter_width_tiny,
  },
});
