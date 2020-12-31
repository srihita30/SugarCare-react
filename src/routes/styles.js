import {StyleSheet} from 'react-native';
import * as theme from '../styles/theme';

const styles = StyleSheet.create({
  headerIconContainerRight: {
    marginRight: 10,
    width: 24,
    height: 24,
  },
  headerIconContainerLeft: {
    marginLeft: 10,
    width: 24,
    height: 24,
  },
  headerIcon: {
    color: theme.color_white,
    width: 24,
    height: 24,
  },
  headerTitleStyle: {
    // color: theme.color_white,
    // textAlign: 'center',
    // flex: 1,
    // fontFamily: theme.font_family_alpha_sb,
  },
  headerStyle: {
    backgroundColor: theme.color_white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  header__component: {
    flex: 1,
  },
  header__component_text: {
    fontFamily: theme.font_family_alpha_sb,
    fontSize: theme.font_size_medium,
    color: theme.color_white,
    textAlign: 'center',
  },
  footer_text: {
    fontFamily: theme.font_family_alpha_b,
    fontSize: theme.font_size_small,
  },
  footer_tabBar: {
    backgroundColor: theme.color_white,
  },
  footer_tabBar__active: {
    // color: theme.color_white,
  },
  header: {
    flexDirection: 'row',
    paddingLeft: theme.gutter_width_medium,
    paddingRight: theme.gutter_width_medium,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.color_white,
  },
  headerLogo: {
    height: 50,
    width: 160,
  },
});

export default styles;
