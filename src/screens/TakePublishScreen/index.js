import React from 'react';
import {
  View,
  ScrollView,
  Image,
  Keyboard,
  Alert,
  TouchableOpacity,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import { Camera, ImagePicker, Permissions } from 'expo';
import { withNavigationFocus } from 'react-navigation';
import { connect } from 'react-redux';

/* from app */
import IconButton from 'app/src/components/IconButton';
import TextInput from 'app/src/components/TextInput';
import firebase from 'app/src/firebase';
import GA from 'app/src/analytics';
import I18n from 'app/src/i18n';
import styles from './styles';

@withNavigationFocus
@connect(state => ({
  photo: state.photo,
}))
export default class TakePublishScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: I18n.t('TakePublish.title'),
    headerRight: navigation.getParam('headerRight', null),
  })

  constructor(props) {
    super(props);

    this.state = {
      titleText: '',
      text: '',
      starCount: 0,
    };

    GA.ScreenHit('TakePublish');
  }

  componentDidMount() {
    const { navigation } = this.props;

    navigation.setParams({
      headerRight: <IconButton name="ios-send-outline" onPress={this.onPublish} />,
    });
  }

  onChangeTitleText = (titleText) => {
    this.setState({ titleText });
  }

  onChangeText = (text) => {
    this.setState({ text });
  }

  onPublish = async () => {
    const {
      starCount,
      titleText,
      text,
    } = this.state;
    const { navigation, photo } = this.props;

    Keyboard.dismiss();

    navigation.setParams({
      headerRight: <IconButton name="ios-send" />,
    });

    const result = await firebase.createPost(starCount, titleText, text, photo);

    navigation.setParams({
      headerRight: <IconButton name="ios-send-outline" onPress={this.onPublish} />,
    });

    if (result.error) {
      Alert.alert(I18n.t('TakePublish.alert'), result.error);
    } else {
      navigation.navigate('HomeTab');
      navigation.dispatch({ type: 'PHOTO_DELETE' });
      this.setState({
        titleText: '',
        text: '',
        starCount: 0,
      });
    }
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }

  onPressCloseBtn() {
    const { navigation } = this.props;
    navigation.dispatch({ type: 'PHOTO_DELETE' });
    navigation.push('TakeModal');
  }

  onTabPress = async (mode = 'photo', headerTitle = I18n.t('Take.tab2')) => {
    const { flashMode } = this.state;
    const { navigation } = this.props;

    if (mode !== 'library') {
      this.setState({
        flashMode: (mode === 'photo') ? flashMode : Camera.Constants.FlashMode.off,
      });

      navigation.setParams({
        headerTitle,
      });
    } else {
      const permissions = Permissions.CAMERA_ROLL;
      const { status } = await Permissions.askAsync(permissions);

      if (status) {
        const photo = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [1, 1],
        });

        if (!photo.cancelled) {
          navigation.push('TakePublish', { mode: 'photo', photo });
        }
      }
    }
  }

  render() {
    const {
      titleText,
      text,
      starCount,
    } = this.state;
    const { navigation, photo } = this.props;

    return (
      <ScrollView scrollEnabled={false} style={styles.container} contentContainerstyle={styles.container}>
        <View style={[styles.row, styles.starContainer]}>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={starCount}
            selectedStar={rating => this.onStarRatingPress(rating)}
            starSize={28}
            buttonStyle={{ marginHorizontal: 4 }}
            fullStarColor="orange"
            emptyStarColor="orange"
          />
        </View>
        <View style={[styles.row, styles.textInputContainer]}>
          <TextInput
            multiline
            style={[styles.textInput, styles.title]}
            placeholder="Title"
            underlineColorAndroid="transparent"
            textAlignVertical="top"
            value={titleText}
            onChangeText={this.onChangeTitleText}
          />
          <TextInput
            multiline
            style={[styles.textInput, styles.content]}
            placeholder={I18n.t('TakePublish.placeholder')}
            underlineColorAndroid="transparent"
            textAlignVertical="top"
            value={text}
            onChangeText={this.onChangeText}
          />
        </View>
        {!photo
          && (
            <IconButton
              name="ios-reverse-camera-outline"
              size={36}
              color="#000"
              style={styles.change}
              onPress={() => navigation.push('TakeModal')}
            />
          )
        }
        {photo
          && (
          <TouchableOpacity onPress={() => this.onTabPress('library', I18n.t('Take.tab1'))}>
            <Image source={{ uri: photo.uri }} style={styles.photo} />
            <TouchableOpacity onPress={() => this.onPressCloseBtn()} style={styles.dismiss}>
              <IconButton
                name="ios-close"
                size={36}
                color="#fff"
                onPress={() => navigation.push('TakeModal')}
              />
            </TouchableOpacity>
          </TouchableOpacity>
          )
        }
      </ScrollView>
    );
  }
}
