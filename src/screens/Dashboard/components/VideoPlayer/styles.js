import {StyleSheet, Dimensions} from 'react-native';
import * as theme from '../../../../styles/theme';
const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  videoPlayer_container: {
    height: 0.3 * height,
  },
  videoStyle: {
    flex: 1,
    alignSelf: 'stretch',
    width: '100%',
    height: '100%',
    backgroundColor: theme.color_txt_pale,
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
