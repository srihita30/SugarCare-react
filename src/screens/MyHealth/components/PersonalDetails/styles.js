import {StyleSheet} from 'react-native';
import * as theme from '../../../../styles/theme';

const styles = StyleSheet.create({
  container: {
    padding: theme.gutter_width_medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  msg_container: {
    flexDirection: 'row',
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
  row: {
    paddingBottom: 10,
  },
  row_flex: {
    flexDirection: 'row',
  },
  col: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  formGroup: {
    flexDirection: 'column',
    marginHorizontal: theme.gutter_width_small,
    marginBottom: theme.gutter_width_tiny,
  },
  formGroup_half: {
    // flex: 1,
    width: '45%',
    marginRight: '10%',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: theme.font_family_alpha_b,
    fontSize: theme.font_size_big,
    color: theme.color_txt,
  },
  subtitle: {
    fontFamily: theme.font_family_alpha_l,
    fontSize: theme.font_size_big,
    color: theme.color_txt,
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: theme.color_lightBlueGrey,
    marginVertical: theme.gutter_width_base,
    paddingTop: theme.gutter_width_small,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});

export default styles;
