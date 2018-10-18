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

/* from app */
import IconButton from 'app/src/components/IconButton';
import TextInput from 'app/src/components/TextInput';
import firebase from 'app/src/firebase';
import GA from 'app/src/analytics';
import I18n from 'app/src/i18n';
import styles from './styles';

export default class TakePublishScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: I18n.t('TakePublish.title'),
    headerRight: navigation.getParam('headerRight', null),
  })

  constructor(props) {
    super(props);

    const { navigation } = this.props;

    this.state = {
      mode: navigation.getParam('mode', 'photo'),
      photo: navigation.getParam('photo', {}),
      titleText: '',
      text: '',
      starCount: 0,
    };

    GA.ScreenHit('TakePublish');
  }

  componentDidMount() {
    const { photo = {} } = this.state;
    const { navigation } = this.props;

    if (!photo.uri) {
      navigation.goBack();
    }

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
      mode,
      photo,
      text,
    } = this.state;
    const { navigation } = this.props;

    Keyboard.dismiss();

    navigation.setParams({
      headerRight: <IconButton name="ios-send" />,
    });

    const result = await firebase.createPost(text, mode === 'photo' ? photo : mode);

    navigation.setParams({
      headerRight: <IconButton name="ios-send-outline" onPress={this.onPublish} />,
    });

    if (result.error) {
      Alert.alert(I18n.t('TakePublish.alert'), result.error);
    } else {
      navigation.dispatch({ type: 'TAKEMODAL_CLOSE' });
    }
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }

  onUserPress = async () => {
    const { me, dispatch } = this.props;

    const permissions = Permissions.CAMERA_ROLL;
    const { status } = await Permissions.askAsync(permissions);

    if (status) {
      const photo = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });

      if (!photo.cancelled) {
        const response = await firebase.changeUserImg(photo);
        if (!response.error) {
          dispatch({
            type: 'ME_SET', payload: { ...me, img: response },
          });
        }
      }
    }
  }

  onTabPress = async (mode = 'photo', headerTitle = I18n.t('Take.tab2')) => {
    const { flashMode } = this.state;
    const { navigation } = this.props;

    if (mode !== 'library') {
      this.setState({
        mode,
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

  tabBarOnPress(navigation) {
    navigation.push('TakeModal');
  }

  render() {
    const {
      mode,
      photo,
      titleText,
      text,
      starCount,
    } = this.state;
    const { navigation } = this.props;

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
        <IconButton
          name="ios-reverse-camera-outline"
          size={36}
          color="#000"
          style={styles.change}
          // onPress={this.onUserPress}
          // onPress={this.tabBarOnPress(navigation)}
          onPress={() => this.tabBarOnPress(navigation)}
        />
        {mode === 'photo'
          && (
          <TouchableOpacity onPress={() => this.onTabPress('library', I18n.t('Take.tab1'))}>
            <Image source={{ uri: photo.uri }} style={styles.photo} />
          </TouchableOpacity>
          )
        }
      </ScrollView>
    );
  }
}
