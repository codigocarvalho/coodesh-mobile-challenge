import {StyleSheet} from 'react-native';
import {theme} from '../../global/theme';

export const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderWidth: 0.5,
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 3,
  },
  leftContent: {
    marginTop: 8,
    borderRadius: 8,
  },
  rightContent: {
    marginTop: 8,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  descriptionHeader: {
    marginTop: 3,
    width: '75%',
  },
  descriptionFooter: {
    marginVertical: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chip: {
    backgroundColor: theme.colors.primary,
    marginVertical: 3,
    width: '28%',
    height: '24%',
  },
  chipText: {
    color: 'white',
    bottom: 8,
    fontSize: 12,
  },
});
