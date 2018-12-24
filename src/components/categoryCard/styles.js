import { StyleSheet } from 'react-native';
import { Constants } from 'expo';

import styleConstants from 'app/src/styleConstants';

const styles = StyleSheet.create({
  categoryCard: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 4,
    shadowOffset: { width: 4, height: 4 },
    shadowColor: 'black',
    shadowOpacity: 0.25,
    backgroundColor: '#FFF',
    alignItems: 'center',
    marginHorizontal: 4,
    marginBottom: 8,
  },
  icon: {
    width: 36,
    height: 36,
    marginBottom: 16,
  },
  categoryCardTxt: {
    fontSize: 12,
    fontWeight: '500',
    color: styleConstants.primaryTxt,
  },
});

export default styles;
