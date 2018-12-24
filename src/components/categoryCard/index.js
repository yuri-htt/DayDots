import React from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';

import images from 'app/src/images';
import styles from './styles';

export default class CategoryCard extends React.Component {
  static defaultProps = {
    extraData: {},
    renderItem: () => { },
  }

  render() {
    const {
      categoryName,
    } = this.props;

    return (
      <View style={styles.categoryCard}>
        {this.getCategoryIcon(categoryName)}
        <Image
          style={styles.icon}
          source={this.getCategoryIcon(categoryName)}
        />
        <Text style={styles.categoryCardTxt}>{categoryName}</Text>
      </View>
    );
  }

  getCategoryIcon(category) {
    let icon;
    switch (category) {
      case 'カクテル':
        icon = images.cooktail;
        break;
      case 'ワイン':
        icon = images.wine;
        break;
      case 'ビール':
        icon = images.beer;
        break;
      case '日本酒':
        icon = images.sake;
        break;
      case '焼酎':
        icon = images.syotyu;
        break;
      case 'ウイスキー':
        icon = images.whisky;
        break;
      default:
        icon = images.cooktail;
        break;
    }
    return icon;
  }
}
