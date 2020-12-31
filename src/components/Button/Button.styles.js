import { StyleSheet } from 'react-native';
import * as theme from '../../styles/theme';

export default  StyleSheet.create({
    formGroup: {
        flexDirection: 'column',
        marginBottom: theme.gutter_width_huge,
        marginTop: theme.gutter_width_huge,
      },
  btn: {
    borderRadius: theme.border_radius_rounded_huge,
  },
  btn_primary: {
    backgroundColor: theme.color_alpha,
  },
  btn_disabled: {
    opacity: 0.5,
  },
  btn_huge: {
    padding: theme.gutter_width_big,
  },
  btn_primary_text: {
    color: theme.color_white,
    textAlign: 'center',
    fontSize: theme.font_size_medium,
    fontWeight: theme.font_wt_max
  },
});