import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';

import VideoPlayer from './components/VideoPlayer';
import RecentVideos from './components/RecentVideos';
import AllVideos from './components/AllVideos';
import styles from './styles';

// const API_URL_GET_VIDEOS = 'http://demo8992196.mockable.io/getVideos';
const API_URL_GET_VIDEOS =
  'https://dev-api.rokahub.com/school/project/v1/getRecords';

export default class Dashboard extends Component {
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

  onVideoPlayerModalClose = () => {
    this.setState({selectedVideoId: ''});
  };

  showVideoPlayer = selectedVideoId => {
    this.setState({selectedVideoId});
  };

  render() {
    const {isLoadingVideos, selectedVideoId, videos} = this.state;

    if (isLoadingVideos) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="black" />
          <Text style={styles.videoCard_desc}>Loading videos</Text>
        </View>
      );
    }

    if (videos.length === 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.videoCard_desc}>No videos found</Text>
        </View>
      );
    }

    return (
      <View style={styles.body}>
        <VideoPlayer
          id={selectedVideoId}
          onClose={this.onVideoPlayerModalClose}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isLoadingVideos}
              onRefresh={this.fetchVideos}
            />
          }>
          <RecentVideos onPress={this.showVideoPlayer} data={videos} />
          <AllVideos
            onReload={this.fetchVideos}
            onPress={this.showVideoPlayer}
            data={videos}
          />
        </ScrollView>
      </View>
    );
  }
}
