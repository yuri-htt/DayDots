import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 12,
    borderRadius: 4,
    shadowOffset: { width: 4, height: 4 },
    shadowColor: 'black',
    shadowOpacity: 0.25,
    backgroundColor: '#FFF',
    padding: 16,
    flexDirection: 'row',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  avatar: {
    marginRight: 16,
  },
  icon: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  titleText: {
    color: '#212121',
    fontSize: 16,
    lineHeight: 16 * 1.3,
  },
  text: {
    color: '#757575',
    fontSize: 12,
  },
  time: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    fontSize: 12,
    color: '#999',
  },
  stars: {
    marginTop: 8,
  },
});

export default styles;
