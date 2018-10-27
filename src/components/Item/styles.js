import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  content: {
    flexDirection: 'row',
  },
  headerUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 8,
  },
  image: {
    width: 150,
    height: 150,
  },
  file: {
    flex: 1,
  },
  buttons: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    paddingHorizontal: 4,
  },
  icon: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  titleText: {
    fontSize: 30,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  text: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  time: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    fontSize: 12,
    color: '#999',
  },
  stars: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
});

export default styles;
