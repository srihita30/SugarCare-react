import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {WebView} from 'react-native-webview';

import styles from './styles';

const VideoPlayer = ({id, onClose}) => {
  const buildUrl = ID => {
    return (
      '<html><meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" /><iframe src="https://www.youtube.com/embed/' +
      ID +
      '?modestbranding=1&playsinline=1&showinfo=1&rel=0" frameborder="0" style="overflow:hidden;overflow-x:hidden;overflow-y:hidden;height:100%;width:100%;position:absolute;top:0px;left:0px;right:0px;bottom:0px" height="100%" width="100%"></iframe></html>'
    );
  };

  const closePlayerAction = () => {
    return (
      <TouchableOpacity style={styles.closePlayer_container} onPress={onClose}>
        <Text style={styles.closePlayer_text}>CLOSE</Text>
      </TouchableOpacity>
    );
  };

  if (id) {
    return (
      <View>
        <View style={styles.videoPlayer_container}>
          <WebView
            automaticallyAdjustContentInsets={true}
            style={styles.videoStyle}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            decelerationRate="normal"
            javaScriptEnabledAndroid={true}
            onShouldStartLoadWithRequest={e => {
              return true;
            }}
            startInLoadingState={true}
            // scalesPageToFit={true}
            mediaPlaybackRequiresUserAction={false}
            allowsInlineMediaPlayback
            source={{
              html: buildUrl(id),
            }}
          />
        </View>
        {closePlayerAction()}
      </View>
    );
  }
  return null;
};

export default VideoPlayer;
