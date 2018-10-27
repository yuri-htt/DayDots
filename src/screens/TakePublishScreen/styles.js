import { StyleSheet, Dimensions } from 'react-native';
import { Constants } from 'expo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.manifest.extra.backgroundColor,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    padding: 8,
  },
  starContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputContainer: {
    padding: 0,
    flexDirection: 'column',
  },
  title: {
    fontSize: 30,
    height: 50,
  },
  content: {
    height: 100,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    maxHeight: 16 * 8,
  },
  photo: {
    width: Dimensions.get('window').width - 32,
    height: Dimensions.get('window').width - 32,
  },
  dismiss: {
    position: 'absolute',
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
});

export default styles;
