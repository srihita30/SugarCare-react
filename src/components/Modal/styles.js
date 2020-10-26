import {StyleSheet} from 'react-native';
import * as theme from '../../styles/theme';

export default StyleSheet.create({
  container: {
    backgroundColor: theme.color_white,
    // margin: 15,
    // marginBottom: 35,
    // borderRadius: theme.gutter_width_big,
    borderTopLeftRadius: theme.gutter_width_big,
    borderTopRightRadius: theme.gutter_width_big,
  },
  content: {},
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  dragBar: {
    height: theme.gutter_width_tiny,
    width: 2 * theme.gutter_width_huge,
    borderRadius: theme.gutter_width_big,
    backgroundColor: theme.color_black,
    alignSelf: 'center',
    marginTop: theme.gutter_width_small,
  },
  swipeDirectionHelp: {
    textAlign: 'center',
    fontFamily: theme.font_family_alpha_sb,
    fontSize: theme.font_size_medium,
    color: theme.color_white,
    marginBottom: theme.gutter_width_tiny,
  },
});
