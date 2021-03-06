import {StyleSheet, Dimensions} from 'react-native';
import * as theme from '../../styles/theme';
const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.color_bg,
  },
  body: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: theme.color_bg,
  },
  header: {
    flexDirection: 'row',
    paddingLeft: theme.gutter_width_medium,
    paddingRight: theme.gutter_width_medium,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.color_white,
    elevation: 10,
    // borderBottomWidth: 0.3,
    // borderBottomColor: theme.color_txt_light,
  },
  headerLogo: {
    flex: 1,
    height: 60,
    width: 90,
  },
  header_rha_icon: {
    fontSize: theme.icon_font_size_big,
    color: theme.color_beta,
  },
  header_lha_icon: {
    fontSize: theme.icon_font_size_big,
    color: theme.color_alpha,
  },
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
  slides: {
    flexDirection: 'row',
  },
  slide: {
    width: 170,
    margin: theme.gutter_width_small,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    backgroundColor: theme.color_black,
    borderRadius: theme.border_radius_rounded,
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
  videoCard: {
    margin: theme.gutter_width_medium,
    borderRadius: theme.border_radius_rounded,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
  },
  videoCard_header: {},
  videoCard_thumbnailContainer: {
    width: '100%',
    height: 200,
    position: 'absolute',
    top: 0,
    left: 0,
    borderTopLeftRadius: theme.border_radius_rounded,
    borderTopRightRadius: theme.border_radius_rounded,
  },
  videoCard_thumbnail: {
    width: '100%',
    height: 175,
    borderTopLeftRadius: theme.border_radius_rounded,
    borderTopRightRadius: theme.border_radius_rounded,
    backgroundColor: theme.color_bg,
    // flex: 1,
    // alignSelf: 'stretch',
    // width: '100%',
    // height: 0.35 * Dimensions.get('window').height,
    // borderTopRightRadius: 15,
    // borderTopLeftRadius: 15,
    // // borderRadius: 15,
  },
  videoCard_play: {
    position: 'absolute',
    top: 100 - 0.5 * theme.icon_font_size_huge,
    left: '45%',
  },
  videoCard_playIcon: {
    fontSize: theme.icon_font_size_huge,
    color: theme.color_white,
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
  videoCard_views: {},
  videoCard_viewsCount: {},
  videoCard_viewsIndicator: {},
  videoCard_footer: {
    backgroundColor: theme.color_bg_card,
    padding: theme.gutter_width_base,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: theme.border_radius_rounded,
    borderBottomRightRadius: theme.border_radius_rounded,
    borderTopWidth: 1,
    borderTopColor: theme.color_border,
  },
  videoCard_footerBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoCard_footerBtn_icon: {
    fontSize: theme.icon_font_size_big,
    color: theme.color_txt_light,
  },
  videoCard_footerBtn_iconLikeActive: {
    color: theme.color_state_danger,
  },
  videoCard_footerBtn_iconShareActive: {
    color: theme.color_state_success,
  },
  videoCard_footerBtn_iconWatchActive: {
    color: theme.color_state_info,
  },
  eod: {
    height: 300,
    width: '100%',
    alignSelf: 'stretch',
    marginTop: theme.gutter_width_medium,
  },
  eodText: {
    alignSelf: 'stretch',
    textAlign: 'center',
    fontFamily: theme.font_family_alpha_b,
    fontSize: theme.font_size_base,
    color: theme.color_txt,
    padding: theme.gutter_width_medium,
  },
  slide_playIcon: {
    fontSize: theme.icon_font_size_basex,
    color: theme.color_white,
    paddingLeft: theme.gutter_width_small,
  },
  loading: {
    paddingVertical: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  videoPlayerModal_container: {
    height: 0.5 * height,
    // paddingBottom: 50,
  },
  videoPlayer_container: {
    // flex: 1,
    height: 0.3 * height,
    // borderWidth: 0.3,
    // borderColor: theme.color_black,
    // margin: 15,
    // borderRadius: theme.gutter_width_big,
    // padding: 5,
  },
  videoStyle: {
    flex: 1,
    alignSelf: 'stretch',
    width: '100%',
    height: '100%',
    backgroundColor: theme.color_txt_pale,
    // borderTopRightRadius: 15,
    // borderTopLeftRadius: 15,
    // borderRadius: theme.gutter_width_big,
  },
  closePlayer_container: {
    borderBottomLeftRadius: theme.gutter_width_base,
    borderBottomRightRadius: theme.gutter_width_base,
    backgroundColor: theme.color_bg_danger,
    width: '30%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closePlayer_text: {
    padding: 10,
    color: 'white',
    fontFamily: theme.font_family_alpha_bl,
    fontSize: theme.font_size_base,
  },
});

export default styles;
