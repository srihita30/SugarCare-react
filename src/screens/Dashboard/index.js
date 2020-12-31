import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import * as theme from '../../styles/theme';

import VideoPlayer from './components/VideoPlayer';
import RecentVideos from './components/RecentVideos';
import AllVideos from './components/AllVideos';
import styles from './styles';
import {Icon} from 'react-native-elements';
import routes from '../../constants/routes';
import LogoutModal from '../../components/LogoutModal/LogoutModal'
import Footer from '../../components/Footer/Footer';

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

  componentDidMount() {
    this.props.navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={styles.header_lha_icon}>
          <Icon  onPress={()=>{
            this.props.navigation.navigate(routes.MY_HEALTH)
            }} name="account-circle" type="material-community" size={30}/>
        </TouchableOpacity>
      )
    })
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

  closeModal = () => {
    this.setState({...this.state,showLogoutModal: false})
  }

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
        <LogoutModal visible={this.state.showLogoutModal} closeModal={this.closeModal} navigation={this.props.navigation}/>
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
        <Footer focus={1} navigation={this.props.navigation}/>
      </View>
    );
  }
}
