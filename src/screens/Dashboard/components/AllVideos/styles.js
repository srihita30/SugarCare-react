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
  titleBar_subTitle: {
    fontFamily: theme.font_family_alpha_m,
    fontSize: theme.font_size_base,
    color: theme.color_txt,
    backgroundColor: theme.color_bg_card,
    borderRadius: 25,
    paddingHorizontal: theme.gutter_width_base,
    paddingVertical: 3,
  },
  videoCard: {
    margin: theme.gutter_width_medium,
    borderRadius: theme.border_radius_rounded,
    // elevation: 10,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
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
  videoCard_thumbnail: {
    width: '100%',
    height: 175,
    borderTopLeftRadius: theme.border_radius_rounded,
    borderTopRightRadius: theme.border_radius_rounded,
    backgroundColor: theme.color_txt_pale,
  },
  videoCard_duration: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    color: theme.color_white,
    padding: theme.gutter_width_tiny,
    paddingLeft: theme.gutter_width_base,
    paddingRight: theme.gutter_width_base,
    backgroundColor: theme.color_black,
  },
  videoCard_body: {
    backgroundColor: theme.color_bg_card,
    padding: theme.gutter_width_base,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: theme.border_radius_rounded,
    borderBottomRightRadius: theme.border_radius_rounded,
  },
  videoCard_details: {
    flex: 1,
  },
  videoCard_title: {
    fontFamily: theme.font_family_alpha_b,
    fontSize: theme.font_size_big,
    color: theme.color_txt,
    marginBottom: theme.gutter_width_small,
  },
  videoCard_desc: {
    fontFamily: theme.font_family_alpha_r,
    fontSize: theme.font_size_base,
    color: theme.color_txt_light,
  },
  eod: {
    height: 300,
    width: '100%',
    alignSelf: 'stretch',
    marginTop: theme.gutter_width_medium,
    // marginBottom: -30,
  },
});

export default styles;
