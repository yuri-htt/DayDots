import { StyleSheet } from 'react-native';
import { Constants } from 'expo';

import styleConstants from 'app/src/styleConstants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.manifest.extra.backgroundColor,
    paddingHorizontal: 32,
  },
  empty: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  // header
  header: {
    marginTop: 0,
    paddingTop: 0,
    paddingBottom: 32,
  },
  degree: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 16,
  },
  degreeIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'gray',
    marginBottom: 16,
  },
  degreeTxt: {
    color: styleConstants.secondaryTxt,
  },
  summary: {
    flexDirection: 'row',
  },
  total: {
    flex: 1,
    alignItems: 'center',
  },
  badges: {
    flex: 1,
    alignItems: 'center',
  },
  num: {
    fontSize: 50,
    color: styleConstants.primaryTxt,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 12,
    color: styleConstants.hintTxt,
  },
  // category
  category: {
    marginTop: 16,
    marginBottom: 32,
  },
  headLine: {
    fontSize: 30,
    color: styleConstants.primaryTxt,
    fontWeight: 'bold',
  },
  categoryCards: {
    marginTop: 16,
  },
  row: {
    flexDirection: 'row',
  },
  // timeLine
  timeLine: {
    marginTop: 16,
  },
});

export default styles;
