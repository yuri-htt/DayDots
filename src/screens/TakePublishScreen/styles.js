import { StyleSheet } from 'react-native';
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
    width: 100,
    height: 100,
  },
});

export default styles;
