import React from 'react';
import {
  View,
  TouchableOpacity,
} from 'react-native';
import { Constants } from 'expo';
import StarRating from 'react-native-star-rating';

/* node_modules */
import { Image } from 'react-native-expo-image-cache';
import Hyperlink from 'react-native-hyperlink';
import LinkifyIt from 'linkify-it';
import moment from 'moment';

/* from app */
import Avatar from 'app/src/components/Avatar';
import IconButton from 'app/src/components/IconButton';
import Text from 'app/src/components/Text';
import styles from './styles.js';

const linkify = new LinkifyIt();
linkify.add('#', {
  validate: (text, pos) => {
    const tail = text.slice(pos);

    if (!linkify.re.hashtag) {
      linkify.re.hashtag = new RegExp(/^[#]{0,2}?(w*[一-龠_ぁ-ん_ァ-ヴーａ-ｚＡ-Ｚa-zA-Z0-9]+|[a-zA-Z0-9_]+|[a-zA-Z0-9_]w*)/gi);
    }

    if (linkify.re.hashtag.test(tail)) {
      return tail.match(linkify.re.hashtag)[0].trim().length;
    }

    return 0;
  },
  normalize: (match) => {
    match.index += match.url.lastIndexOf('#');
    match.url = match.url.replace(/^#{0,}/, '#');
  },
});

export default class Item extends React.Component {
  static defaultProps = {
    type: 'photo',
    starCount: 0,
    titleText: '',
    text: '',
    fileUri: null,
    fileWidth: null,
    fileHeight: null,
    user: {
      uid: null,
      img: null,
      name: null,
    },
    timestamp: null,
    visible: true,
    onUserPress: () => { },
    onMorePress: () => { },
    onLikePress: () => { },
  }

  constructor(props) {
    super(props);

    this.state = {
      height: 0,
    };
  }

  onLayout = ({ nativeEvent }) => {
    const { height } = nativeEvent.layout;
    this.setState({ height });
  }

  getRelativeTime = (timestamp) => {
    const created = new Date(timestamp);
    const diff = Math.floor((new Date().getTime() - created.getTime()) / 1000);

    if (diff < 60) {
      return `${diff}s`;
    } if (diff < 3600) {
      return `${Math.floor(diff / 60)}m`;
    } if (diff < 86400) {
      return `${Math.floor(diff / 3600)}h`;
    }

    return `${created.getFullYear()}/${(`00${created.getMonth() + 1}`).slice(-2)}/${(`00${created.getDate()}`).slice(-2)}`;
  }

  render() {
    const {
      type,
      starCount,
      titleText,
      text,
      fileUri,
      user,
      timestamp,
      liked,
      visible,
      onUserPress,
      onMorePress,
      onLikePress,
      onLinkPress,
    } = this.props;
    const { height = 0 } = this.state;

    if (!visible && height > 0) {
      return <View style={{ height }} />;
    }

    const postedDate = moment(timestamp).format('MM月DD日');

    return (
      <View style={styles.container} onLayout={this.onLayout}>

        <TouchableOpacity style={styles.avatar} onPress={() => onUserPress(this.props)}>
          <Avatar uri={user.img} />
        </TouchableOpacity>

        <View style={styles.rightColumn}>
          {titleText != '' && (
            <Text style={styles.titleText}>{titleText}</Text>
          )}
          {text != '' && (
            <Hyperlink onPress={onLinkPress} linkify={linkify} linkStyle={{ color: '#2980b9' }}>
              <Text style={styles.text}>{postedDate}</Text>
            </Hyperlink>
          )}
          <View style={styles.stars}>
            <StarRating
              disabled
              maxStars={5}
              rating={starCount}
              starSize={12}
              buttonStyle={{ marginHorizontal: 2 }}
              fullStarColor="orange"
              emptyStarColor="orange"
            />
          </View>
          {/*
          <Text style={styles.time}>{this.getRelativeTime(timestamp)}</Text>
          */}
        </View>
      </View>
    );
  }
}
