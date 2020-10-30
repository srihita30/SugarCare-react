import {StyleSheet, Dimensions} from 'react-native';
import * as theme from '../../../../styles/theme';
const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  titleBar: {
    flexDirection: 'row',
    paddingHorizontal: theme.gutter_width_medium,
    paddingTop: theme.gutter_width_medium,
    alignItems: 'center',
  },
  titleBar_title: {
    flex: 1,
    fontFamily: theme.font_family_alpha_bl,
    fontSize: theme.font_size_medium,
    color: theme.color_txt,
  },
  slide: {
    width: 170,
    margin: theme.gutter_width_small,
    backgroundColor: theme.color_black,
    borderRadius: theme.border_radius_rounded,

    // elevation: 1,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.18,
    // shadowRadius: 1.0,
  },
  slide_thumbnail: {
    width: '100%',
    height: 95,
    borderTopLeftRadius: theme.border_radius_rounded,
    borderTopRightRadius: theme.border_radius_rounded,
    backgroundColor: theme.color_txt_pale,
  },
  slide_title: {
    fontFamily: theme.font_family_alpha_r,
    fontSize: theme.font_size_medium,
    color: theme.color_white,
    paddingHorizontal: theme.gutter_width_base,
    paddingVertical: theme.gutter_width_tiny,
    // paddingBottom: 0,
  },
  slide_time: {
    fontFamily: theme.font_family_alpha_r,
    fontSize: theme.font_size_small,
    color: theme.color_txt_pale,
    paddingHorizontal: theme.gutter_width_base,
    paddingBottom: theme.gutter_width_small,
  },
});

export default styles;
