import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import moment from 'moment';
import {WebView} from 'react-native-webview';

const API_URL_GET_VIDEOS =
  'https://dev-api.rokahub.com/school/project/v1/getRecords';

import styles from './styles';
const APP_LOGO = require('../../assets/images/sugarcare_v.png');
const EOD = require('../../assets/images/eod.png');

export default class VideoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      isLoadingVideos: true,
      isError: false,
      selectedVideoId: '',
    };

    this.fetchVideos();
  }

  fetchVideos = () => {
    this.setState({isLoadingVideos: true, selectedVideoId: ''});
    fetch(API_URL_GET_VIDEOS)
      .then(res => res.json())
      .then(data => {
        data.records.sort(function(a, b) {
          return b.addedOn - a.addedOn;
        });

        if (data.status === 'success') {
          this.setState({isLoadingVideos: false, videos: [...data.records]});
        } else {
          this.setState({isLoadingVideos: false, isError: true});
        }
      });
  };

  buildThumbnail = ID => `https://img.youtube.com/vi/${ID}/hqdefault.jpg`;

  buildUrl = ID => {
    return (
      '<html><meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" /><iframe src="https://www.youtube.com/embed/' +
      ID +
      '?modestbranding=1&playsinline=1&showinfo=1&rel=0" frameborder="0" style="overflow:hidden;overflow-x:hidden;overflow-y:hidden;height:100%;width:100%;position:absolute;top:0px;left:0px;right:0px;bottom:0px" height="100%" width="100%"></iframe></html>'
    );
  };

  showVideoPlayer = selectedVideoId => {
    this.setState({selectedVideoId});
  };

  renderHeader = () => {
    return (
      <View style={styles.header}>
        <Image
          resizeMode="contain"
          source={APP_LOGO}
          style={styles.headerLogo}
        />
      </View>
    );
  };

  renderLoader = msg => {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="black" />
        <Text style={styles.videoCard_desc}>{msg}...</Text>
      </View>
    );
  };

  renderEmpty = msg => {
    return (
      <View style={styles.empty}>
        <Text style={styles.videoCard_desc}>{msg}</Text>
      </View>
    );
  };

  recentVideoKeyExtractor = (item, index) => index.toString();

  renderRecentVideoItem = ({item}) => {
    const {
      id,
      url,
      title,
      details,
      addedOn,
      runTime,
      thumbnail,
      isRecent,
    } = item;
    const imgUrl =
      thumbnail && thumbnail.length > 0 ? thumbnail : this.buildThumbnail(url);
    const createdTime =
      new Date(addedOn).getFullYear() < 2000
        ? '--'
        : moment(addedOn).format('DD-MMM-YYYY');
    return (
      <TouchableOpacity
        style={[styles.slide]}
        onPress={this.showVideoPlayer.bind(this, url)}>
        <Image
          style={styles.slide_thumbnail}
          resizeMode="cover"
          source={{uri: imgUrl}}
        />
        <Text style={styles.slide_title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.slide_time}>{createdTime}</Text>
      </TouchableOpacity>
    );
  };

  renderRecentVideosList = () => {
    const {videos, isLoadingVideos} = this.state;

    const recentVideos = videos.filter(video => video.isRecent);

    if (isLoadingVideos) {
      return this.renderLoader('Loading recent videos');
    }

    if (recentVideos && recentVideos.length === 0) {
      return this.renderEmpty('No recent videos found!');
    }

    return (
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={this.recentVideoKeyExtractor}
        data={recentVideos}
        renderItem={this.renderRecentVideoItem}
      />
    );
  };

  renderRecentVideos = () => {
    return (
      <View>
        <View style={styles.titleBar}>
          <Text style={styles.titleBar_title}>Recently Uploaded</Text>
        </View>
        {this.renderRecentVideosList()}
      </View>
    );
  };

  allVideoKeyExtractor = (item, index) => index.toString();

  renderAllVideoItem = ({item}) => {
    const {id, url, title, details, runTime, thumbnail} = item;
    const imgUrl =
      thumbnail && thumbnail.length > 0 ? thumbnail : this.buildThumbnail(url);

    return (
      <TouchableOpacity
        style={styles.videoCard}
        onPress={this.showVideoPlayer.bind(this, url)}>
        <View style={styles.videoCard_header}>
          <Image
            style={styles.videoCard_thumbnail}
            resizeMode="cover"
            source={{uri: imgUrl}}
          />
          <Text style={styles.videoCard_duration}>{runTime}</Text>
        </View>
        <View style={styles.videoCard_body}>
          <View style={styles.videoCard_details}>
            <Text style={styles.videoCard_title}>{title}</Text>
            <Text style={styles.videoCard_desc} numberOfLines={3}>
              {details}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderAllVideosFooter = () => {
    return <Image style={styles.eod} resizeMode="contain" source={EOD} />;
  };

  renderAllVideosList = () => {
    const {videos, isLoadingVideos} = this.state;

    if (isLoadingVideos) {
      return this.renderLoader('Loading all videos');
    }

    if (videos.length === 0) {
      return this.renderEmpty('No videos found!');
    }

    return (
      <FlatList
        keyExtractor={this.allVideoKeyExtractor}
        data={videos}
        renderItem={this.renderAllVideoItem}
        ListFooterComponent={this.renderAllVideosFooter}
      />
    );
  };

  renderAllVideos = () => {
    return (
      <View>
        <View style={styles.titleBar}>
          <Text style={styles.titleBar_title}>All Videos</Text>
          <TouchableOpacity
            style={styles.titleBar_subTitle}
            onPress={this.fetchVideos}>
            <Text style={styles.titleBar_subTitle}>Reload</Text>
          </TouchableOpacity>
        </View>
        {this.renderAllVideosList()}
      </View>
    );
  };

  renderBody = () => {
    const {isLoadingVideos} = this.state;
    return (
      <View style={styles.body} showsVerticalScrollIndicator={false}>
        {this.renderYouTubePlayer()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isLoadingVideos}
              onRefresh={this.fetchVideos}
            />
          }>
          {this.renderRecentVideos()}
          {this.renderAllVideos()}
        </ScrollView>
      </View>
    );
  };

  onVideoPlayerModalClose = () => {
    this.setState({selectedVideoId: ''});
  };

  closePlayerAction = () => {
    return (
      <TouchableOpacity
        style={styles.closePlayer_container}
        onPress={this.onVideoPlayerModalClose}>
        <Text style={styles.closePlayer_text}>CLOSE</Text>
      </TouchableOpacity>
    );
  };

  renderYouTubePlayer = () => {
    const {selectedVideoId} = this.state;
    if (selectedVideoId) {
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
              scalesPageToFit={true}
              // mediaPlaybackRequiresUserAction={false}
              allowsInlineMediaPlayback
              source={{
                html: this.buildUrl(this.state.selectedVideoId),
              }}
            />
          </View>
          {this.closePlayerAction()}
        </View>
      );
    }

    return null;
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderBody()}
      </View>
    );
  }
}
