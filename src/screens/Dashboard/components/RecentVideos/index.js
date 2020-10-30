import React from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import moment from 'moment';

import styles from './styles';

const RecentVideos = ({onPress, data}) => {
  const keyExtractor = (item, index) => index.toString();

  const buildThumbnail = ID => `https://img.youtube.com/vi/${ID}/hqdefault.jpg`;

  const renderVideo = ({item}) => {
    const {id, url, title, addedOn, thumbnail} = item;
    const imgUrl =
      thumbnail && thumbnail.length > 0 ? thumbnail : buildThumbnail(url);
    const createdTime =
      new Date(addedOn).getFullYear() < 2000
        ? '--'
        : moment(addedOn).format('DD-MMM-YYYY');
    return (
      <TouchableOpacity
        key={id}
        style={[styles.slide]}
        onPress={() => onPress(url)}>
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

  const renderList = () => {
    const recentVideos = data.filter(video => video.isRecent);
    return (
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={keyExtractor}
        data={recentVideos}
        renderItem={renderVideo}
      />
    );
  };
  const renderHeader = () => {
    return (
      <View style={styles.titleBar}>
        <Text style={styles.titleBar_title}>Recently Uploaded</Text>
      </View>
    );
  };

  return (
    <View>
      {renderHeader()}
      {renderList()}
    </View>
  );
};

export default RecentVideos;
