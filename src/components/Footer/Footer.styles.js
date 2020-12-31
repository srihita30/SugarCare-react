import {StyleSheet} from 'react-native';
import * as theme from '../../styles/theme';

export default StyleSheet.create({
    footer: {
        flexDirection: 'row',
        paddingLeft: theme.gutter_width_medium,
        paddingRight: theme.gutter_width_medium,
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: theme.color_white,
        elevation: 10,
        backgroundColor: theme.color_white
      },
    icon:{
        paddingLeft: theme.gutter_width_huge,
        paddingRight: theme.gutter_width_huge,
    },
    icon_d: {
        alignSelf: 'flex-start'
    },
    icon_p: {
        alignContent: 'center',
        paddingLeft: theme.gutter_width_huge+20,
        paddingRight: theme.gutter_width_huge+20,
    },
    icon_focus: {
        color: '#1E90FF'
    },
    icon_unfocus: {
        color: '#000000'
    },
    icon_h: {
        alignContent: 'flex-end',
    },
})