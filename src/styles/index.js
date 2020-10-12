import {StyleSheet} from 'react-native';
import * as theme from './theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color_white,
  },
  update_container: {
    padding: theme.gutter_width_big,
    paddingBottom: 2 * theme.gutter_width_huge,
  },
  update_title: {
    fontFamily: theme.font_family_alpha_b,
    fontSize: theme.font_size_bigger,
    color: theme.color_txt,
    marginBottom: theme.gutter_width_huge,
    textAlign: 'center',
  },
  update_desc: {
    fontFamily: theme.font_family_alpha_r,
    fontSize: theme.font_size_base,
    color: theme.color_txt_light,
    textAlign: 'center',
  },
  update_actions: {
    marginTop: theme.gutter_width_huge,
    flexDirection: 'row',
  },
  update_cancel_container: {
    flex: 1,
    backgroundColor: theme.color_state_danger,
    marginHorizontal: theme.gutter_width_small,
    padding: theme.gutter_width_base,
    borderRadius: theme.gutter_width_huge,
  },
  update_action_container: {
    flex: 1,
    backgroundColor: theme.color_black,
    marginHorizontal: theme.gutter_width_small,
    padding: theme.gutter_width_base,
    borderRadius: theme.gutter_width_huge,
  },
  update_action_text: {
    fontFamily: theme.font_family_alpha_b,
    color: theme.color_white,
    fontSize: theme.font_size_base,
    textAlign: 'center',
  },
  shadow: {
    elevation: theme.gutter_width_small,
    shadowColor: theme.color_black,
    shadowOffset: {
      width: theme.gutter_width_tiny,
      height: theme.gutter_width_tiny,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
  },
});

export default styles;
