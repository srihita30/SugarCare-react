import React from 'react';
import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';

import styles from './styles';

const EOD = require('../../../../assets/images/eod.png');

const AllVideos = ({onReload, onPress, data}) => {
  const keyExtractor = (item, index) => index.toString();
  const buildThumbnail = ID => `https://img.youtube.com/vi/${ID}/hqdefault.jpg`;

  const renderVideo = ({item}) => {
    const {id, url, title, details, runTime, thumbnail} = item;
    const imgUrl =
      thumbnail && thumbnail.length > 0 ? thumbnail : buildThumbnail(url);

    return (
      <TouchableOpacity
        key={id}
        style={styles.videoCard}
        onPress={() => onPress(url)}>
        <View>
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

  const renderFooter = () => {
    return <Image style={styles.eod} resizeMode="contain" source={EOD} />;
  };

  const renderList = () => {
    return (
      <FlatList
        keyExtractor={keyExtractor}
        data={data}
        renderItem={renderVideo}
        ListFooterComponent={renderFooter}
      />
    );
  };

  const renderHeader = () => {
    return (
      <View style={styles.titleBar}>
        <Text style={styles.titleBar_title}>All Videos</Text>
        <TouchableOpacity style={styles.titleBar_subTitle} onPress={onReload}>
          <Text style={styles.titleBar_subTitle}>Reload</Text>
        </TouchableOpacity>
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

export default AllVideos;
